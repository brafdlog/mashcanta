import { observable, action } from 'mobx';

export default class User {

    @observable id;
    @observable name;
    @observable email;

    @action('Init user') init = (id, name, email) => {
        this.id = id;
        this.name = name;
        this.email = email;
    }

}