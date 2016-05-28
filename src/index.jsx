import React from 'react';
import ReactDOM from 'react-dom';

import * as calculator from './calculator';

export class App extends React.Component {
	render() {
		return (
			<div>SNARF</div>
		);
	}
}

ReactDOM.render(<App/>, document.querySelector("#myApp"));
