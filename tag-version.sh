#!/usr/bin/env bash

export PACKAGE_VERSION=$(npm run get_version | tail -n 1);
if ! [ $(git tag -l "$PACKAGE_VERSION") ]; then
    echo "TAGGING $PACKAGE_VERSION...";
    git tag $PACKAGE_VERSION;
    git push --tags;
fi