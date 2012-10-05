---
layout: article
title: Running Logstash in a dual stack ip v4/v6 environment
tags: 
---

* Goal: Launch logstash with ipv6 dns lookup support
* Audience: Logstash developers, administrators

# baseline

On my box, a default startup does not allow ipv6 dns lookups as the default for java is preferring ipv4 over ipv6. So starting logstash with the following option:

    java -Xmx32m -jar /usr/local/logstash/logstash-1.1.1-monolithic.jar agent -f /etc/logstash/logstash.conf -l /var/log/logstash/logstash.log

results in dns lookups resolving to ipv4 instead of doing ipv6 -> ipv4.  

# baseline + ipv6 enable

To enable ipv6 dns lookups with logstash you need to enable the following java startup option: 

    java -Djava.net.preferIPv6Addresses=true -Xmx32m -jar /usr/local/logstash/logstash-1.1.1-monolithic.jar agent -f /etc/logstash/logstash.conf -l /var/log/logstash/logstash.log

or just add the option to _JAVA_OPTIONS

export _JAVA_OPTIONS=’-Djava.net.preferIPv6Addresses=true’

which will be picked up by java on startup. 

Here is a description on what that option does: 
This option does the following: (http://docs.oracle.com/javase/1.4.2/docs/guide/net/properties.html)

“java.net.preferIPv6Addresses (default: false)

If IPv6 is available on the operating system the default preference is to prefer an IPv4-mapped address over an IPv6 address. This is for backward compatibility reasons – for example applications that depend on access to an IPv4 only service or applications that depend on the %d.%d.%d.%d representation of an IP address. This property can be set to try to change the preferences to use IPv6 addresses over IPv4 addresses. This allows applications to be tested and deployed in environments where the application is expected to connect to IPv6 services.” 

