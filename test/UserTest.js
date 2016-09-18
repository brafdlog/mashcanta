/* eslint-disable */
import { expect } from 'chai';
import * as calculator from '../src/calculator';
import { KEREN_SHAVA, SHPITZER } from '../src/consts';
import { observer } from 'mobx';
import User from '../src/store/User';

const ALLOWED_DIFFERENCE = 1;

describe('User tests', function() {

    describe('basic', function() {
        it('should init user correctly', function() {
            const user = new User();
            user.init(7, 'Moshe', 'Ufnik');
            
            expect(user.id).to.equal(7);
            expect(user.firstName).to.equal('Moshe');
            expect(user.lastName).to.equal('Ufnik');
            expect(user.fullName).to.equal('Moshe Ufnik');
        });

    });

});
