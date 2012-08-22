---
layout: article
title: make apache log in json
tags: apache, httpd, json
---

* Goal: Log directly to a structured format in apache.
* Audience: Folks looking to improve their log formats.

# preface: why json?

The default log format offered by apache is only semi-structured. It appears,
as a human reading it, to have some kind of reasonable structure. However, to
process this with the logstash grok filter, it requires a complex and expensive
regular expression to parse it.

The best case for log formats is if you can simply emit them in a structured
format from the application itself. This will reduce any extra parsing in the
future!

# agenda

* Configure apache to emit json to a logfile
* Configure logstash to read the file

## apache config

First, we'll need to tell apache about our new log format. You'll put this in
your httpd.conf:

{% include_code apache.conf %}

Keeping in mind that the goal here is to dump these logs into logstash, the
json schema I provided is specific to how logstash forms its own events.

Reload the apache config, and I now see things like this in my logs:

    { "@timestamp": "2012/08/22T14:35:19-0700",  "client": "127.0.0.1", "duration_usec": 532, "status": 404, "request": "/favicon.ico", "method": "GET", "referrer": "-" }

Apache's documentation explains how/why it escapes values:

> For security reasons, starting with version 2.0.46, non-printable and other
> special characters in %r, %i and %o are escaped using \xhh sequences, where hh
> stands for the hexadecimal representation of the raw byte. Exceptions from this
> rule are " and \, which are escaped by prepending a backslash, and all
> whitespace characters, which are written in their C-style notation (\n, \t,
> etc). In versions prior to 2.0.46, no escaping was performed on these strings
> so you had to be quite careful when dealing with raw log files.
> (from [mod_log_config's format
  notes](http://httpd.apache.org/docs/2.2/mod/mod_log_config.html#format-notes)

This should suffice that our log format always produces valid JSON since apache
escapes most/all necessary things JSON requires to be escaped :)

## logstash config

The config now is pretty simple. We simply tell logstash to expect 'logstash
json' events from the given apache log file. No filters are required because
we are already emitting proper logstash json events!

{% include_code logstash.conf %}

Running logstash with the above config:

    % java -jar logstash.jar agent -f logstash.conf
    {
      "@source"    => "pork.example.com",
      "@type"      => "apache",
      "@tags"      => [],
      "@fields"    => {
        "client"        => "127.0.0.1",
        "duration_usec" => 240,
        "status"        => 404,
        "request"       => "/favicon.ico",
        "method"        => "GET",
        "referrer"      => "-"
      },
      "@timestamp" => "2012/08/22T14:53:47-0700"
    }

Voila!
