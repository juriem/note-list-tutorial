import React from 'react';
import moment from 'moment';

const NoteListItem = (props) => {
    return (
        <div>
            <h5>{props.note.title || 'Untitled note'}</h5>
            <p>{moment(props.note.updatedAt).format(props.dateFormat)}</p>
        </div>
    )
};



NoteListItem.propTypes = {
    dateFormat: React.PropTypes.string,
    note: React.PropTypes.object.isRequired
};

NoteListItem.defaultProps = {
    dateFormat: 'M/DD/YY HH:mm:ss'
};

export default NoteListItem;