---
layout: article
title: Ingesting ModSecurity audit logs
tags:  modsecurity security apache
---

* Goal: Create an event for each entry in a ModSecurity audit log
* Audience: Anyone who needs to make sense of ModSecurity audit logs

# Overview

ModSecurity is a great tool that many folks use to secure applications and it can
log quite a bit of information that is can useful for forensic analysis of an attack or
other security related investigation. The unique thing about [ModSecurity's audit log file format](https://github.com/SpiderLabs/ModSecurity/wiki/ModSecurity-2-Data-Formats)
is that it can be quite complex. If you are reading this then you likely are already familiar
with this format, but just in case, [here is an example of an audit log](http://www.atomicorp.com/wiki/index.php/Modsecurity_audit_log).

The biggest challenge with ingesting "entries" from a ModSecurity audit log file is first off
it spans multiple lines, secondly each entry can have a varying number of "parts" and third that
each "part" itself can have a varying number of sub-parts. To parse this file format this please refer
to the links below which provides a working Logstash configuration file that takes advantage 
of various logstash filters such as multiline, custom ruby code blocks, geoip and grok etc. to take a raw audit log entry
and convert it into a first class Logstash "event" with all the important stuff promoted to first class
fields with typing when appropriate. [This configuration file](https://github.com/bitsofinfo/logstash-modsecurity) has been used
to import tens of thousands of audit log entries daily and hopefully will serve as a good starting 
point for anyone who has to deal with this complex log format.

This has been tested on Logstash v1.2.1 and v1.2.2

# Config file

* [Logstash ModSecurity audit log format sample config file](https://github.com/bitsofinfo/logstash-modsecurity)

# Related information

* [Sample Logstash event as JSON, after running through this configuration](http://bitsofinfo.wordpress.com/2013/09/19/logstash-for-modsecurity-audit-logs/)
* [ModSecurity audit log file format info](https://github.com/SpiderLabs/ModSecurity/wiki/ModSecurity-2-Data-Formats)