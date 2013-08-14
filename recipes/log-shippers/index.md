---
layout: article
title: log shippers
tags: tools, transport
---

* Goal: Learn about options for shipping logs
* Audience: Folks who are looking for alternatives to the logstash agent in log transport.

# tools!

There are lots of ways to ship logs off of your servers -

* [beaver](https://github.com/josegonzalez/beaver) - python, multiple outputs
* [woodchuck](https://github.com/danryan/woodchuck) - ruby, multiple outputs
* [awesant](https://github.com/bloonix/awesant) - perl, multiple outputs supported
* [lumberjack](https://github.com/jordansissel/lumberjack) - C, encrypted+compressed transport
* [syslog-shipper](https://github.com/jordansissel/syslog-shipper) - ruby, syslog tcp
* [remote_syslog](https://github.com/papertrail/remote_syslog) - ruby, syslog tcp/tls
* [Message::Passing](https://metacpan.org/module/Message::Passing) - perl, multiple inputs and outputs
* [nxlog](http://nxlog-ce.sourceforge.net) - C, multi platform including windows, tcp/udp/ssl/tls
* [logtail](https://github.com/shtouff/logtail) - perl, from flat files to redis
* [node-logstash](https://github.com/bpaquet/node-logstash) - JavaScript, NodeJS implementation of Logstash

In general, all of the above perform the task of taking log file logs and
shipping them away in a way that logstash can consume.

