#!/usr/bin/env ruby

require "socket"

10000.times do
  path = 50.times.collect { rand(256).chr }.join("").gsub("\n", "")
  query = 50.times.collect { rand(256).chr }.join("").gsub("\n", "")
  referrer = 50.times.collect { rand(256).chr }.join("").gsub("\n", "")
  agent = 50.times.collect { rand(256).chr }.join("").gsub("\n", "")

  conn = TCPSocket.new("localhost", 9396)
  conn.write("GET /#{path}?#{query} HTTP/1.1\r\n")
  conn.write("Host: localhost\r\n")
  conn.write("User-Agent: #{agent}\r\n")
  conn.write("Referer: #{referrer}\r\n")
  conn.write("Connection: close\r\n")
  conn.write("\r\n")
  conn.read rescue nil
  conn.close rescue nil
end
