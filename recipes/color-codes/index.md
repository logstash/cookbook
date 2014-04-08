---
layout: article
title: removing color codes from linux logs
tags:  linux
---

* Goal: Remove color codes from Linux logs.
* Audience: People who are trying to parse logs that contain color codes (Unicorn for example)

# preface: color codes

Color codes are added to various log files by loggers (Ruby in this case) which are useful when 
viewing logs on a Linux server. This causes issues when the logs are forwarded to Logstash by 
these servers. The color codes are displayed as normal text but contain non-printable characters.
This will stop patterns working on lines from these logs

# example

For this example, we will be using these strings from a Ruby log file:

    D, [2013-01-17T14:59:52.415396 #10324] DEBUG -- :   ESC[1mESC[36mProduct Load (0.8ms)ESC[0m  ESC[1mSELECT `product`.* FROM `products` WHERE `products`.`id` = 14 LIMIT 1ESC[0m
    D, [2013-01-17T14:59:52.436057 #10324] DEBUG -- :   ESC[1mESC[35mUser Load (1.0ms)ESC[0m  SELECT `users`.* FROM `users` WHERE `users`.`id` = '123' LIMIT 1

The ESC characters are non-printable and will cause patterns to fail. Adding a mutate on the 
incoming message like this:

    # Get rid of color codes
    mutate {
      gsub => ["message", "\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]", ""]
    }

will result in the Ruby logs becoming this:

    D, [2013-01-17T14:59:52.415396 #10324] DEBUG -- : Product Load (0.8ms) SELECT `product`.* FROM `products` WHERE `products`.`id` = 14 LIMIT 1
    D, [2013-01-17T14:59:52.436057 #10324] DEBUG -- : User Load (1.0ms) SELECT `users`.* FROM `users` WHERE `users`.`id` = '123' LIMIT 1

These logs are then more easily grokked as the logs are now in a predictable format.
