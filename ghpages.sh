#!/usr/bin/env bash

REPO_PATH=$PWD
pushd $HOME
git config --global user.email "github@github.com";	
git config --global user.name "GitHub Actions";
git clone --branch=gh-pages https://${GH_ACTIONS_TOKEN}@github.com/plone/pastanaga-angular publish 2>&1 > /dev/null
cd publish
rm -rf v1
cp -r $REPO_PATH/dist/pastanaga-app/v1 .
git add .
git commit -m "Update demo v1"
git push -fq origin gh-pages 2>&1 > /dev/null
popd