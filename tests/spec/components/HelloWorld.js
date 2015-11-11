/**
 * Copyright (C) MYOB - 2015
 */

'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import HelloWorld from 'components/HelloWorld';

describe('Hello world', () => {
  it('renders title', () => {
    let helloWorld = TestUtils.renderIntoDocument(<HelloWorld />);

    let content = TestUtils.findRenderedDOMComponentWithTag(helloWorld, 'h1');

    expect(content.getDOMNode().textContent).toEqual('Hello World!!!');
  });
});
