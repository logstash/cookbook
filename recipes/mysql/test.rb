require "ap"
describe "mysql logs" do
  extend LogStash::RSpec

  describe "slow query log" do
    # The logstash config goes here.
    # At this time, only filters are supported.
    config File.read("mysql-slow.conf")

    data  = File.open(__FILE__)
    data.each { |line| break if line == "__END__\n" }

    events = data.collect do |line|
      LogStash::Event.new("@message" => line.chomp, "@type" => "mysql-slow")
    end

    sample events do
      event = subject.first
      #ap event.to_hash
      insist { subject["user"] } == "amavis"
      insist { subject["host"] } == "randomhost.local"
      insist { subject["ip"] } == "10.1.22.33"
      insist { subject["duration"] } == 114
      insist { subject["lock_wait"] } == 0
      insist { subject["results"] } == 25856
      insist { subject["scanned"] } == 10864578
      insist { subject.timestamp } == "2012-10-25T15:40:26.000Z"
    end
  end
end

__END__
# Time: 121025 15:40:26
# User@Host: amavis[amavis] @  [10.3.67.54]
# Query_time: 114  Lock_time: 0  Rows_sent: 25856  Rows_examined: 10864578
SET timestamp=1351204826;
/* amavis cleanquarantine N:D:S:Amavis 175 */ select msg_headers.id, filename from msg_headers, users where (users.id=msg_headers.user_id)  and (date_add(storetime, interval retention day) < now());

