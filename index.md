---
layout: landing
title: the logstash community cookbook
---

# Cookin' up some logs!

A community-driven documentation project. [Fork and contribute!](https://github.com/logstash/cookbook)

## [rsyslog](recipes/rsyslog-agent/)

Is the logstash agent too big for your edge nodes? Learn how to use rsyslog to ship logs to logstash.

## [logging from cron](recipes/log-from-cron//)

Got cron jobs? Learn about how to take the output from those jobs and ship them into logstash.

## [running with upstart](recipes/using-upstart/)

Want to run logstash as a system service? This cookbook entry will show you how
to run logstash from the upstart system daemon (comes with Ubuntu).

## [running with init](recipes/using-init/)

Run logstash as a service on your RHEL based system using this init script.

## [parsing syslog](recipes/syslog-pri)

Parse syslog messages!

## [apache json logs](recipes/apache-json-logs/)

Make apache output json for access logs for easy import into logstash.

## [log shippers](recipes/log-shippers/)

Learn about available tools for shipping logs to logstash in situations where
you can't fit the logstash agent.

## [debug configs](recipes/debug-config/)

Learn how to debug wrong configs or specific filters.

## [windows service](recipes/windows-service/)

Run logstash as a windows service

## [version updater](recipes/version-updater/)

Keep your logstash up to date with this script.

## [slurp down central rsyslog server?](recipes/central-syslog/)

Already have a centralized rsyslog server,  agent and indexer config to eat your logs.

## [removing Linux color codes from logs](recipes/color-codes/)

Remove the color codes from Linux logs

## [Config snippets](recipes/config-snippets/)

Config snippets collected and provided by users

## [Puppet modules](recipes/puppet-modules/)

Different puppet modules for Logstash and other software

## [Chef cookbooks](recipes/chef-cookbook/)

Chef cookbooks for quickly setting up Logstash and friends

## [ StatsD metrics ](recipes/statsd-metrics/)

StatsD plugin metrics explanation

## [ Logging from python ](recipes/logging-from-python/)

Have a python app ? This small cookbook will help getting it
ready to spit out logstash compatible log files

## [ Logging from NodeJS ](recipes/logging-from-nodejs/)

Have a NodeJS app? Get your logs into logstash efficiently with this cookbook.

## [ Cisco ASA ](recipes/cisco-asa/)

Sample configuration for parsing syslog messages from a Cisco ASA firewall

## [ Suricata IDPS ](recipes/suricata-IDPS/)

Sample configuration of Logstash for Suricata IDPS - Intrusion Detection and Prevention System - log analysis

## [The Logstash Book](http://www.logstashbook.com)

An introductory Logstash book.

### Contribute!

This cookbook is for and by the logstash community. You can help! Click the
'edit this page' link on any page to make edits (requires a github account). You can also
edit content by forking the [git repo](https://github.com/logstash/cookbook).

Can't write? [File issues](https://github.com/logstash/cookbook/issues) asking
for fixes or new content!

### Getting Help

If you aren't finding answers here, you might consider asking for help
in the logstash IRC channel (#logstash on the freenode IRC network) or on the
[mailing list](http://groups.google.com/group/logstash-users).
