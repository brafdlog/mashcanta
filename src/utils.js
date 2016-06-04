import _ from 'lodash';

const POSSIBLE_ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateId = (idLength) => {
    let id = '';
    _.times(idLength, () => {
        id += POSSIBLE_ID_CHARS.charAt(Math.floor(Math.random() * POSSIBLE_ID_CHARS.length));
    });
    return id;
};

export const addCommasToNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');