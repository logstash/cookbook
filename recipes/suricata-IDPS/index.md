---
layout: article
title: logstash.conf for use with Suricata IDPS
tags: Suricata,IDS,IPS
---

* Goal: Logstash configuration for Suricata IDPS log analysis.
* Target audience: Users who wish to integrate Suricata IDPS logs for analysis in Logstash.

# Usage

- copy the provided logstash.conf in /etc/logstash/conf.d/logstash.conf
- restart elasticsearch/logstash


{% include_code logstash.conf %}


# Kibana templates for Suricata IDPS

https://github.com/pevma/Suricata-Logstash-Templates


# Other instructions/tutorials - Suricata/Logstash installation

https://redmine.openinfosecfoundation.org/projects/suricata/wiki/_Logstash_Kibana_and_Suricata_JSON_output

http://pevma.blogspot.com/2014/03/suricata-and-grand-slam-of-open-source_26.html

https://home.regit.org/2014/03/suricata-ulogd-splunk-logstash/

http://blog.inliniac.net/2014/03/25/suricata-2-0-and-beyond/


# About Suricata IDPS - Intrusion Detection and Prevention System

http://suricata-ids.org/

http://www.openinfosecfoundation.org/

http://planet.suricata-ids.org/

