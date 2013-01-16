---
layout: article
title: Version Updater
tags: python,script,automate,version,update
---

* Goal: Keep your logstash.jar up to date with the latest monolithic jar!
* Audience: Those of us who want to keep it fresh.

```python
#!/usr/bin/python
import re
import sh
import urllib
 
from lxml import objectify, etree
from distutils.version import StrictVersion
 
url = "https://logstash.objects.dreamhost.com/"  # xml listing of releases
logstash_dir = "/opt/logstash"

# Checking the Logstash version might take a while, be patient.
version_parse = re.compile("release\/logstash-(.*)-monolithic\.jar")
version_current = sh.java("-jar", "%s/logstash.jar" % logstash_dir, "agent", "-V").split(" ")[1].strip('\n')

response = urllib.urlopen(url).read().replace('<?xml version="1.0" encoding="UTF-8"?>','')
response = response.replace(" xmlns=\"http://s3.amazonaws.com/doc/2006-03-01/\"", "")

xml = objectify.fromstring(response)
tree = xml.getchildren()

# Version as key, with a dict as value. Example:
# {'1.1.1': {'releasename': 'release/logstash-1.1.1-monolithic.jar'}}
available_versions = {}

for subtree in tree:
    for release in subtree.iterchildren():
        if release.tag == "Key":
            release = str(release)
            matching = re.search(version_parse, release)
            if matching:
                available_versions[matching.group(1)] = {'releasename': release}

for version in available_versions:
    if StrictVersion(version_current) < StrictVersion(version):
        new_version = available_versions[version]
        new_version_url = url+available_versions[version]['releasename']
        urllib.urlretrieve(new_version_url, "%s/%s" % (logstash_dir, "logstash.jar"))
```
