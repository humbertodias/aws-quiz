#!/bin/bash

jq '.results .[].guide' -r ../json/exams.json > guide.txt
wget -i guide.txt

jq '.results .[].sample' -r ../json/exams.json > sample.txt
wget -i sample.txt