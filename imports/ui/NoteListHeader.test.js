import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteListHeader } from "./NoteListHeader";

if( Meteor.isClient ) {




    describe('NoteListHeader', function () {
        let Session;
        let call;
        let wrapper;

        beforeEach(()=>{
            Session = {
                set: expect.createSpy()
            };
            call = expect.createSpy();
            wrapper = mount(<NoteListHeader meteorCall={call} Session={Session}/>);
        });

        it('should render button', function () {
            expect(wrapper.find('button').text()).toBe('Create Note');
        });

        it('should call function with valid argument', function(){
            wrapper.find('button').simulate('click');
            expect(call).toHaveBeenCalled();
            expect(call.calls[0].arguments[0]).toBe('notes.insert');
            const newNoteId = 'newNoteId';
            call.calls[0].arguments[1](null, newNoteId);

            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', newNoteId);
        });

        it('should not set sessions for failed insert', function(){
            wrapper.find('button').simulate('click');
            const error = new Meteor.Error('test-error');
            call.calls[0].arguments[1](error, undefined);
            expect(Session.set).toNotHaveBeenCalled();
        })


    });
}