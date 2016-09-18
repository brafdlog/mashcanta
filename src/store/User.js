import { observable, computed, action } from 'mobx';

export default class User {

    @observable id;
    @observable firstName;
    @observable lastName;

    @action('Init user') init = (id, firstName, lastName) => {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    @computed get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

}