#!/usr/bin/python
import re
import sh
import io
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
    parser.add_argument("-t", "--type", dest="type", required=False, default="monolithic",
                        choices=["monolithic", "flatjar"],
                        help="Choose which type of jar to use, options: monolithic, flatjar")
    return parser.parse_args()


def version_info(url, dir):
    # Checking the Logstash version might take a while, be patient.
    version_parser = re.compile("release\/logstash-(.*)-monolithic\.jar")

    try:
        current_version = sh.java("-jar", "%s/logstash.jar" % dir, "agent", "-V").split(" ")[1].strip('\n')
    except Exception, e:
        print e

    response = urllib.urlopen(url).read().replace('<?xml version="1.0" encoding="UTF-8"?>','')
    response = response.replace(" xmlns=\"http://s3.amazonaws.com/doc/2006-03-01/\"", "")

    xml = objectify.fromstring(response)
    xmltree = xml.getchildren()

    return xmltree, current_version


def updater(xmltree, version_info, args):
    # Version as key, with a dict as value. Example:
    # {'1.1.1': {'releasename': 'release/logstash-1.1.1-monolithic.jar'}}
    available_versions = {}

    # Attempting to validate the desired version.
    try:
        if args.version == "latest":
            user_version = "latest"
        else:
            user_version = StrictVersion(arg.version)
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
        if StrictVersion(current_version) < StrictVersion(version):
            new_version_url = url+available_versions[version]['releasename']
            urllib.urlretrieve(new_version_url, "%s/%s" % (args.dir, "logstash.jar"))


def run():
    args = get_args()
    url = "https://logstash.objects.dreamhost.com/"  # xml listing of releases

    xmltree = version_info(url, args.dir)

    updater(xmltree, args)

if __name__ == '__main__':
    run()

