# Testing Apache logs in JSON

Run:

* `sh run.sh`

This will run `httpd` using the apache.conf here, then run 'spam.rb' and finally 'check.rb'

## apache.conf

A minimal apache config that spits out JSON events, one per line.

## spam.rb

Generates random (and possibly unsavory) http requests for apache to parse and log.

## check.rb

Parses the `access_json.log` and verifies it's all valid.
