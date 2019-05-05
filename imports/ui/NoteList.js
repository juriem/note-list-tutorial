import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { Notes } from '../api/notes';

import NoteListHeader from './NoteListHeader';
import NoteListItem from "./NoteListItem";
import NoteListEmptyItem from './NoteListEmptyItem';
export const NoteList = (props) => {

    const renderNotes = () => {
        if (props.notes.length === 0) {
            return <NoteListEmptyItem />
        }

        return props.notes.map(note => <NoteListItem key={note._id} note={note}/>)
    };

    return (
        <div className="item-list">
            <NoteListHeader/>
            {renderNotes()}
        </div>
    )
};

NoteList.propTypes = {
    notes: React.PropTypes.array.isRequired
};

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    Meteor.subscribe('notes');
    return {
        notes: Notes.find({}, {sort: {updatedAt: -1}}).fetch().map(note => {
            return {
                ...note,
                selected: note._id === selectedNoteId
            }
        })
    }
}, NoteList);