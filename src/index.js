/**
 * Copyright (C) MYOB - 2015
 */

'use strict';

import 'babel-core/polyfill';
import 'babel-core/external-helpers';

import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/HelloWorld';

ReactDOM.render(<HelloWorld />, document.getElementById('container'));
