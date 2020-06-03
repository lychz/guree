#!/usr/bin/env bash
yarn build && \
npm version ${1:-patch} && \
git push