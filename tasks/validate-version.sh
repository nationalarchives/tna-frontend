#!/bin/bash

set -e
CURRENT_VERSION=$(node -p "require('./package.json').version")
PACKAGE_LOCK_VERSION=$(node -p "require('./package-lock.json').version")
echo "Version in package.json:      $CURRENT_VERSION"
echo "Version in package-lock.json: $PACKAGE_LOCK_VERSION"
echo "Version to check against:     $1"
if [ "$CURRENT_VERSION" != "$PACKAGE_LOCK_VERSION" ]; then
  echo "Version $CURRENT_VERSION in package.json doesn't match version $PACKAGE_LOCK_VERSION in package-lock.json."
  exit 1
elif [ "$CURRENT_VERSION" != "$1" ]; then
  echo "The git tag $1 doesn't match the version in package.json."
  exit 1
fi
