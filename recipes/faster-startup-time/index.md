---
layout: article
title: faster startup time
tags: 
---

* Goal: Launch logstash faster to improve iteration time while working on your config
* Audience: Logstash developers, administrators

See also: https://logstash.jira.com/browse/LOGSTASH-563 ("Agent start time is stupid long")

# baseline

On my home box, this takes about 30 seconds:

    java -Xmx32m -jar logstash-1.1.1-monolithic.jar agent -f conf/logstash.conf

You can see a full startup/shutdown time here where I"ll use a closed stdin to
shutdown logstash:

    % time java -jar logstash-1.1.6-monolithic.jar agent -e 'input { stdin { type => foo } }' < /dev/null
    27.17s user 0.69s system 111% cpu 24.887 total

# using the 'flatjar'

"flatjar" releases are packed differently in the jar file. This is done to improve startup times.

Starting with logstash 1.1.6, you can download these flatjar builds with a release:

<http://logstash.objects.dreamhost.com/release/logstash-1.1.6-flatjar.jar>

The startup time is much faster:

    % time java -jar logstash-1.1.6-flatjar.jar agent -e 'input { stdin { type => foo } }' < /dev/null   
    8.27s user 0.19s system 129% cpu 6.532 total
    
# Unzipping the jar

One way to significantly shorten startup times is to unpack the jar before it's run.

    unzip -d logstash logstash.jar
    java -cp logstash logstash.runner agent -f logstash.conf
    
If you use any grok pattern names, running from the unpacked version will likely error with
'Exception in thread "LogStash::Runner" org.jruby.exceptions.RaiseException: (PatternError) 
pattern %{[PATTERN_NAME]} not defined'. To fix this:

    ln -s logstash/patterns patterns

Then, try running logstash as above once again.

