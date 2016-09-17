import { observable, useStrict, action } from 'mobx';
import { Mortgage } from './Mortgage';
useStrict(true);

class MortgagesState {
    @observable mortgages = [new Mortgage()];

    @action setMortgages(mortgages) {
        this.mortgages = mortgages;
    }
}

export const mortgagesState = new MortgagesState();