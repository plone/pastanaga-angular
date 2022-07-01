#!/usr/bin/env bash

REPO_PATH=$PWD
pushd $HOME
git config --global user.email "github@github.com";
git config --global user.name "GitHub Actions";
git clone --branch=gh-pages https://${GH_ACTIONS_TOKEN}@github.com/plone/pastanaga-angular publish 2>&1 > /dev/null
cd publish
# delete main demo: find and remove all files except current, v1 and .git directories
find . -maxdepth 1 ! -name v1 ! -name .git ! -name . -exec rm -rv {} \;
cp -r $REPO_PATH/dist/demo .
git add .
git commit -m "Update main demo"
git push -fq origin gh-pages 2>&1 > /dev/null
popd
