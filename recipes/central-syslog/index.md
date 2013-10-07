---
layout: article
title: parsing a central syslog server
tags: getting started, syslog
---

* Goal: Parse syslog messages on an existing centralized server
* Audience: Anyone with an existing centralized syslog server.

# introduction

Many organizations already have a centralized syslog server and are comfortable with collecting logs this way.    There are many good reasons to do this even if you want to use a system like logstash.   

It is assumed that you know how to set up,  and already have a working syslog server filled with tasty logs.    It also assumes that you will be using redis for a message queue _(Combine the configs and remove redis output / input to run on same server)_.

For the sake of simplicity this example assumes that all messages are of standard syslog format.  If you have apache or other logs being pushed through you may need to modify the file input locations ( and set appropriate types ) and add appropriate filters to process them.

If you have a large set of logs to slurp,  you may want to set `maxmemory 500mb` in your `/etc/redis.conf` to ensure redis can't overrun your system.

# agenda

* Prerequisites
* Syslog Server - File Input
* Logstash Indexer - Processing and Output to ES
* Logstash Indexer - Additional Processing

# prerequisites

* This recipe requires logstash 1.2.1 or newer.
* This recipe assumes a standard syslog format ( PRI prefix not needed,  but it does yield richer results )
* This recipe assumes you have a logstash-indexer running redis for queueing.  


# Syslog Server - File Input

The config on your syslog server should look like below.   Pretty simple stuff, we're just declaring a file input and pushing to redis.    I chose not to do any filtering here as I want logstash to simply act as an agent on this server. 

{% include_code syslog-server.conf %}

# Logstash Indexer - Processing and Output to ES

Here's the workhorse.   It looks like a lot of processing but I have [tested this](https://gist.github.com/4513552) to > 20,000 messages/second using generator and 8 filter workers on a single box.

{% include_code logstash-indexer.conf %}

# Logstash Indexer - Additional Processing

Using grep we can easily check each syslog message for particular patterns and add a tag to the if they match.  This allows us to add more context to known log types.   An example below is the format for NAT logs on my linux firewalls.

{% include_code logstash-indexer_NAT.conf %}


