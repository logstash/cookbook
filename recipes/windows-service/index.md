---
layout: article
title: running logstash as a windows service
tags: service,windows
---

* Goal: Start logstash on boot up.
* Target audience: Users who have logstash agents on windows servers.

# Service wrapper installation

- Download NSSM - the Non-Sucking Service Manager from http://nssm.cc and copy nssm.exe to a directory in your path like c:\windows.
- Copy logstash jar into c:\logstash
- Create directory c:\logstash\sincedb
- Create a batch file c:\logstash\logstash.bat
- Create c:\logstash\logstash.conf file 
- Create the windows service by typing the following on the command line:  nssm install Logstash C:\logstash\logstash.bat

Verify you have a service named "Logstash". Set the startup type to "Automatic" or "Automatic (delayed start)"


{% include_code logstash.bat %}


{% include_code logstash.conf %}


# Other Java service wrappers

http://winrun4j.sourceforge.net/

http://yajsw.sourceforge.net/
