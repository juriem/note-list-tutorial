import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from "./Signup";

if (Meteor.isClient) {
    describe('Sigup', function () {

        it('should set an error for small password', function(){
            const wrapper = mount(<Signup createUser={() => {} }/>);
            wrapper.ref('password').node.value = '';
            wrapper.find('form').simulate('submit');
            expect(wrapper.find('p').text()).toBe('Password must be more than 8 characters long');
        });

        it('should call the function for create user', function(){
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy} />);

            const email = 'user@example.com';
            const password = 'password123';
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({email, password});

        });

        it('should set error when call function for create new user', function(){
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy} />);
            const email = 'user@example.com';
            const password = 'password123';
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;

            wrapper.find('form').simulate('submit');

            spy.calls[0].arguments[1]({reason: 'Test error reason'});
            expect(wrapper.state('error')).toBe('Test error reason');
        });
    });
}