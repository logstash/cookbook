---
layout: article
title: Version Updater
tags: python,script,automate,version,update
---

* Goal: Keep your logstash.jar up to date with the latest monolithic jar!
* Audience: Those of us who want to keep it fresh.

# using the updater

There are two options, type of logstash to get (flatjar or monolithic) and location to store the file.

    python logstash-updater.py monolithic /opt/logstash

You can set the defaults inside of the script if you want to run it without passing arguments.

# code

{% include_code logstash-updater.py %}
