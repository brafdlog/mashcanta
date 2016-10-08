/* eslint-disable */
import { expect } from 'chai';
import { observer } from 'mobx';
import { generateId, removeAllDecimals, retainNDecimals, addCommasToNumber, 
    formatWholeDollarAmount, formatPrecent, replaceAll, formattedStringToNumber,
    convertRgbToRgba } from '../utils';

const ALLOWED_DIFFERENCE = 1;

describe('utils test', function() {

    it('should generate id', function() {
        let id = generateId();
        expect(id).to.be.ok;
        expect(id).not.to.equal(generateId);

        id = generateId(3);
        expect(id).to.be.ok;
        expect(id.length).to.equal(3);
    });

    it('should remove all decimals from number', function() {
        expect(removeAllDecimals()).to.equal(0);
        expect(removeAllDecimals(4)).to.equal(4);
        expect(removeAllDecimals(4.5)).to.equal(4);
        expect(removeAllDecimals(10.7)).to.equal(10);
    });

    it('should retain the given number of decimals', function() {
        expect(retainNDecimals()).to.equal(0);
        expect(retainNDecimals(5, 3)).to.equal(5);
        expect(retainNDecimals(5.7, 3)).to.equal(5.7);
        expect(retainNDecimals(5.7647, 3)).to.equal(5.765);
        expect(retainNDecimals(5.7647, 1)).to.equal(5.8);
    });

    it('should add commas to number correctly', function() {
        expect(addCommasToNumber(1)).to.equal('1');
        expect(addCommasToNumber(13)).to.equal('13');
        expect(addCommasToNumber(100)).to.equal('100');
        expect(addCommasToNumber(1000)).to.equal('1,000');
        expect(addCommasToNumber(25413)).to.equal('25,413');
        expect(addCommasToNumber(412321)).to.equal('412,321');
        expect(addCommasToNumber(1534212)).to.equal('1,534,212');
    });

    it('should format whole dollar amount correctly', function() {
        expect(formatWholeDollarAmount(1)).to.equal('1 ₪');
        expect(formatWholeDollarAmount(13)).to.equal('13 ₪');
        expect(formatWholeDollarAmount(100)).to.equal('100 ₪');
        expect(formatWholeDollarAmount(1000)).to.equal('1,000 ₪');
        expect(formatWholeDollarAmount(25413)).to.equal('25,413 ₪');
        expect(formatWholeDollarAmount(412321)).to.equal('412,321 ₪');
        expect(formatWholeDollarAmount(1534212)).to.equal('1,534,212 ₪');
    });

    it('should format precent correctly', function() {
        expect(formatPrecent()).to.equal('0%');
        expect(formatPrecent(5)).to.equal('5%');
        expect(formatPrecent(5.7)).to.equal('5.7%');
        expect(formatPrecent(5.7647)).to.equal('5.76%');
        expect(formatPrecent(3142.24215)).to.equal('3142.24%');
    });

    it('should do replace all in a string correclty', function() {
        expect(replaceAll('aaaaaa', 'a', 'b')).to.equal('bbbbbb');
        expect(replaceAll('fox trot is a dance i got', 'ot', 'snarf')).to.equal('fox trsnarf is a dance i gsnarf');
    });

    it('should return a number from the given formatted number string', function() {
        expect(formattedStringToNumber(7)).to.equal(7);
        expect(formattedStringToNumber('₪1,000')).to.equal(1000);
        expect(formattedStringToNumber('₪25,413')).to.equal(25413);
        expect(formattedStringToNumber('₪412,321')).to.equal(412321);

        expect(formattedStringToNumber('₪ 1,000')).to.equal(1000);
        expect(formattedStringToNumber('1,000 ₪ 5')).to.equal(10005);
    });

    it('should convert rgb to rgba correctly', function() {
        const rgb1 = 'rgb(130,140,237)';
        const rgb2 = 'rgb(43,200,173)';
        
        expect(convertRgbToRgba(rgb1, 0.3)).to.equal('rgba(130,140,237,0.3)');
        expect(convertRgbToRgba(rgb1, 1)).to.equal('rgba(130,140,237,1)');
        expect(convertRgbToRgba(rgb2, 0.5)).to.equal('rgba(43,200,173,0.5)');
        expect(convertRgbToRgba(rgb2, 0)).to.equal('rgba(43,200,173,0)');
    });

});