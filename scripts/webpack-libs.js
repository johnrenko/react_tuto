/**
 * Copyright (C) MYOB - 2015
 */

'use strict';

const webpack = require('webpack'),
  path = require('path'),
  assign = require('react/lib/Object.assign');

const rootPath = path.join(__dirname, '..'),
  modulesPath = path.join(rootPath, 'node_modules');

// This extension will generate Webpack configuration for dependencies we don't want to parse, or get externally, aliased and so on...
module.exports = function processLibs(config) {
  const aliases = {},
    excluded = [],
    externals = {},
    loaders = [],
    commons = [],
    transpiled = [];

  if (!config.libs) return;

  config.libs.forEach(lib => {
    const name = Object.keys(lib)[0],
      options = lib[name];

    let alias, parse, libPath, loader, common, external, babel;

    if (typeof options === 'object') {
      alias = options.alias;
      parse = 'parse' in options ? options.parse : false;
      libPath = path.resolve(modulesPath, options.path);
      loader = 'loader' in options ? options.loader : false;
      common = 'common' in options ? options.common : true;
      external = 'external' in options ? options.external : false;
      babel = 'babel' in options ? options.babel : false;
    }
    else libPath = path.resolve(modulesPath, options);

    // Dynamically generate aliases (to reduce verbosity and reduce manual errors)
    aliases[name] = libPath;
    if (alias) aliases[alias] = libPath;

    // Dynamically generate no parse rules (to reduce verbosity and reduce manual errors)
    // Only exclude JS files not folders from parsing
    if (!parse) {
      if (libPath.slice(-3) === '.js') excluded.push(libPath);
    }

    // Dynamically generate externals (to reduce verbosity and reduce manual errors)
    // Library dependencies are better not be bundled as consumer will import them as needed
    if (external) {
      externals[name] = external;
      if (alias) externals[alias] = external;
    }

    // Trick to require pre-packaged libraries (Webpack or else...)
    if (loader) loaders.push({test: libPath, loader: 'imports'});

    // Create a common chunk for third party libraries
    if (common) commons.push(name);

    // Enable transpilation of node_modules written in ES6
    if (babel) transpiled.push(libPath);
  });

  // Add loaders to config
  if (loaders.length) config.module.loaders = config.module.loaders.concat(loaders);

  // Add a common.js file for external libraries
  if (commons.length) {
    config.entry.common = commons;
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin('common', 'common.js'));
  }

  // Add third party ES6 libraries to the list of files the babel-loader processes
  // TODO: Assumption at this time the first loader is the babel-loader
  if (transpiled.length) config.module.loaders[0].include = config.module.loaders[0].include.concat(transpiled);

  // Libraries aliases
  config.resolve.alias = config.resolve.alias || {};
  assign(config.resolve.alias, aliases);

  // Not parsed by Webpack
  config.module.noParse = config.module.noParse ?  config.module.noParse.concat(excluded): excluded;

  // Libraries as external dependencies (not bundled)
  config.externals = config.externals || {};
  assign(config.externals, externals);
};
