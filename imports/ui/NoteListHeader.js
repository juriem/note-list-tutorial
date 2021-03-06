import React from 'react';
import { Meteor } from "meteor/meteor";
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

export const NoteListHeader = (props) => {
    return (
        <div className="item-list_header">
            <button className="button"
                onClick={() => {
                    props.meteorCall('notes.insert', (err, res) => {
                        if (!err) {
                            props.Session.set('selectedNoteId', res);
                        }
                    });
                }}>
                Create Note
            </button>
        </div>
    )
};

NoteListHeader.propTypes = {
    meteorCall: React.PropTypes.func.isRequired,
    Session: React.PropTypes.object.isRequired
};

export default createContainer(() => {
    return {
        meteorCall: Meteor.call,
        Session
    }
}, NoteListHeader);