/**
 * Copyright (C) MYOB - 2015
 */

'use strict';

import 'babel-core/polyfill';
import 'babel-core/external-helpers';

// Require all tests
const testsContext = require.context('spec', true, /\.js$/);
testsContext.keys().forEach(testsContext);

// Require source code (usually you want ..src/ instead below, but our src/index.js deals with the DOM)
var srcContext = require.context('../src/components', true, /\.js$/);
srcContext.keys().forEach(srcContext);
