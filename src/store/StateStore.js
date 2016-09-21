import { observable, useStrict, action, computed } from 'mobx';
import Mortgage from './Mortgage';
import User from './User';
import _ from 'lodash';
useStrict(true);

export const BEFORE_AUTH = 'before auth';
export const ANONYMOUS = 'anonymous';
export const USER_LOGGED_IN = 'logged in';

class StateStore {
    @observable mortgages = this.buildDefaultMortgages();
    @observable currentMortgageId;
    @observable user;
    @observable fetchedUserDataFromDb = false;

    @action('set logged in user') setLoggedInUser(user) {
        this.user = new User();
        this.user.init(user.id, user.name, user.email, user.imageUrl);
    }

    @action('set log out') setLoggedOut() {
        this.user = null;
        this.fetchedUserDataFromDb = false;
        // Reset mortgage data
        this.mortgages = this.buildDefaultMortgages();
        this.currentMortgageId = null;
    }

    @action('Create new mortgage') createNewMortgage = () => {
        const newMortgage = this.buildDefaultMortgages();
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
        this.fetchedUserDataFromDb = true;
        if (!mortgages) {
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

    @computed get isLoading() {
        return this.userStatus === BEFORE_AUTH || (this.userStatus === USER_LOGGED_IN && !this.fetchedUserDataFromDb);
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

    buildDefaultMortgages() {
        const mortgage = new Mortgage();
        mortgage.addPart();
        return [mortgage];
    }
}

export const stateStore = new StateStore();