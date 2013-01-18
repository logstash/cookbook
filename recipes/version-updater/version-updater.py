#!/usr/bin/python
import re
import sh
import io
import os
import sys
import urllib
import argparse

from lxml import objectify, etree
from distutils.version import StrictVersion


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-d", "--dir", dest="dir", required=False, default="/opt/logstash",
                        help="Give the location of your logstash directory, ex: /opt/logstash")
    parser.add_argument("-v", "--version", dest="version", required=False, default="latest",
                        help="Which version do you want to install, ex: 1.1.9 or latest")
    return parser.parse_args()


def version_info(url, dir):
    # Checking the Logstash version might take a while, be patient.
    response = urllib.urlopen(url).read().replace('<?xml version="1.0" encoding="UTF-8"?>','')
    response = response.replace(" xmlns=\"http://s3.amazonaws.com/doc/2006-03-01/\"", "")

    xml = objectify.fromstring(response)
    xmltree = xml.getchildren()
    
    try:
        open('%s/logstash.jar' % dir)
    except IOError, e:
        if e.errno == 13:
            sys.exit("We don't have permission to read/write the file")
        elif e.errno == 2:
            print("The file %s/logstash.jar does not exist, let's figure out which one to get." % dir)
    else:
        current_version = sh.java("-jar", "%s/logstash.jar" % dir, "agent", "-V").split(" ")[1].strip('\n')
        return xmltree, current_version
    finally:
        return xmltree


def updater(url, xmltree, current_version, args):
    # Version as key, with a dict as value. Example:
    # {'1.1.1': {'releasename': 'release/logstash-1.1.1-monolithic.jar'}}
    available_versions = {'latest': '0.0.0'}
    
    version_parser = re.compile("release\/logstash-(.*)-monolithic\.jar")

    try:
        if args.version == "latest":
            user_version = "latest"
        else:
            user_version = StrictVersion(args.version)
    except ValueError:
        sys.exit("Supplied value for version is incorrect or this script is outdated.")

    for subtree in xmltree:
        for release in subtree.iterchildren():
            if release.tag == "Key":
                release = str(release)
                matching = re.search(version_parser, release)
                if matching:
                    available_versions[matching.group(1)] = {'releasename': release}

    for version in available_versions:
        if version != "latest":
            # We should first determine what the latest version is
            # by comparing the version one after another.
            if StrictVersion(version) > StrictVersion(available_versions['latest']):
                available_versions['latest'] = version

    if user_version:
        print "You want the %s version, ok." % user_version 
        print available_versions
        new_version_url = url+available_versions[user_version]['releasename']
        print new_version_url
        urllib.urlretrieve(new_version_url, filename="%s/%s" % (args.dir, "logstash.jar"))
    elif current_version != "0.0.0":
        if StrictVersion(current_version) < StrictVersion(available_versions['latest']):
            print "There is a newer version (%s) than the one you have (%s)" % (available_versions['latest'], current_version) 
            new_version_url = url+available_versions[version]['releasename']
            print new_version_url
            urllib.urlretrieve(new_version_url, filename="%s/%s" % (args.dir, "logstash.jar"))
    else:
        print "Let's get the latest one which is %s" % available_versions['latest']
        new_version_url = url+available_versions['latest']['releasename']
        print new_version_url
        urllib.urlretrieve(new_version_url, filename="%s/%s" % (args.dir, "logstash.jar"))


def run():
    args = get_args()
    url = "https://logstash.objects.dreamhost.com/"  # xml listing of releases

    logstash_info = version_info(url, args.dir)

    # The first part of this tuple is the xmltree, the second indices is the version string
    if isinstance(logstash_info, tuple):
        updater(url=url, xmltree=logstash_info[0], current_version=logstash_info[1], args=args)
    else:
        updater(url=url, xmltree=logstash_info, current_version="0.0.0", args=args)

if __name__ == '__main__':
    run()

