import { observable, useStrict, action, computed } from 'mobx';
import Mortgage from './Mortgage';
import User from './User';
import _ from 'lodash';
useStrict(true);

export const BEFORE_AUTH = 'before auth';
export const ANONYMOUS = 'anonymous';
export const USER_LOGGED_IN = 'logged in';

class StateStore {
    @observable mortgages = [new Mortgage()];
    @observable isLoading = false;
    @observable currentMortgageId;
    @observable user;
    @observable fetchedUserDataFromDb = false;

    @action('set logged in user') setLoggedInUser(user) {
        this.user = new User();
        this.user.init(user.id, user.name, user.email);
    }

    @action('set log out') setLoggedOut() {
        this.user = null;
        this.fetchedUserDataFromDb = false;
        // Reset mortgage data
        this.mortgages = [new Mortgage()];
        this.currentMortgageId = null;
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
        this.fetchedUserDataFromDb = true;
    }

    @action('Set loading') setLoading = (isLoading) => {
        this.isLoading = isLoading;
    }

    @computed get userStatus() {
        if (_.isUndefined(this.user)) {
            return BEFORE_AUTH;
        } else if (this.user === null) {
            return ANONYMOUS;
        } else {
            return USER_LOGGED_IN;
        }
    }

    @computed get currentMortgage() {
        return this.currentMortgageId ? _.find(this.mortgages, { id: this.currentMortgageId }) : this.mortgages[0];
    }
}

export const stateStore = new StateStore();