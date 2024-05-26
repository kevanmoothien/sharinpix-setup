#!/bin/bash

if [ ! -f bin/phantomjs ]; then
  echo "PhantomJS not found, installing..."
  wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2
  tar -xf phantomjs-2.1.1-linux-x86_64.tar.bz2
  mv phantomjs-2.1.1-linux-x86_64/bin/phantomjs bin/
  rm -rf phantomjs-2.1.1-linux-x86_64*
else
  echo "PhantomJS already installed."
fi

yarn install
yarn start


