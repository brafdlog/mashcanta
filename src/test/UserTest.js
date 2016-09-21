/* eslint-disable */
import { expect } from 'chai';
import { observer } from 'mobx';
import User from '../store/User';

const ALLOWED_DIFFERENCE = 1;

describe('User tests', function() {

    describe('basic', function() {
        it('should init user correctly', function() {
            const user = new User();
            user.init(7, 'Moshe Ufnik', 'moshe@ufnik.com');
            
            expect(user.id).to.equal(7);
            expect(user.name).to.equal('Moshe Ufnik');
            expect(user.email).to.equal('moshe@ufnik.com');
        });

    });

});