import React, { useEffect, useRef, useState } from 'react';
import NoteItem from '../common/NoteItem';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notesMiddleware } from '../../state/index';

const Feed = (props) => {
    const dispatch = useDispatch();
    const { fetchNotes } = bindActionCreators(notesMiddleware, dispatch)
    const notes = useSelector(state => state.notes)
    let history = useHistory();
    const ref = useRef(null)
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
