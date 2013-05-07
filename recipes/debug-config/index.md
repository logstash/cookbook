---
layout: article
title: debug config/filters
tags: tools, debug, filter, config
---

* Goal: debug your (failing) config/filters
* Audience: Folks who want to know why their config breaks

# Workflow

This howto will show you how you can debug your logstash-config in a linux-terminal.

## initial setup

You need a console-windows running logstash and your editor, you should be able to switch between them in a reasonably short time :-)

In the console run start logstash with a clean config-file that only contains the filter you want to debug:
```bash
java -jar /home/logstash/logstash-1.1.10-flatjar.jar agent -e "$(cat /usr/local/etc/logstash/conf-available/50-filtertest.conf)"
```
You will have to change the paths in the command according to your setup.

## debugging

The config (`50-filtertest.conf`) should only contain a simple filter:
```
filter {
  grok {
    type => "stdin"
    patterns_dir => [ "/usr/local/etc/logstash/patterns" ]
    pattern => "%{FOO_LOG}"
  }
}
```

Here we use additional patterns from the file `/usr/local/etc/logstash/patterns`, and try to use the pattern `FOO_LOG`._FIXME

You now have to paste one/many line/s into the console where logstash is running. This makes logstash run the pasted data through the specified filter.
Try to break the pattern down to something more simple when you get parse-errors.
You have to restart logstash (press `CTRL-c`, `arrow up`, `enter`) every time you change something in the config and want to test that.

Add debug to your stdout output what can additionally help debugging your patterns and fields:
```
output {  stdout {  debug => true } }
```

## example with URIPATHPARAM

Lets say you have a problem matching `%{URIPATHPARAM}`. You shoud then try to match the following (going from big rules to smaller ones):

1.  `(?:/[A-Za-z0-9$.+!*'(){},~:;=#%_\-]*)+` (try only to paste the first part of the whole line that should match on URIPATHPARAM)<br>when that works try the next part of `%{URIPATHPARAM}`
2.  `\?[A-Za-z0-9$.+!*'|(){},~#%&/=:;_?\-\[\]]*` (try to paste the last part of the line

## example with SYSLOGBASE
Again try to match every single part of a syslogline:

1.  `%{MONTH} +%{MONTHDAY} %{TIME}` (%{SYSLOGTIMESTAMP})
2.  `<%{NONNEGINT:facility}.%{NONNEGINT:priority}>` (%{SYSLOGFACILITY})
[...]

When all single parts match w/o error try to combine all parts beginning with the fist and the second, then continue adding parts and test again.
