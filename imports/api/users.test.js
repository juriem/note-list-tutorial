import { Meteor } from "meteor/meteor";
import expect from 'expect';
import { validateNewUser } from "./users";

if (Meteor.isServer) {
    describe('users', function () {

        it('should allow valid email address', function () {

            const testUser = {
                emails: [{address: 'john.doe@example.com'}]
            };
            expect(() => validateNewUser(testUser)).toNotThrow();
            expect(validateNewUser(testUser)).toBe(true);
        });

        it('should not allow invalid user', function() {
            const testUser = {
                emails: [ {address: 'some ' }]
            };

            expect(() => {
                const r = validateNewUser(testUser);
            }).toThrow();
        })
    });
}
