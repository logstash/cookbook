---
layout: article
title: Logging from Java
tags: getting started, java, log4j, jul, logback
---

* Goal: Logging from Java applications
* Audience: Java devs, Java application ops.

# preface: Java logging

Java software can take advantage of different logging frameworks:

* log4j/log4j2
* Java Util Logging (JUL)
* Logback
* and many more

and many more. These are especially frameworks, which provide also backend support (log appender/log writer). Frameworks like Commons Logging or SLF4J are mostly intended for application use and tunnel log events to appropriate backend frameworks. Especially log4j and Java Util Logging are widely used.

# logstash setup

Provided the above logger is used to output messages, the following
logstash input can be used to gather messages in logstash:

{% include_code logstash.conf %}

GELF is a nice solution since it uses UDP. This lowers the consequences of crashes, the application does not run into timeouts etc.

# Java library

You need the Java library in order to use these GELF format in combination with logstash. You can obtain it from Maven Central Repository:

For Maven:

    <dependency>
        <groupId>biz.paluch.logging</groupId>
        <version>1.1.0</version>
        <artifactId>logstash-gelf</artifactId>
    </dependency>

Zip-File with Dependencies:

http://search.maven.org/remotecontent?filepath=biz/paluch/logging/logstash-gelf/1.1.0/logstash-gelf-1.1.0-logging-module.zip

Add these Jar files to your project and continue with the appropriate log framework configuration.
You can find further documentation at https://github.com/mp911de/logstash-gelf

# log4j (version 1.2.x)

Properties:
{% include_code log4j.properties %}

XML:
{% include_code log4j.xml %}

# Java Util Logging

Properties:
{% include_code logging.properties %}

# Logback

XML:
{% include_code logback.xml %}

# JBoss AS7

In order to use the logging appenders, you need to install the package mentioned above as JBoss7 module.

XML (in standalone.xml/domain.xml):
{% include_code standalone.xml %}


