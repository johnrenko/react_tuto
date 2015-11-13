/**
 * Copyright (C) MYOB - 2015
 */

'use strict';

import React from 'react';

class HelloWorld extends React.Component {
  render() {
    return (
      <section className="container-fluid">
        <h1>Hello World!!!</h1>
        <div className="row">
          <div className="col-xs-12">
            <h3 className="myob-icon-comments"> Welcome to React !</h3>
          </div>
          <div className="col-xs-12">
            <div className="alert alert-success">Successfully running MYOB styles as well !</div>
          </div>
        </div>
      </section>
    );
  }
}

export default HelloWorld;
