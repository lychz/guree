#!/usr/bin/env bash
yarn build && \
yarn styleguide:build && \
git commit -m"update document"&& \
npm version ${1:-patch} && \
git push