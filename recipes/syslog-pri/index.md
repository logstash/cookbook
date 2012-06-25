---
layout: article
title: parsing syslog messages
tags: getting started, syslog
---

* Goal: Parse the syslog facility, severity, timestamp and host
* Audience: Anyone sending RFC3164 syslog messages to logstash

# preface: parsing syslog

Until logstash 1.2 there was a native syslog input plugin bundled with
logstash. It was deprecated because different syslog servers use slightly
different formats, so more often than not the syslog filter didn't work.

It turns out that most of the work of parsing a syslog line can be done with
native logstash `grok` filters. This recipe shows how to do that, which means
if your syslog server isn't quite following RFC 3164 you should still be able
to cope.

# introduction

A standard format syslog line contains a Header with facility, severity,
timestamp, and host, and then the Body of the message. We want logstash to
treat the message body as the complete log message, and have fields created
for the other metadata items.

# agenda

* Prerequisites
* Parse syslog's PRI field
* Extract the Timestamp
* Extract the Host
* If it doesn't work

# prerequisites

Beginning with logstash 1.1.1 there is a new `syslog_pri` filter plugin. Using
this version, you're all set.

If you have an earlier version of logstash, follow these steps:

1. [Download](https://raw.github.com/logstash/logstash/master/lib/logstash/filters/syslog_pri.rb) 
  the plugin from github.
1. Create a directory named `logstash/filters` and save the plugin into it
1. Tell logstash about it (`pluginpath` should contain `logstash/filters`):

    % logstash --pluginpath . -d logstash.conf

# parse syslog's PRI field

The Header at the start of a syslog line encodes both the facility and
severity of the message in one number, called the priority (or PRI). We need
to strip off the PRI, extract the facility and severity, and save them as new
logstash fields.

The following config snippet should go in the filter section of your config:

{% include_code strip_pri.conf %}

What this does is:

1. Removes the PRI field from the syslog line, storing the remainder away
1. Calls the bundled `syslog_pri` filter plugin to parse this field and extract
the facility and severity values
1. If that is successful, overwrites the logstash message with the stored
remainder of the syslog line, and tidies up after itself

# extract the timestamp

The next field in the syslog message header is the timestamp of the event. We
want to make the logstash event timestamp equal to this (instead of the time
when it was eventually received by logstash).

The following config snippet should go in the filter section of your config:

{% include_code timestamp.conf %}

What this does is:

1. Removes a field at the start of the syslog line which looks like a
timestsamp, storing the remainder away
1. Overwrites the logstash message with this stored remainder of the syslog
line
1. Sets the logstash event timestamp to be the extracted timestamp

# extract the host

The next field in the syslog message header is the host which created the
message. We want to remove this, and save it in a new logstash field.

The following config snippet should go in the filter section of your config:

{% include_code host.conf %}

What this does is:

1. Removes a field at the start of the syslog line which looks like a host
name, storing the remainder away
1. Creates a new logstash field containing the host name
1. Overwrites the logstash message with this stored remainder of the syslog
line

# if it doesn't work

It may be that your syslog uses a format different from RFC 3164. For example
the timstamp might be in a different format, or the facility and priority
might not be encoded numerically.

By changing the `grok` filters above, and in particular the regular
expressions and
[`patterns`](https://github.com/logstash/logstash/blob/master/patterns/grok-patterns
"grok patterns at github") used to extract fields, you can easily cope with
different formats.

You can also receive logs from different syslog servers using different
formats, simply by tieing a series of filters to a `type` or `tag`.

Please ask on the logstash IRC channel if you need any help.
