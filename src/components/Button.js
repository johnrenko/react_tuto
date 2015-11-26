'use strict';

import React from 'react';
import 'myob-styles';

class Button extends React.Component {

	constructor(props) {
    	super(props);
    }

	render() {
		return (
		  <button className="btn btn-primary">
		  	{this.props.name}
		  </button>
		);
	}
}

export default Button;
