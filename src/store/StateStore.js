import { observable, useStrict, action } from 'mobx';
import Mortgage from './Mortgage';
useStrict(true);

class StateStore {
    @observable mortgages = [new Mortgage()];

    @action setMortgages(mortgages) {
        this.mortgages = mortgages;
    }
}

export const stateStore = new StateStore();