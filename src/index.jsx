import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import Root from './components/Root.jsx';

@observer
export class App extends React.Component {
    render() {
        return (
            <Root />
		);
    }
}

ReactDOM.render(<App />, document.querySelector('#myApp'));