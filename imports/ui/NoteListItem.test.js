import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import NoteListItem from './NoteListItem';
import { Meteor } from "meteor/meteor";
import moment from "moment";


if( Meteor.isClient ) {
    describe('NoteListItem', function () {

        const dateFormat = 'M/DD/YY HH:mm:ss';

        it('should render default title', function () {
            const title = '';
            const updatedAt = moment().valueOf();
            const wrapper = mount(<NoteListItem note={{title, updatedAt}} />);
            expect(wrapper.find('h5').text()).toBe('Untitled note');
            expect(wrapper.find('p').text()).toBe(moment(updatedAt).format(dateFormat));
        });

        it('should render title and timestamp', function () {
            const title = 'Test title';
            const updatedAt = moment().valueOf();
            const wrapper = mount(<NoteListItem note={{title, updatedAt}} dateFormat={dateFormat} />);
            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe(moment(updatedAt).format(dateFormat));
        });
    });
}