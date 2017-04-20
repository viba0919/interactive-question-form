#!/bin/sh

npm cache clean
bower cache clean

npm prune
bower prune

npm install
bower install

gulp
