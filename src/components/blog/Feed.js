import React, { useEffect } from 'react';
import NoteItem from '../common/NoteItem';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notesMiddleware } from '../../state/index';

const Feed = (props) => {
    const dispatch = useDispatch();
    const { fetchNotes } = bindActionCreators(notesMiddleware, dispatch)
    const notes = useSelector(state => state.notes)
    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line
    }, [])
    return (
        <div className="blogs">
            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}
        </div>
    )
}

export default Feed;
