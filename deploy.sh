#!/usr/bin/env sh
npm run docs:build;
cd docs/.vuepress/dist;
cp -R . ../../;
git add -A;
git commit -m 'deploy';
git push;
