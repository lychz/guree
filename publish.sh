#!/usr/bin/env bash
yarn build && \
yarn styleguide:build && \
git add -A && \
git commit -m "update document" && \
npm version ${1:-patch} && \
git push origin --tags