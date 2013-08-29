---
layout: article
title: logging from NodeJS
tags:  node nodejs bucker
---

# Introduction

Logging from NodeJS is normally done by sending console output to
a file. Most of the time this is done via upstart or runit to
brute-force capture the console stream.

Some applications use logging modules but the vast majority of those
wrap the console output to a file with minimal fanfare.

We use at [&yet](http://andyet.com) use [bucker](https://npmjs.org/package/bucker)
for that - it's a module that was created by us for internal use and
we have open-sourced it.  This gives you all the normal things you expect from
a logging tool: levels, exception handling, middleware integration - and then
it also adds multiple transport options.

Bucker just gained the ability to output directly to logstash via either
UDP or Redis PubSub and it outputs json_event data for easy input to logstash.

# Logging to UDP

    {
      logstash: {
        udp: true,         // or send directly over UDP
        host: '127.0.0.1', // defaults to localhost
        port: 9999, // defaults to 6379 for redis, 9999 for udp
      }
    }

# Logging to Redis

    {
      logstash: {
        redis: true,       // send as redis pubsub messages
        host: '127.0.0.1', // defaults to localhost
        port: 6379,        // defaults to 6379 for redis
        key: 'bucker_logs' // defaults to 'bucker', this is only used for the redis transport
      }
    }

NOTE: you can only send to Redis OR UDP, not both

# Logstash side

    udp {
            host => "127.0.0.1"
            type => "udp"
            format => "json_event"
    }
    redis {
            host => "127.0.0.1"
            type => "redis-channel"
            data_type => "channel"
            key => "bucker"  // bucker will only ever send to this key
    }
