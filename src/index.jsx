import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root.jsx';

export class App extends React.Component {
    render() {
        return (
            <Root />
		);
    }
}

ReactDOM.render(<App />, document.querySelector('#myApp'));