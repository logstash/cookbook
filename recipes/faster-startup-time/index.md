---
layout: article
title: faster startup time
tags: 
---

* Goal: Launch logstash faster to improve iteration time while working on your config
* Audience: Logstash developers, administrators

# baseline

On my home box, this takes about 30 seconds:

    java -Xmx32m -jar parts/logstash/logstash-1.1.1-monolithic.jar agent -f conf/logstash.conf

# exploded jar

    unzip logstash-1.1.1-monolithic.jar and you can run this:

    logstash-1.1.1-monolithic% java -cp top/dir/of/unzip/ logstash.runner agent -f conf/logstash.conf

This takes about 18 seconds for me.

# launch in ruby

Notes from IRC:

    <whack> bundle install and perhaps bundle exec ruby bin/logstash agent ...

    <whack> RUBYLIB=$PWD GEM_HOME=$PWD/gems ruby logstash/runner ...

    <whack> I do dev work on it from git doing 'ruby bin/logstash agent .....'

    <whack> but the fastest way *today* is to run from git and invoke ruby/jruby directly
