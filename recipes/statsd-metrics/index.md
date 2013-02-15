---
layout: article
title: StatsD plugin metrics explanation
tags: getting started, statsd, metrics, logstash
---

* Goal: Help people understand the StatsD metrics
* Audience: Everyone who wants to use the StatsD plugin

# preface: StatsD Metrics

I will show you with examples what the following StatsD metrics mean: **increment**, **timing**, **count**

# Sample Case 1

We receive a number each second for a period of 10 seconds.

Let's say that the starting moment is "t1".

As a table this will look like this:

 Moment  	Number      
 ----  		------------  
 t1     	1
 t1+1s    	2
 t1+2s		3
 t1+3s		4
 t1+4s		5
 t1+5s		6
 t1+6s		7
 t1+7s		8
 t1+8s		9
 t1+9s		10

Now the **count** metric will be equal to the sum of all number for our period of 10 seconds

> 1+2+3+4+5+6+7+8+9+10 = 55

# Sample Case 2

We receive a status each second for a period of 10 seconds. **Status** is just a number. 
For example lets take  HTTP statuses: 200, 404, 302

Let's say that the starting moment is "t1".

As a table this will look like this:

 Moment  	Status      
 ----  		------------  
 t1     	200
 t1+1s    	200
 t1+2s		404
 t1+3s		200
 t1+4s		200
 t1+5s		302
 t1+6s		200
 t1+7s		302
 t1+8s		200
 t1+9s		200

Now the **increment** metric will show how many times a given status is received for our period of 10 seconds.

In our case this will be:

* Status 200: 7 times
* Status 404: 1 times
* Status 302: 2 times

# Sample Case 3

This case is a combination of case 1 and 2. We receive a status each second for a period of 10 seconds,
but for each status comes with a number. Let's imagine that this number is the response time for a HTTP request.

As a table this will look like this:

 Moment  	Status	 Response Time      
 ----  		------	 -------------
 t1     	200		 15ms
 t1+1s    	200		 10ms
 t1+2s		404		 10ms
 t1+3s		200		 20ms
 t1+4s		200		 30ms
 t1+5s		302		 10ms
 t1+6s		200		 15ms
 t1+7s		302		 10ms
 t1+8s		200		 10ms
 t1+9s		200		 20ms
 
Now the **timing** metric will show things like the highest, lowest, and mean response time for all requests for our period of 10 seconds.

In this case it doesn't matter what the status number is. 

In our case this will be:

* Highest: 30ms
* Lowest: 10ms
* Mean: 15+10+10+20+30+10+15+10+10+20 / 10 = 15ms

# Sample Case 4

Now let's have the following excerpt form an apache access log file:

> #Remote_host	Request_time				 Request							Status	Response_bytes	Response_time
> 
> 10.10.10.1 		[13/Feb/2013:10:27:02 +0200] "GET / HTTP/1.1" 					200  	"566"			10000
> 10.10.10.1 		[13/Feb/2013:10:27:02 +0200] "GET /icons/blank.gif HTTP/1.1" 	304 	"195"			5000
> 10.10.10.1 		[13/Feb/2013:10:27:02 +0200] "GET /icons/folder.gif HTTP/1.1" 	304 	"123"			4000
> 10.10.10.1 		[13/Feb/2013:10:27:03 +0200] "GET / HTTP/1.1" 					200 	"520"			11000
> 10.10.10.1 		[13/Feb/2013:10:27:03 +0200] "GET /icons/folder.gif HTTP/1.1" 	304 	"151"			6000
> 10.10.10.1 		[13/Feb/2013:10:27:03 +0200] "GET /icons/blank.gif HTTP/1.1" 	304 	"158"			5000
> 10.10.10.1 		[13/Feb/2013:10:27:03 +0200] "GET / HTTP/1.1" 					200 	"502"			12000
> 10.10.10.1 		[13/Feb/2013:10:27:03 +0200] "GET /icons/folder.gif HTTP/1.1" 	304 	"226"			4000
> 10.10.10.1 		[13/Feb/2013:10:27:03 +0200] "GET /icons/blank.gif HTTP/1.1" 	304 	"107"			5000

Let's have this excerpt from a logstash configuration:

{% include_code logstash.conf %}

,where:

* reqmusecst - the value in column "Response_time"
* response - the value in column "Status"
* bytes - the value in column "Response_bytes"
* sitename - has a value "site1"

StatsD will produce the following data for our 10 seconds period from 10:27:00h to 10:27:10h

* stats_count.logstash.10_10_10_1.apache.site1.response.200 = 3 (we have received 3 times status 200 for our period of 10 seconds)
* stats_count.logstash.10_10_10_1.apache.site1.response.304 = 6 (we have received 6 times status 304 for our period of 10 seconds)
* stats_count.logstash.10_10_10_1.apache.site1.bytes = 566+195+123+520+151+158+502+226+107 = 2548 bytes
* stats.timers.logstash.10_10_10_1.apache.site1.lower = 4000 (lowest response time is 4000 ms for our period of 10 seconds)
* stats.timers.logstash.10_10_10_1.apache.site1.upper = 12000 (highest response time is 12000 ms for our period of 10 seconds)
* stats.timers.logstash.10_10_10_1.apache.site1.mean = (10000 + 5000 + 4000 + 11000 + 6000 + 5000 + 12000 + 4000 + 5000) / 9 = 6888 (mean response time for our period of 10 seconds)
* stats.timers.logstash.10_10_10_1.apache.site1.count = 9 ( total number of responses for our period of 10 seconds)

StatsD calculates some additional data:

* stats.logstash.10_10_10_1.apache.site1.response.200 = 3 / 10 = 0.3 (number of responses with status 200 per second)
* stats.logstash.10_10_10_1.apache.site1.response.304 = 6 / 10 = 0.6 (number of responses with status 304 per second)
* stats.logstash.10_10_10_1.apache.site1.bytes =  2548 / 10 = 254.8 (bytes per second)
* stats.timers.logstash.10_10_10_1.apache.site1.count_ps = 9 / 10 = 0.9 (responses per second)
