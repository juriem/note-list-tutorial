import React from 'react';
import { Session } from "meteor/session";
import { createContainer } from 'meteor/react-meteor-data';

import moment from 'moment';

export const NoteListItem = (props) => {
    return (
        <div onClick={() => {
            props.Session.set('selectedNoteId', props.note._id);
        }}>
            <h5>{props.note.title || 'Untitled note'}</h5>
            { props.note.selected ? 'selected' : undefined }
            <p>{moment(props.note.updatedAt).format(props.dateFormat)}</p>
        </div>
    )
};

NoteListItem.propTypes = {
    dateFormat: React.PropTypes.string,
    note: React.PropTypes.object.isRequired,
    Session: React.PropTypes.object.isRequired
};

NoteListItem.defaultProps = {
    dateFormat: 'M/DD/YY HH:mm:ss'
};

export default createContainer(() => {
    return { Session };
}, NoteListItem);