import _ from 'lodash';

const POSSIBLE_ID_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export const generateId = (idLength = 7) => {
    let id = '';
    _.times(idLength, () => {
        id += POSSIBLE_ID_CHARS.charAt(Math.floor(Math.random() * POSSIBLE_ID_CHARS.length));
    });
    return id;
};

export const removeAllDecimals = (someNumber) => {
    if (!someNumber) {
        return 0;
    }
    return Math.floor(someNumber);
};

const isWholeNumber = (someNumber) => someNumber % 1 === 0;

export const retainNDecimals = (someNumber, numDecimalsToRetain) => {
    if (!someNumber) {
        return 0;
    }
    if (isWholeNumber(someNumber)) {
        return someNumber;
    }
    const numberWithoutDecimals = Number(someNumber.toFixed(numDecimalsToRetain));
    return numberWithoutDecimals;
};

export const addCommasToNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatWholeDollarAmount = (original) => '$' + addCommasToNumber(removeAllDecimals(original));

export const formatPrecent = (original) => retainNDecimals(original, 2) + '%';