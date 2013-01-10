---
layout: article
title: running logstash as a windows service
tags: service,windows
---

* Goal: Start logstash on boot with on windows using nssm.
* Target audience: Users who have logstash agents on windows servers.



1. Download NSSM - the Non-Sucking Service Manager from http://nssm.cc and copy nssm.exe to a directory in your path like c:\windows.
2. Copy logstash jar into c:\logstash
3. Create directory c:\logstash\sincedb
4. Create a batch file c:\logstash\logstash.bat

{% include_code logstash.bat %}


5. Create c:\logstash\logstash.conf file 

{% include_code logstash.conf %}


6. Create the windows service by typing the following on the command line:  nssm install Logstash C:\logstash\logstash.bat


Go to windows services to verify sure you have a service named "Logstash". Set the startup type to "Automatic" or "Automatic (delayed start)"


Here are some other projects that allow you to run jar as a windows service:
http://winrun4j.sourceforge.net/
http://yajsw.sourceforge.net/
