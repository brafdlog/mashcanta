import React from 'react';
import ReactDOM from 'react-dom';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import Root from './components/Root.jsx';
import { stateStore, USER_LOGGED_IN } from './store/StateStore';
import { getFromStorage, saveToStorage } from './services/native/storageNative';

@observer
export class App extends React.Component {

    render() {
        return (
            <Root stateStore={stateStore} />
		);
    }

    componentDidMount() {
        autorun('Save to storage on change', () => {
            if (stateStore.userStatus === USER_LOGGED_IN && stateStore.fetchedUserDataFromDb) {
                const mortgagesToSave = stateStore.mortgages.map(mortgage => mortgage.persistableObject);
                saveToStorage(`user/${stateStore.user.id}/mortgageInfo`, mortgagesToSave);
            }
        });
        autorun('Get user data from db', () => {
            if (stateStore.userStatus === USER_LOGGED_IN) {
                stateStore.setLoading(true);
                getFromStorage(`user/${stateStore.user.id}/mortgageInfo`).then(storedMortgageInfo => {
                    stateStore.setMortgages(storedMortgageInfo);
                    stateStore.setFetchedUserData(true);
                    stateStore.setLoading(false);
                });
            }
        });
    }
}

ReactDOM.render(<App />, document.querySelector('#myApp'));