import { Meteor } from 'meteor/meteor';
import expect from 'expect';
import { Notes } from './notes';

if( Meteor.isServer ) {
    describe('notes', function () {

        const userId = 'testUserId';
        const userNoteId = 'testNoteId1';
        const anotherUserId = 'testUserId2';
        const anotherUserNoteId = 'testNoteId2';
        const userNote = {
            _id: userNoteId,
            title: 'Test Note 1',
            body: 'My body for note',
            userId,
            updatedAt: 0
        };
        const anotherUserNote = {
            _id: anotherUserNoteId,
            title: 'Test Note 2',
            body: 'Body for test note 2',
            userId: anotherUserId,
            updatedAt: 0
        };

        beforeEach(function(){
            Notes.remove({});
            Notes.insert(userNote);
            Notes.insert(anotherUserNote)
        });

        describe('insert', function(){

            const insertNote = (userId) => {
                if (!userId) {
                    return Meteor.server.method_handlers['notes.insert']();
                }
                return Meteor.server.method_handlers['notes.insert'].apply({userId})
            };

            it('should insert new note', function () {
                const _id = insertNote(userId);
                expect(Notes.findOne({_id, userId})).toExist();
            });

            it('should not insert new note if not authenticated', function() {
                expect(() => {
                    insertNote();
                }).toThrow(/not-authenticated/);
            });
        });

        describe('remove', function(){

            const removeNote = (userId, _id) => {
                if (!userId) {
                    return Meteor.server.method_handlers['notes.remove'](_id);
                }
                return Meteor.server.method_handlers['notes.remove'].apply({userId}, [_id]);
            };

            it ('should not delete note if not authenticated', function(){
                expect(() => {
                    removeNote(null, userNoteId);
                }).toThrow();
            });

            it('should validate invalid id when delete note', function(){
                expect(()=> {
                    removeNote( userId, '');
                }).toThrow();
            });

            it('should delete note', function(){
                removeNote(userId, userNoteId);
                expect(Notes.findOne({_id: userNoteId})).toNotExist();
            });

            it('should not delete note created by another user', function(){
                removeNote(userId, anotherUserNoteId);
                const note = Notes.findOne({_id: anotherUserNoteId});
                expect(note).toExist();
            });
        });

        describe('update', function(){

            const updateNote = (userId, _id, data) => {
                const methodHandler = Meteor.server.method_handlers['notes.update'];
                if (userId) {
                    methodHandler.apply({userId}, [_id, data]);
                } else {
                    methodHandler(_id, data);
                }
            };

            const noteUpdate = {
                title: 'Updated Title',
                body: 'Updated body',
            };

            it('should not allow to update if user not authenticated', function(){
                expect(() => {
                    updateNote(null, userNoteId, noteUpdate);
                }).toThrow(/not authenticated/);
            });

            it('should not allow to update with invalid _id', function(){
                expect(() => {
                    updateNote(userNoteId, '', {});
                }).toThrow();
            });

            it('should not allow to update with invalid data for update', function(){
                expect(() => {
                    updateNote(userId, userNoteId, {title: 'Title', body: 'Body', someNotAllowedKey: 'key'})
                }).toThrow(/someNotAllowedKey is not allowed by the schema/);
            });

            it('should update existed note', function(){
                updateNote(userId, userNoteId, noteUpdate);
                const note = Notes.findOne({_id: userNoteId, userId: userId});
                expect(note.updatedAt).toBeGreaterThan(userNote.updatedAt);
                expect(note).toInclude(noteUpdate);
            });

            it('should not update note belongs to another user', function(){
                updateNote(userId, anotherUserNoteId, noteUpdate);
                const note = Notes.findOne({_id: anotherUserNoteId});
                expect(note).toInclude(anotherUserNote);
            });
        });

        describe('publish/subscribe', function () {

            it('should return users notes', function(){
                const result = Meteor.server.publish_handlers.notes.apply({userId});
                const notes = result.fetch();
                expect(notes.length).toBe(1);
                expect(notes[0]).toInclude(userNote);
            });

            it('should return zero notes for user that has no notes', function(){
                const notes = Meteor.server.publish_handlers.notes.apply({userId: 'some_user'}).fetch();
                expect(notes.length).toBe(0);
            });

        });

    });
}