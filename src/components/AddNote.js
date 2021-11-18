import React, {useContext, useState} from 'react';
import noteContext from '../context/notes/noteContext';
import { Link } from 'react-router-dom';

const AddNote = () => {
    const {addNote} = useContext(noteContext);
    const [newNote, setNewNote] = useState({
        title:"",
        description: "",
        tag: "default"
    })
    const handleSubmit = (e) => {
        addNote(newNote.title,newNote.description,newNote.tag);
    }
    const handleChange = (e) => {
        setNewNote({...newNote, [e.target.name]: e.target.value });
    }
    return (
        <div className="container my-3">
            <h2>Add Your Notes</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" onChange={handleChange} id="title" name="title" aria-describedby="Title"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={handleChange} id="description" name="description" aria-describedby="description"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={handleChange} id="tag" name="tag" aria-describedby="tag"/>
                </div>
                <Link to="/" type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</Link>
            </form>
        </div>
    )
}

export default AddNote
