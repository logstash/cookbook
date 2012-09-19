---
layout: article
title: parsing syslog messages
tags: getting started, syslog
---

* Goal: Parse the syslog facility, severity, timestamp, host, and program
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
* Parsing BSD Syslog format
* How it works
* If it doesn't work

# prerequisites

This recipe requires logstash 1.1.1 or newer.

# parsing bsd syslog format

The goal is to turn BSD syslog line in to a sensible Logstash event. To
this end we need to parse the message, modify a few things, then clean
up.

Here's what the complete configuration looks like:

{% include_code syslog.conf %}

# How it works

Most of the heavy lifting is done by the `grok` filter at the start. It
takes care of parsing the entire syslog message into various fields in
the Logstash event. It also copies some information, like the time Logstash
received the event, in to new fields. 

The `syslog_pri` filter takes care of parsing the priority and facility
number from the Logstash event. By default it looks for a field called
`syslog_pri` and parses it to create new fields that contain the severity and
facility.

Converting the timestamp of the syslog message is the task of the `date`
filter. It looks for the `syslog_timestamp` field and tries to parse it
using the formats given. If the parsing is successful, it will replace
the `@timestamp` field of the Logstash event with time of the syslog
message.

The first `mutate` filter replaces the Logstash event metadata with the
correct data from the syslog message. Note that it only executes if the
`grok` filter was successful. This allows for the original message to be
preserved if parsing failed.

The second `mutate` filter removes redundant fields from the logstash
event. This helps save storage and reduces confusion for people looking
at the event stream. It's not combined with the previous `mutate` filter
because there's no guaranteed order of operation so the removes could
happen before replace resulting in missing data.

# if it doesn't work

It may be that your syslog uses a format different from RFC 3164. For example
the timestamp might be in a different format, or the facility and priority
might not be encoded numerically.

By changing the `grok` filters above, and in particular the regular
expressions and
[`patterns`](https://github.com/logstash/logstash/blob/master/patterns/grok-patterns
"grok patterns at github") used to extract fields, you can easily cope with
different formats.

You can also receive logs from different syslog servers using different
formats, simply by tieing a series of filters to a `type` or `tag`.

Please ask on the logstash IRC channel if you need any help.

