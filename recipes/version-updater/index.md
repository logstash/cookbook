---
layout: article
title: Version Updater
tags: python,script,automate,version,update
---

* Goal: Keep your logstash.jar up to date with the latest monolithic jar!
* Audience: Those of us who want to keep it fresh.

# Requirements

* Python 2.7+
* sh module
* lxml module

# Quick guide

If you don't have the required modules install them with pip:

    pip install sh lxml

If that complains about missing dependencies and you are running Ubuntu try installing these:

    apt-get -y install python-dev python-pip libxml2-dev libxslt-dev

# Using the updater

Below is the usage as printed by help.

    usage: version-updater.py [-h] [-d DIR] [-v VERSION]

    optional arguments:
      -h, --help            show this help message and exit
      -d DIR, --dir DIR     Give the location of your logstash directory, ex:
                            /opt/logstash
      -v VERSION, --version VERSION
                            Which version do you want to install, ex: 1.

As an example here is how to get version 1.1.8  downloaded to /opt/logstash:

    python version-updater.py -d /opt/logstash -v 1.1.8

You can set the defaults inside of the script if you want to run it without passing any arguments.

# Code

{% include_code version-updater.py %}
