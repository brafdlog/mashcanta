import { observable, useStrict, action } from 'mobx';
import Mortgage from './Mortgage';
useStrict(true);

class StateStore {
    @observable mortgages = [new Mortgage()];
    @observable isLoading = false;

    @action setMortgages(mortgages) {
        this.mortgages = mortgages;
    }

    @action('Set loading') setLoading(isLoading) {
        this.isLoading = isLoading;
    }
}

export const stateStore = new StateStore();