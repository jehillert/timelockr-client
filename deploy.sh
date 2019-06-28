#!/usr/bin/env bash
set -e
git add --all
git status
git commit --allow-empty -m "Updating github repo for AWS deployment with code modifications oF $(date)"
# git push origin master
git push -u origin AWS
echo -e "\e[32mUpdate successful."
