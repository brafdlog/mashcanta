import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
    render() {
        return (
            <div>SNARF</div>
		);
    }
}

ReactDOM.render(<App />, document.querySelector('#myApp'));