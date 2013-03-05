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

    { "@timestamp": "2012-08-22T14:35:19-0700",  "client": "127.0.0.1", "duration_usec": 532, "status": 404, "request": "/favicon.ico", "method": "GET", "referrer": "-" }

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
      "@timestamp" => "2012-08-22T14:53:47-0700"
    }

Voila!

## Simplify with mod_macro

We can greatly simplify our setup by using [mod_macro](https://people.apache.org/~fabien/mod_macro/)
to generate the [LogFormat](http://httpd.apache.org/docs/current/mod/mod_log_config.html#logformat) and
[CustomLog](http://httpd.apache.org/docs/current/mod/mod_log_config.html#customlog) at the same time.

If our [VirtualHost](http://httpd.apache.org/docs/current/mod/core.html#virtualhost)'s
[DirectoryRoots](http://httpd.apache.org/docs/current/mod/core.html#directoryroot) are consistently built
we can predictably build our configuration as follows:'

{% include_code macro.conf %}

We can now create a VirtualHost, that uses this macro:

    <VirtualHost *:80>
       ServerName www.example.com
       DirectoryRoot /srv/web/example.com/www/htdocs
       Use logstash_log www.example.com prod-web137.dmz01.dc03.acme.com
    </VirtualHost>

## Is it safe?

Well, I tested with Apache/2.2.22 and found it appears quite safe. 

What is safe? Well, safe meaning apache generates valid JSON.

To test this, I made a simple apache config and two scripts; the first script
spams apache with some pretty unsavory http requests, and the second script
reads the apache log and verifies that all the entries parse as valid JSON.

    % sh run.sh
    Starting apache
    Spamming apache with requests
    Verifying valid JSON
    Successful: 10000

Technically, what is verified above is that the ruby JSON parser can process
the data. Since apache uses '\xNN' notation for escaping special characters,
it is technically invalid 'JSON', but I've found that many JSON parsers happily
accept it.

You can see the code for this test here: [apache.conf](test/apache.conf),
[spam.rb](test/spam.rb), [check.rb](test/check.rb).
