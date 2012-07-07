---
layout: article
title: mysql logs - a study
---

* Goal: Learn from mistakes and successes in mysql's log systems.
* Audience: Folks interested in learning from live examples!

# MySQL Log Study

According to [mysql's docs][mysql-docs], there are about five different kinds of logs:

[mysql-docs]: [http://dev.mysql.com/doc/refman/5.5/en/server-logs.html]

* error log
* general query log
* binary log
* relay log
* slow query log

Depending on storage engines used, you'll have other log files as well (innodb
log file, etc).

In most mysql deployments, there are 3 possible actors: the mysql server, mysql
clients, and replication parters. The logs tend to cover actions between pairs
of actors, or roughly the purpose of each log:

* internal mysql server: error log
* replication: binary and relay logs
* clients: general query and slow query logs

## Error Log

Relevant my.cnf settings: `log-error`, `log-warnings`.

According to mysql's docs, the error log generally contains information about
mysqld's status; generally start and stop messages as well as critical errors.
Unfortunately, mysql also logs warnings to the error log by default.

What the docs don't say is that pretty much anything not data-related is logged
here. This log file is a complete mess. Most of what I see in the sample below 
has nothing to do with errors or warnings.

    120707  0:37:09 [Note] Plugin 'FEDERATED' is disabled.
    120707  0:37:09 InnoDB: The InnoDB memory heap is disabled
    120707  0:37:09 InnoDB: Mutexes and rw_locks use GCC atomic builtins
    120707  0:37:09 InnoDB: Compressed tables use zlib 1.2.5
    120707  0:37:09 InnoDB: Using Linux native AIO
    120707  0:37:09 InnoDB: Initializing buffer pool, size = 128.0M
    120707  0:37:09 InnoDB: Completed initialization of buffer pool
    120707  0:37:09 InnoDB: highest supported file format is Barracuda.
    120707  0:37:09  InnoDB: Waiting for the background threads to start
    120707  0:37:10 InnoDB: 1.1.8 started; log sequence number 1595675
    120707  0:37:10 [Note] Server hostname (bind-address): '(null)'; port: 3306
    120707  0:37:10 [Note]   - '(null)' resolves to '0.0.0.0';
    120707  0:37:10 [Note]   - '(null)' resolves to '::';
    120707  0:37:10 [Note] Server socket created on IP: '0.0.0.0'.
    120707  0:37:10 [Note] Event Scheduler: Loaded 0 events
    120707  0:37:10 [Note] /usr/libexec/mysqld: ready for connections.
    Version: '5.5.24-log'  socket: 'mysql.sock'  port: 3306  MySQL Community Server (GPL)

The format of this log file is a bit confusing and pretty inconsistent. I'm not
sure how "highest supported file format is Barracuda." is an error or a
warning, but it's in the error log anyway. ☹

### Mistakes

This log format is a bit strange. The timestamp seems consistent, even if it is
odd. The message seems to have no consistency, meaning 'grep' and other
pattern/text tools may be your chief weapons against this beast.

I wouldn't expect to achieve much in the ways of data mining from this log.

## General Query Log

This log appears to contain every request sent to the mysql server. Here's what
shows up when I login and run a few commands:

    % mysql -uroot
    > select * from mysql.user;
    ...
    > hello world;
    ... (syntax error ... )

Contents of general query log:

    120707  0:40:34     4 Connect   root@localhost on 
                        4 Query     select @@version_comment limit 1
    120707  0:40:45     4 Query     select * from mysql.user
    120707  0:41:18     5 Query     hello world

Notes:

* Column-oriented visual format.
* Poor timestamp: No timezone. No subsecond precision.
* ANSI control codes and other oddities are not escaped. Fun and profit here.

### Hacks

Because the general query log literally logs all requests sent to mysqld, you could
mark major events (schema changes, upgrades, etc) by sending bad requests;

    mysql> NOTE: SCHEMA VERSION 12345 DEPLOYED;

And in the general query log:

    120707  0:49:47     5 Query     NOTE: SCHEMA VERSION 12345 DEPLOYED

## Slow Query Log

## Binary Log

## Relay Log

