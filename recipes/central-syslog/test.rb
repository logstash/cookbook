require "test_utils"

describe "parse syslog" do
  extend LogStash::RSpec

  config File.read(File.join(File.dirname(__FILE__), "logstash-indexer.conf"))

  sample("message" => "<164>Oct 26 15:19:25 1.2.3.4 %ASA-4-106023: Deny udp src DRAC:10.1.2.3/43434 dst outside:192.168.0.1/53 by access-group \"acl_drac\" [0x0, 0x0]", "type" => "syslog") do
    insist { subject["type"] } == "syslog"
    insist { subject["syslog_pri"] } == "164"
    insist { subject["message"] } == "Deny udp src DRAC:10.1.2.3/43434 dst outside:192.168.0.1/53 by access-group \"acl_drac\" [0x0, 0x0]"
  end

  # Single digit day
  sample("message" => "<164>Oct  6 15:19:25 1.2.3.4 %ASA-4-106023: Deny udp src DRAC:10.1.2.3/43434 dst outside:192.168.0.1/53 by access-group \"acl_drac\" [0x0, 0x0]", "type" => "syslog") do
    insist { subject["type"] } == "syslog"
    insist { subject["syslog_pri"] } == "164"
    insist { subject["message"] } == "Deny udp src DRAC:10.1.2.3/43434 dst outside:192.168.0.1/53 by access-group \"acl_drac\" [0x0, 0x0]"
  end
end
