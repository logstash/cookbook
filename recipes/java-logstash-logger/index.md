---
layout: article
title: Java logstash logger
tags: java
---

* Goal: Ship Java logs to Logstash using Java logging libraries.
* Audience: Folks who use Java or Java Application Servers to direct log output in Logstash format.

# Preface: capture Java logs is difficult

The most common way to capture Java logs is based on using Java logging libraries
(such as log4j, Java Logging API, Apache Commons Logging, JBoss logmanager, etc.),
write those logs in a specified format, and then, capture it using multiline and grok.
But there is no a perfect regular expression. In addition, multiline and does
not capture logs correctly when log files are not flushed.

Another way to obtain Java logs is based on using log4j, and adding a SocketAppender
to send logs directly to Logstash. The main problem here is: what happen if
Logstash is down or busy during a long time? The answer is simple: some
logs can be lost.

# Solution: write logs directly on Logstash format

Do not transform logs, write them directly in your desired format!

[logstash-loggers](https://github.com/mpucholblasco/logstash-loggers) can help you
with this. It is a library to write Logstash formatted logs, plus interfaces
to those most common Java logging libraries.

It is a project in progress, so
not all Java logging libraries are supported. Supported logging libraries are
present on subsequent subsections.

## JBoss logmanager (JBoss 7)

JBoss logmanager is supported. You only should install and configure [ logstash-jboss-logmanager ]
(https://github.com/mpucholblasco/logstash-loggers/tree/master/logstash-jboss-logmanager)
to write JBoss 7 logs directly to Logstash format without any regular expression,
nor headaches on researching why your logs are splitted.

The following configuration sample will configure your JBoss to write your
server.log file in Logstash format:

     <custom-handler name="HANDLER_NAME" class="net.logstash.loggers.logstash_jboss_logmanager.LogstashSizeRotatingFileHandler" module="net.logstash.loggers.logstash_jboss_logmanager">
      <properties>
        <property name="fileName" value="${jboss.server.log.dir}/server.log"/>
        <property name="timeZone" value="UTC"/>
        <property name="autoFlush" value="true"/>
        <property name="maxBackupIndex" value="10"/>
        <property name="rotateSize" value="209715200"/>
      </properties>
    </custom-handler>

More features can be seen on [logstash-jboss-logmanager readme](https://github.com/mpucholblasco/logstash-loggers/tree/master/logstash-jboss-logmanager).
