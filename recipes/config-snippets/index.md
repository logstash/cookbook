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

## iptables

     # Grok patterns for iptables:
     NETFILTERMAC %{COMMONMAC:dst_mac}:%{COMMONMAC:src_mac}:%{ETHTYPE:ethtype}
     ETHTYPE (?:(?:[A-Fa-f0-9]{2}):(?:[A-Fa-f0-9]{2}))
     IPTABLES1 (?:IN=%{WORD:in_device} OUT=(%{WORD:out_device})? MAC=%{NETFILTERMAC} SRC=%{IP:src_ip} DST=%{IP:dst_ip}.*(TTL=%{INT:ttl})?.*PROTO=%{WORD:proto}?.*SPT=%{INT:src_port}?.*DPT=%{INT:dst_port}?.*)
     IPTABLES2 (?:IN=%{WORD:in_device} OUT=(%{WORD:out_device})? MAC=%{NETFILTERMAC} SRC=%{IP:src_ip} DST=%{IP:dst_ip}.*(TTL=%{INT:ttl})?.*PROTO=%{INT:proto}?.*)
     IPTABLES (?:%{IPTABLES1}|%{IPTABLES2})

     # Use it in grok:
     filter {
       grok {
         pattern => "%{IPTABLES}"
       }
     }

## Jenkins logs

     # logstash snippet to remove ConsoleNote stuff in Jenkins logs
     # note: there are some escape characters you might not see -- check the source of this cookbook
     filter {
       mutate {
         gsub => ["@message", "\[8mha.*==\[0m", ""]
       }
     }