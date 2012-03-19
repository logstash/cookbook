# lol, logging.

## Visit the site:

[lol, logging](http://jordansissel.github.com/lol-logging)

## Background 

We all do it poorly, best to laugh about it, and perhaps find a better future.

This project aims to document logging stuff. I want to encourage the good, and
derail the bad. I want to provide solid data that helps you make the right
decisions about how/why/when you are logging and consuming logs.

I'm going to include bad things I do (and wish I did better) as well in this
documentary.

Here are some of my ideas:

## cultural battles around logging protocols

Sigh:

* "I need human readable raw log data"
* "We just dump random stuff over syslog!"
* "We log key=value!"

## "Standards" and other destructive forces

Why each of the following are complete bad, and why, and perhaps what we
can try doing, in general, to fix things.

* timestamps. ugh.
* RFC3164, 5424, 5425. Why each are bad.
* ArcSight's bad ["Common Event Format"](http://www.arcsight.com/collateral/CEFstandards.pdf)
* Splunk's bad ["Common Information Model"](http://docs.splunk.com/Documentation/Splunk/latest/Knowledge/UnderstandandusetheCommonInformationModel)
* LogStash's bad JSON schema (this would be a link if this was actually documented ☹)
* Graylog2's bad [JSON schema](https://github.com/Graylog2/graylog2-docs/wiki/GELF)
* CEE's [bad](http://cee.mitre.org/docs/profiles.html),
  [well](http://cee.mitre.org/docs/cls.html),
  [everything](http://cee.mitre.org/docs/clt.html). 4 serialization formats, 4
  conformance levels, 2+ transport mechanisms == 30+ combinations of bad.

## explorations of bad logging.

* mysql (binary log, slow query log, debug log; all are completely different formats)
* more?

## explorations of good logging.

Please tell me someone has an example of good logging in an application. We
can't be all totally screwing this up across the world.

Anybody?

## logging libraries

Sigh:

* printf-style loggers like: ruby logger, python logging, etc.

Hurray:

* log4j MDC/NDC, ruby-cabin, etc

## types of logs

* tracing (for the purposes of debugging)
* accounting (for numerical applications like billing, metrics, etc)
* transaction log (for the purposes of rollback and replay)

## typical problems

* Fat logs: "I have 300 gigs of logs, how can I make this useful?"
* Fast logs: "I have 50,000 events logged per second, how can I make this useful?"
* Lawn mowing: "I don't really use our logs much, but we have to use complex
  logrotate rules or otherwise we run out of disk and it takes down production"
* Syntax vs domain: to answer domain questions (how many customers
  signed up?), you require syntax knowledge (how to parse apache logs)
* Wrong audience: Giving the user stack traces instead of English.
