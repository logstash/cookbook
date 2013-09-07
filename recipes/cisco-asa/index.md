---
layout: article
title: Cisco ASA
tags: cisco asa firewall
---

* Goal: Demonstrate how to use the built-in Grok patterns to index syslog messages from a Cisco ASA
* Audience: Anyone who has a Cisco ASA firewall or similar appliance

# Required Version

These Grok patterns were added to the core of LogStash in version 1.2.0.
If you are running an older version and don't want to upgrade, you can copy
the relevant patterns into a local pattern file and reference the file in
your configuration.

# The Basic Configuration

The following configuration shows how you would accept syslog messages on the
default port (UDP/514) from the firewall and parse the message formats included
in LogStash as of version 1.2.0.

{% include_code logstash.conf %}

# Extending the Configuration with Custom Message Formats

If you want to add new formats that aren't included in LogStash, you can easily
do so by tweaking your grok filter as follows. If you take the time to write a
Grok expression for another Cisco ASA log message, please consider contributing
it back to the project so it can be added to the core distribution.

{% include_code extending.conf %}
