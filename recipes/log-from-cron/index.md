---
layout: article
title: logging from cron
tags:  cron
---

* Goal: Ship cron logs to logstash.
* Audience: Folks who use cron and want to direct log output somewhere

# preface: email sucks

The most common way I see folks logging from cron is to use the MAILTO= setting
to direct job output to email. Unfortunately, people easily train themselves
and their mail programs to ignore such mail.

You probably to save the logs somewhere so you can debug and analyze them later,
and the best place for that is probably not your inbox.

# using logger, instead

logger is a tool that reads data on standard input. Here's an example use:

    echo "Hello world" | logger -t sample

Logger writes syslog POSIX api, so your local syslog daemon should pick it up,
and you can usually see the result in /var/log/messages:

    Feb 26 23:07:08 seven sample: Hello world

With this usage in mind, you should see now that you can add '| logger ...' to
your cron jobs and you will get output captured to syslog.

Once you are using the `logger` tool, you can have your local syslog agent
(syslog-ng, etc) ship those logs to logstash directly. Alternately, you can use
logstash's file input to pick this data up from wherever the logs end up (often
/var/log/messages)

# example

For this example, we will be logging output of an old-file cleaner:

    0 0 * * * find /data/cache -print0 -mtime +7 | xargs -0tn100 rm | logger -t "file cleaner"

Because the above uses the '-t' flag on xargs, it will print each command
invoked by xargs which is piped to logger and will be logged.
