"use strict";

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import HelloWorld from '../hello-world';

describe('Hello world', () => {
  it('renders title', () => {
    let helloWorld = TestUtils.renderIntoDocument(<HelloWorld />);

    let content = TestUtils.findRenderedDOMComponentWithTag(helloWorld, 'div');

    expect(content.getDOMNode().textContent).toEqual('Hello World!!!');
  });
});
