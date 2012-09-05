#!/usr/bin/env ruby

require "json"

count = 0
File.new("access_json.log").each_line do |line|
  begin
    JSON.parse(line)
    count += 1
  rescue => e
    puts "Failed to parse: #{line.inspect}"
    puts e
  end
end

puts "Successful: #{count}"
