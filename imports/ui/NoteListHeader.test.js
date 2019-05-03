import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListHeader } from "./NoteListHeader";

if( Meteor.isClient ) {
    describe('NoteListHeader', function () {
        it('should render button', function () {
            const wrapper = mount(<NoteListHeader meteorCall={() => {
            }}/>);
            expect(wrapper.find('button').text()).toBe('Create Note');
        });

        it('should call function with valid argument', function(){
            const spy = expect.createSpy();
            const wrapper = mount(<NoteListHeader meteorCall={spy}/>);
            wrapper.find('button').simulate('click');
            expect(spy.calls.length).toBe(1);
            expect(spy.calls[0].arguments.length).toBe(1);
            expect(spy.calls[0].arguments[0]).toBe('notes.insert'  );
        });
    });
}