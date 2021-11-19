import React, {useContext, useEffect, useRef, useState} from 'react';
import noteContext from '../context/notes/noteContext';
import EditModal from './EditModal';
import NoteItem from './NoteItem';

const Note = () => {
    const {notes, fetchNotes} = useContext(noteContext);
    const [currentNote, setCurrentNote] = useState({
        id: '',
        etitle: '',
        edescription: '',
        etag: 'default'
    })
    const ref = useRef(null)
    useEffect(() => {
        fetchNotes();
        // eslint-disable-next-line
    }, [])
    const updateNote = (note)=>{
        ref.current.click();
        setCurrentNote({id:note._id, etitle: note.title, edescription: note.description, etag: note.tag});
    }
    return (
        <div className="row my-3">
            <h2>Your Notes</h2>
            <EditModal openModal={ref} currentNote={currentNote} setCurrentNote={setCurrentNote} />
            {notes.map((note)=>(
                <NoteItem key={note._id} updateNote={updateNote} note={note} />
            ))}
        </div>
    )
}

export default Note;
