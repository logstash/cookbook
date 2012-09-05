#!/bin/sh

echo "Starting apache"
httpd -f $PWD/apache.conf -k start > /dev/null 2>&1

echo "Spamming apache with requests"
ruby spam.rb http://localhost:9396/

echo "Verifying valid JSON"
ruby check.rb access_json.log
if [ $? -ne 0 ] ; then
  echo "Failure!"
  exit 1
fi

