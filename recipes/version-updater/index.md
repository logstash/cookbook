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

There are two options, type of logstash to get (flatjar or monolithic) and location to store the file.

    python logstash-updater.py monolithic /opt/logstash

You can set the defaults inside of the script if you want to run it without passing arguments.

# Code

{% include_code logstash-updater.py %}
