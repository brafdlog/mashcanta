import { observable, action } from 'mobx';

export default class User {

    @observable id;
    @observable name;
    @observable email;
    @observable imageUrl;

    @action('Init user') init = (id, name, email, imageUrl) => {
        this.id = id;
        this.name = name;
        this.email = email;
        this.imageUrl = imageUrl;
    }

}