import { observable, useStrict, action, computed } from 'mobx';
import Mortgage from './Mortgage';
import User from './User';
import _ from 'lodash';
useStrict(true);

class StateStore {
    @observable mortgages = [new Mortgage()];
    @observable isLoading = false;
    @observable currentMortgageId;
    @observable user;

    @computed get currentMortgage() {
        return this.currentMortgageId ? _.find(this.mortgages, { id: this.currentMortgageId }) : this.mortgages[0];
    }

    @action('set logged in user') setLoggedInUser(user) {
        this.user = new User();
        this.user.init(user.id, user.firstName, user.lastName);
    }

    @action('Create new mortgage') createNewMortgage = () => {
        const newMortgage = new Mortgage();
        this.mortgages.push(newMortgage);
        return newMortgage.id;
    }

    @action('Set current mortgage') setCurrentMortgageId = mortgageId => {
        this.currentMortgageId = mortgageId;
    }

    /**
     * The mortages we get here are not observable objects that mobx knows,
     * So we first create from them observable objects and then set them
     * to the state store.
     */
    @action('Set mortgages') setMortgages = (mortgages) => {
        if (!mortgages || !mortgages[0]) {
            return;
        }
        const observableMortgages = mortgages.map(mortgage => {
            const observableMortgage = new Mortgage();
            observableMortgage.id = mortgage.id;
            if (mortgage.mortgageParts) {
                mortgage.mortgageParts.forEach(part => {
                    observableMortgage.addPart({
                        loanAmount: part.loanAmount,
                        numYears: part.numYears,
                        yearlyInterest: part.yearlyInterest,
                        amortizationType: part.amortizationType,
                        order: part.order
                    });
                });
            } else {
                observableMortgage.addPart();
            }

            return observableMortgage;
        });
        this.mortgages.replace(observableMortgages);
    }

    @action('Set loading') setLoading = (isLoading) => {
        this.isLoading = isLoading;
    }
}

export const stateStore = new StateStore();