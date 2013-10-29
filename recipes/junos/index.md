---
layout: article
title: Juniper
tags: juniper junos utm
---

* Goal: Demonstrate how to use Grok patterns to index juniper specific syslog messages from JunOS device.
* Audience: Anyone who has a JunOS device



# UTM Webfilter

The following logstash configuration shows how you would accept syslog messages regarding UTM Webfilter events from the firewall and parse the messages into something useful.
{% include_code logstash.conf %}

Below is what the JunOS firewall has configured for syslog. Im matching on "webfilter_url" just to keep the syslog stream cleaner while developing the logstash code.
{% include_code srx.conf %}
