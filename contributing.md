---
layout: article
title: contributing to the cookbook
tags:  meta
---

* Goal: Learn how to contribute to this cookbook.
* Audience: Folks willing to share experience in logstash.

# You can help!

This site is open to anyone wanting to share tricks, configurations, and
production experience with logstash.

In general, every page here is a single page written in markdown. Articles
format themselves using javascript, so you don't have to worry much about that.
You get a table of contents for free for any headers.

# Simple Markdown

You might also find these links useful for markdown references:

* [markdown syntax](http://daringfireball.net/projects/markdown/syntax/)
* [github-flavored markdown](http://github.github.com/github-flavored-markdown/)

# Including Files

You can include files by putting `{% include_code the_file_name %}` on a line
by itself. It will look like this:

{% include_code recipes/example/example.txt %}

# Embedding HTML

Since this is just markdown, you can embed html by putting blank lines around
the start and end.

# Full Example

You can view any of the markdown files for this site to see how the article is
done. As an example, check out [this example](recipes/example). Here's the code
for that example:

{% include_code recipes/example/index.md.txt %}
