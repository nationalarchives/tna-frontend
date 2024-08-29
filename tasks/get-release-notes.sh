#!/bin/bash

set -e

if [ -z "$1" ]
then
  echo -e "Error: version not specified\n";
  echo "PARAMETERS"
  echo "  version              the version you want the release notes for"
  echo "                       Example: get-release-notes.sh 0.1.48";
  exit 1
fi

awk -v ver="$1" '
 /^## \[[0-9]+\.[0-9]+\.[0-9]+/ {
  if (p) { exit };
  if (index($2, "[")) {
    split($2, a, "[");
    split(a[2], a, "]");
    if (a[1] == ver) {
      p = 1
    }
  } else {
    if ($2 == ver) {
      p = 1
    }
  }
} p
' CHANGELOG.md
