/**
 * Copyright (C) MYOB - 2015
 */

'use strict';

import React from 'react';
import Button from './Button.js';

class HelloWorld extends React.Component {
  constructor(props) {
    super(props);
    this.state = {input: 'My Button'};
    this._handleChange = this._handleChange.bind(this);
  }

  _handleChange() {
    this.setState({
      input: event.target.value
    });
  }

  render() {
    return (
      <div>
        <input className="form-control" onChange={this._handleChange}/>
        <Button name={this.state.input} />
      </div>
    );
  }
}

export default HelloWorld;
