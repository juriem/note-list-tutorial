import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from "meteor/meteor";
import moment from "moment";

import { notes } from "../fixtures/fixtures";
import { NoteListItem } from './NoteListItem';


if( Meteor.isClient ) {


    describe('NoteListItem', function () {
        const dateFormat = 'M/DD/YY HH:mm:ss';
        let Session;

        beforeEach(() => {
            Session = {
                set: expect.createSpy()
            };
        });

        it('should render default title', function () {
            const title = '';
            const updatedAt = moment().valueOf();
            const wrapper = mount(<NoteListItem note={{ title, updatedAt }} Session={Session}/>);
            expect(wrapper.find('h5').text()).toBe('Untitled note');
            expect(wrapper.find('p').text()).toBe(moment(updatedAt).format(dateFormat));
        });

        it('should render title and timestamp', function () {
            const title = 'Test title';
            const updatedAt = moment().valueOf();
            const wrapper = mount(<NoteListItem note={{ title, updatedAt }} dateFormat={dateFormat}
                                                Session={Session}/>);
            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe(moment(updatedAt).format(dateFormat));
        });

        it('should call set on click', function () {
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);
            wrapper.find('div').simulate('click');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
        })
    });
}
