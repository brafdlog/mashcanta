import React from 'react';
import ReactDOM from 'react-dom';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import Root from './components/Root.jsx';
import { stateStore } from './store/StateStore';
import { getFromStorage, saveToStorage } from './services/native/storage';

@observer
export class App extends React.Component {

    constructor(props) {
        super(props);
        stateStore.setLoading(true);
    }

    render() {
        return (
            <Root stateStore={stateStore} />
		);
    }

    componentDidMount() {
        getFromStorage('mortgageInfo').then(storedMortgageInfo => {
            stateStore.setMortgages(storedMortgageInfo);
            stateStore.setLoading(false);

            // automatically close left panel when editos are open
            autorun('Save to storage on change', () => {
                this.saveStateToStorage();
            });
        });
    }

    saveStateToStorage() {
        const mortgagesToSave = stateStore.mortgages.map(mortgage => mortgage.persistableObject);
        saveToStorage('mortgageInfo', mortgagesToSave);
    }
}

ReactDOM.render(<App />, document.querySelector('#myApp'));