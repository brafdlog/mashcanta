import React from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react';
import Root from './components/Root.jsx';
import { stateStore } from './store/StateStore';
import { getFromStorage } from './storage';

@observer
export class App extends React.Component {

    constructor(props) {
        super(props);
        stateStore.setLoading(true);
    }

    render() {
        return (
            <Root currentMortgage={stateStore.currentMortgage} isLoading={stateStore.isLoading} />
		);
    }

    componentDidMount() {
        getFromStorage('mortgageInfo').then(storedMortgageInfo => {
            stateStore.setMortgages([storedMortgageInfo]);
            stateStore.setLoading(false);
        });
    }
}

ReactDOM.render(<App />, document.querySelector('#myApp'));