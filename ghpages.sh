#!/usr/bin/env bash

REPO_PATH=$PWD
pushd $HOME
git clone --branch=gh-pages https://${GITHUB_TOKEN}@github.com/plone/pastanaga-angular publish 2>&1 > /dev/null
cd publish
rm -rf v2
cp -r $REPO_PATH/dist/demo/v2 .
git add .
git commit -m "Update demo v2"
git push -fq origin gh-pages 2>&1 > /dev/null
popd