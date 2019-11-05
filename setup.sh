#!/usr/bin/env bash

npm init --yes
npm install --save webpack webpack-cli react react-dom react-router-dom redux react-redux @babel/core @babel/preset-react @babel/preset-env babel-loader
touch webpack.config.js
mkdir frontend
touch frontend/index.jsx