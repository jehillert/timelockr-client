#!/usr/bin/env bash
set -e

echo -e "\e[33;1m■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■\n\n"
echo -e "\e[33;1mCommit and push all changes to master branch..."
git add -A
git status
git commit --allow-empty -m "Committing changes before merge with gh-pages"
git push origin master

echo -e "\e[33;1mCreateing and checking out gh-pages branch..."
git checkout gh-pages || git checkout -b gh-pages

echo -e "\e[33;1mMerging master branch changes into gh-pages..."
git merge master --no-ff --strategy-option theirs --no-edit --allow-unrelated-histories

echo -e "\e[33;1mRunning build to get the latest in the dist/ folder..."
npm run build

# The dist/ files are ignored by default in the .gitignore
# --all ensures that deletions are taken into account
git add --force --all dist/
git status

# Need to commit these files since they aren't in the index by default during development
git commit --allow-empty -m "Updating gh-pages with latest code built on $(date)"

# GitHub pages requires files to be in the root directory of the repo,
# so subtree push forces the *contents* of the dist directory to become
# the root only on gh-pages
# Update: Using subtree split now to force changes onto gh-pages (https://gist.github.com/cobyism/4730490#gistcomment-1374989)
git push origin `git subtree split --prefix dist gh-pages`:refs/heads/gh-pages --force

# Return to previous branch
# git checkout -
git checkout master
git branch -D gh-pages

npm run deploy

echo -e "\e[32mSuccess!"

####################################################################################################################
# "deploy": "gh-pages -d build",
