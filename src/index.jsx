import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import Root from './components/Root.jsx';
import { stateStore } from './store/StateStore';
import './appInitializer';

@observer
export class App extends React.Component {

    render() {
        return (
            <Root stateStore={stateStore} />
		);
    }
}

ReactDOM.render(<App />, document.querySelector('#myApp'));