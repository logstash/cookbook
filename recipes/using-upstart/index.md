---
layout: article
title: running logstash with upstart
tags: upstart,ubuntu
---

* Goal: Run the logstash agent and elasticsearch through the upstart system daemon.
* Target audience: Users who have servers with upstart.

# what is upstart?

Upstart ships with most modern Ubuntu distros. Here are the steps you need to use this:

# upstart logstash config

1. Put the config below in `/etc/init/logstash-agent.conf`
2. To start it: `sudo initctl start logstash`

{% include_code logstash-agent.conf %}
