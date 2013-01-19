---
layout: article
title: Config snippets
tags:  config snippets
---

* Goal: Collect different config snippets that people use
* Audience: Anyone

# multiline


## ModSec

      # merge all modsec events for a given entity into the same event.
      multiline {
        type => "modsec"
        pattern => "^--[a-fA-F0-9]{8}-A--$"
        negate => true
        what => previous
      }

