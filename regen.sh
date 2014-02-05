#!/bin/sh

. $HOME/.rvm/scripts/rvm
git pull --rebase
jekyll  --kramdown --no-auto
compass compile --css-dir _site/css
