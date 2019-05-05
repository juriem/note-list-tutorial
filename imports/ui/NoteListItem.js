import React from 'react';
import { Session } from "meteor/session";
import { createContainer } from 'meteor/react-meteor-data';

import moment from 'moment';

export const NoteListItem = (props) => {

    const className = props.note.selected ? 'item item--selected' : 'item';

    return (
        <div className={className}
             onClick={() => {
            props.Session.set('selectedNoteId', props.note._id);
        }}>
            <h5 className="item__title">{props.note.title || 'Untitled note'}</h5>
            <p className="item__subtitle">{moment(props.note.updatedAt).format(props.dateFormat)}</p>
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