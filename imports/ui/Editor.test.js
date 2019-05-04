import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';


import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if( Meteor.isClient ) {
    describe('Editor', function () {
        let browserHistory;
        let call;

        beforeEach(function () {
            call = expect.createSpy();
            browserHistory = {
                push: expect.createSpy()
            }
        });

        it('should display valid message if no note selected', function () {
            const wrapper = mount(<Editor meteorCall={call} browserHistory={browserHistory}/>);

            expect(wrapper.find('p').text()).toBe('Pick or create note to get started');
        });

        it('should display valid message if note not found', function () {
            const wrapper = mount(<Editor meteorCall={call} browserHistory={browserHistory}
                                          selectedNoteId="some_non_existsed_note"/>);
            expect(wrapper.find('p').text()).toBe('Note not found');
        });

        it('should remove note', function () {
            const wrapper = mount(< Editor meteorCall={call} browserHistory={browserHistory} note={notes[0]}/>);
            wrapper.find('button').simulate('click');
            expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
            expect(browserHistory.push).toHaveBeenCalledWith('/dashboard');
        });


        it('should update the note body and title on change', function () {
            const newBody = 'This is my new body text';
            const wrapper = mount(<Editor browserHistory={browserHistory} meteorCall={call}
                                          selectedNoteId={notes[0]._id} note={notes[0]}/>);

            wrapper.find('textarea').simulate('change', {
                target: {
                    value: newBody
                }
            });

            expect(wrapper.state('body')).toBe(newBody);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });

            const newTile = 'My New Title';
            wrapper.find('input').simulate('change', {
                    target: {
                        value: newTile
                    }
                }
            );
            expect(wrapper.state('title')).toBe(newTile);
            expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTile });
        });

        it('should set state for new note', function () {
            const wrapper = mount(<Editor browserHistory={browserHistory} meteorCall={call}/>);
            wrapper.setProps({
                selectedNoteId: notes[0]._id,
                note: notes[0]
            });

            expect(wrapper.state('title')).toBe(notes[0].title);
            expect(wrapper.state('body')).toBe(notes[0].body);
        });

        it('should not set state if note prop not provided', function () {
            const wrapper = mount(<Editor browserHistory={browserHistory} meteorCall={call}/>);
            wrapper.setProps({
                selectedNoteId: notes[0]._id
            });

            expect(wrapper.state('title')).toBe('');
            expect(wrapper.state('body')).toBe('');
        })

    });
}