'use strict';

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const dotenv = require('dotenv');
const common = require('./webpack.common.js');

const env = dotenv.config().parsed;
env.NODE_ENV = 'development';

const envVariables = Object.keys(env).reduce((prev, next) => {
  prev[next] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  plugins: [new webpack.DefinePlugin(envVariables)],
});
