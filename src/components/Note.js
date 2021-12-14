import React, {useEffect, useRef, useState} from 'react';
import EditModal from './EditModal';
import NoteItem from './NoteItem';
import {useHistory} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notesMiddleware } from '../state/index';

const Note = (props) => {
    const dispatch = useDispatch();
    const {fetchNotes} = bindActionCreators(notesMiddleware,dispatch)
    const notes = useSelector(state => state.notes)
    let history = useHistory();
    const [currentNote, setCurrentNote] = useState({
        id: '',
        etitle: '',
        edescription: '',
        etag: 'default'
    })
    const ref = useRef(null)
    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchNotes();
        }else{
            props.showAlert("Please Login to Continue","warning");
            history.push("/login");
        }
        // eslint-disable-next-line
    }, [])
    const updateNote = (note)=>{
        ref.current.click();
        setCurrentNote({id:note._id, etitle: note.title, edescription: note.description, etag: note.tag});   
    }
    return (
        <div className="row my-3">
            <h2>Your Notes</h2>
            <EditModal openModal={ref} currentNote={currentNote} setCurrentNote={setCurrentNote}  showAlert={props.showAlert}/>
            {notes.map((note)=>(
                <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
            ))}
        </div>
    )
}

export default Note;
