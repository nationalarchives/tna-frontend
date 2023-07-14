#!/bin/sh
set -e

# Extract tag version from package.json and package-lock.json
CURRENT_VERSION=$(node -p "require('./package.json').version")
PACKAGE_LOCK_VERSION=$(node -p "require('./package-lock.json').version")

# Get highest tag published on GitHub
HIGHEST_GIT_TAG=$(git tag --list 2>/dev/null | sort -V | tail -n1 2>/dev/null | sed 's/v//g')

if [ $CURRENT_VERSION != $PACKAGE_LOCK_VERSION ]; then
  echo "Version $CURRENT_VERSION in package.json doesn't match version $PACKAGE_LOCK_VERSION in package-lock.json."
  exit 1
elif [ $CURRENT_VERSION == $HIGHEST_GIT_TAG ]; then
  echo "Git tag $HIGHEST_GIT_TAG already exists. Check you have updated the version in package.json correctly."
  exit 1
fi
