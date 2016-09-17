import { observable, useStrict } from 'mobx';
import { Mortgage } from './Mortgage';
useStrict(true);

class MortgagesState {
    @observable mortgages = [new Mortgage()];
}

export const mortgagesState = new MortgagesState();