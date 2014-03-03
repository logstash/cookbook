---
layout: article
title: shipping to logstash with rsyslog
tags: getting started, rsyslog
---

* Goal: Use rsyslog as a local agent to ship logs to logstash.
* Audience: Folks who cannot or will not deploy the logstash agent to some or
  all servers.

# preface: why rsyslog?

It's an alternative to using logstash on your nodes to ship logs.

The logstash agent, when run from java, can incur significant overhead. The
minimum memory footprint I have been able to achieve is about 100mb. On tiny
virtual machines, this may not be acceptable, so you need an alternative.

This document is more about solving the "logstash agent is too big" problem.

I have no preference for rsyslog, but it happens to be a reasonable alternative
to the logstash agent on your edge servers given it ships by default with some
OS distributions.

# agenda

* Configure rsyslog
* Configure logstash to accept syslog messages

# configure rsyslog

The rsyslog daemon is useful for both taking local syslog messages as well as
for pulling logs from files.

To watch files with rsyslog, you want to use the
[imfile](http://www.rsyslog.com/doc/imfile.html) rsyslog module.

For example, let's say we want to forward local syslog as well as apache and
mysql log files to logstash.

{% include_code rsyslog.conf %}

# configure logstash

Now, logstash needs to be told to accept syslog input. This is simple enough.
Here is an example config that takes syslog and emits it to stdout:

{% include_code logstash.conf %}

The above sets up logstash to listen on port 10514 for syslog messages.
