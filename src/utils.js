import _ from 'lodash';
import str from './localization';

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

export const isWholeNumber = (someNumber) => _.isNumber(someNumber) && (someNumber % 1 === 0);

export const retainNDecimals = (someNumber, numDecimalsToRetain) => {
    if (!someNumber) {
        return 0;
    }
    if (isWholeNumber(someNumber)) {
        return someNumber;
    }
    try {
        const numberWithoutDecimals = Number(someNumber.toFixed(numDecimalsToRetain));
        return numberWithoutDecimals;
    } catch (error) {
        console.log('Failed running retainNDecimals on ' + someNumber, error);
        return someNumber;
    }
};

export const addCommasToNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatWholeDollarAmount = (original) => addCommasToNumber(removeAllDecimals(original)) + ' ' + str('currencySymbol');

export const formatPercent = (original) => retainNDecimals(original, 2) + '%';

export const replaceAll = (originalString, search, replacement) => {
    return originalString.replace(new RegExp(search, 'g'), replacement);
};

export const formattedStringToNumber = fomattedStr => {
    if (_.isNumber(fomattedStr)) {
        return fomattedStr;
    }
    const withoutFormattingChars = replaceAll(fomattedStr, `[,%${str('currencySymbol')} ]`, '');
    return Number(withoutFormattingChars);
};

export const convertRgbToRgba = (rgb, alpha) => {
    let rgba = rgb.replace('rgb', 'rgba');
    rgba = rgba.replace(')', `,${alpha})`);
    return rgba;
};