---
layout: article
title: Config snippets
tags:  config snippets
---

* Goal: Collect different config snippets that people use
* Audience: Anyone

Here we can paste all kinds of config snippets that might be useful for other people.


# multiline

## ModSec

      # merge all modsec events for a given entity into the same event.
      multiline {
        type => "modsec"
        pattern => "^--[a-fA-F0-9]{8}-A--$"
        negate => true
        what => previous
      }

# Grok

## Stunnel

     # Grok patterns for stunnel:
     STUNNELPREFIX ^LOG%{NUMBER:level:int}\[%{NUMBER:pid:int}:%{NUMBER:thread_id:int}\]:
     STUNNELSERVICE %{STUNNELPREFIX} Service %{WORD:service} %{GREEDYDATA:message} %{IPORHOST:from_host}:%{NUMBER:from_port:int}
     STUNNELCONNECT %{STUNNELPREFIX} %{GREEDYDATA:message} %{IPORHOST:to_host}:%{NUMBER:to_port:int}
     STUNNELGENERAL %{STUNNELPREFIX} %{GREEDYDATA:message}


     # Use it in grok:
     filter {
       grok {
         pattern => [ "%{STUNNELSERVICE}", "%{STUNNELCONNECT}", "%{STUNNELGENERAL}" ]
       }
     }

## Squid

     Pattern: %{SYSLOGTIMESTAMP} %{SYSLOGHOST:sourcehost} %{SYSLOGPROG}: %{NUMBER:timestamp} \s+ %{NUMBER:request_msec:float} %{IPORHOST:client} %{WORD:cache_result}/%{NUMBER:status:int} %{NUMBER:size:int} %{WORD:http_type} %{URI:url} - %{WORD:request_type}/%{IPORHOST:forwarded_to} %{GREEDYDATA:content_type}
