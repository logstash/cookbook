---
layout: article
title: Juniper JunOS
tags: juniper junos utm
---

* Goal: Demonstrate how to use Grok patterns to index JunOS specific syslog messages from JunOS device.
* Audience: Anyone who has a JunOS device



# UTM Webfilter

JunOS webfilter messages look like this;

<pre><code>
Oct  5 06:01:35   RT_UTM: WEBFILTER_URL_PERMITTED: WebFilter: ACTION="URL Permitted" 10.0.0.100(56660)->103.31.7.184(80) CATEGORY="N/A" REASON="BY_OTHER" PROFILE="blockadult" URL=i.imgur.com OBJ=/xxy5xcl.png USERNAME=demo ROLES=NoAdultMaterial

Oct  5 11:19:54   RT_UTM: WEBFILTER_URL_BLOCKED: WebFilter: ACTION="URL Blocked" 10.0.0.100(56958)->64.210.140.16(80) CATEGORY="Adult_Sexually_Explicit" REASON="BY_PRE_DEFINED" PROFILE="blockadult" URL=www.porn.com OBJ=/ USERNAME=demo ROLES=NoAdultMaterial
</code></pre>

The following logstash configuration shows how you would accept this syslog messages from the firewall and parse the messages into something useful.
{% include_code logstash.conf %}

Below is what the JunOS firewall has configured for syslog. Im matching on "webfilter_url" just to keep the syslog stream cleaner while developing the logstash code.
{% include_code srx.conf %}
