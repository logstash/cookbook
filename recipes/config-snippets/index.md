---
layout: article
title: Config snippets
tags:  config snippets
---

* Goal: Collect different config snippets that people use
* Audience: Anyone

# grep


## Similar to command line `grep | grep`

      # equivalent to grep "Hello" | grep "World"
      grep {
        match => ["@message", "hello", "@message", "world"]
      }

## Similar to command line `grep -e "" -e ""`

      # equivalent to grep -e "Hello" -e "World"
      grep {
        match => ["@message", "hello", "@message", "world"]
        negate => true
      }

## Copy a field to another one, only if it exists

      #Copy field, avoiding literal string %{value}
      grep {
        match => ["field_to_test", ".+"]
        drop => false
        add_field => ["field_to_add", "%{field_to_test"]
      }

# multiline


## ModSec

      # merge all modsec events for a given entity into the same event.
      multiline {
        type => "modsec"
        pattern => "^--[a-fA-F0-9]{8}-A--$"
        negate => true
        what => previous
      }

