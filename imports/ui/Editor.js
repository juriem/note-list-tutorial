import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Notes } from '../api/notes';
import { Meteor } from 'meteor/meteor';

export class Editor extends React.Component {

    handleTitleChange(e) {
        const title = e.target.value;
        this.props.meteorCall('notes.update', this.props.note._id, {title});
    }

    handleBodyChange(e) {
        const body = e.target.value;
        this.props.meteorCall('notes.update', this.props.note._id, {body});
    }

    handleRemoveNote() {
        this.props.meteorCall('notes.remove', this.props.note._id);
    }

    render() {

        if( this.props.note ) {
            return (
                <div>
                    <input
                        type="text"
                        value={this.props.note.title}
                        placeholder="Your note"
                        onChange={this.handleTitleChange.bind(this)}
                    />
                    <textarea
                        value={this.props.note.body}
                        placeholder="Your note here"
                        onChange={this.handleBodyChange.bind(this)}
                    ></textarea>
                    <button onClick={this.handleRemoveNote.bind(this)}>Delete Note</button>
                </div>
            )
        } else {
            return (
                <p>{this.props.selectedNoteId ? 'Note not found' : 'Pick or create note to get started'}</p>
            )
        }
    }
}

Editor.propTypes = {
    note: React.PropTypes.object,
    selectedNoteId: React.PropTypes.string,
    meteorCall: React.PropTypes.func.isRequired
};

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');

    return {
        selectedNoteId,
        note: Notes.findOne({ _id: selectedNoteId }),
        meteorCall: Meteor.call
    }

}, Editor);