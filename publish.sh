#!/usr/bin/env bash
yarn build && \
yarn styleguide:build && \
npm version ${1:-patch} && \
git push