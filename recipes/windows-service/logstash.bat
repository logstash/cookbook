
C:
cd \logstash

set HOME=c:/logstash/sincedb

"c:\Program Files\Java\jdk1.6.0_37\bin\java.exe" -Xmx32M -jar logstash-1.1.7-monolithic.jar agent --config logstash.conf --log logstash.log

