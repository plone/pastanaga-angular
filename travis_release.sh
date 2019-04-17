#!/bin/bash

git config --global user.email "build@travis-ci.com"
git config --global user.name "Travis CI"
export PACKAGE_VERSION=$(npm run get_version | tail -n 1)
git tag $PACKAGE_VERSION
git push --quiet https://$GITHUBKEY@github.com/plone/pastanaga-angular --tags 2>&1