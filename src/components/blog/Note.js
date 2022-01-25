import React, { useEffect, useRef, useState } from 'react';
import EditModal from './EditModal';
import NoteItem from '../common/NoteItem';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notesMiddleware, alertMiddleware } from '../../state/index';

const Note = (props) => {
    const dispatch = useDispatch();
    const { fetchUserNotes } = bindActionCreators(notesMiddleware, dispatch)
    const { showAlert } = bindActionCreators(alertMiddleware, dispatch)
    const notes = useSelector(state => state.notes)
    let history = useHistory();
    const [currentNote, setCurrentNote] = useState({
        id: '',
        etitle: '',
        edescription: '',
        etag: 'default',
        estatus: ''
    })
    const ref = useRef(null)
    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchUserNotes();
        } else {
            showAlert("Please Login to Continue", "warning");
            history.push("/auth/login");
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (note) => {
        ref.current.click();
        setCurrentNote({ id: note._id, etitle: note.title, edescription: note.description, etag: note.tag, estatus: note.status });
    }
    return (
        <div className="blogs">
            <EditModal openModal={ref} currentNote={currentNote} setCurrentNote={setCurrentNote} />
            {notes.map((note) => (
                <NoteItem key={note._id} updateNote={updateNote} note={note} />
            ))}
        </div>
    )
}

export default Note;
