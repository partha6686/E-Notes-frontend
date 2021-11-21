import React, {useContext, useState, useEffect} from 'react';
import noteContext from '../context/notes/noteContext';
import { Link } from 'react-router-dom';
import {useHistory} from 'react-router-dom';

const AddNote = (props) => {
    const {addNote} = useContext(noteContext);
    const [newNote, setNewNote] = useState({
        title:"",
        description: "",
        tag: ""
    });
    let history = useHistory();
    useEffect(() => {
        if(!localStorage.getItem('token')){
            props.showAlert("Please Login to Continue","warning");
            history.push("/login");
        }
        // eslint-disable-next-line
    }, [])
    const handleSubmit = (e) => {
        addNote(newNote.title,newNote.description,newNote.tag===''?'default':newNote.tag);
        props.showAlert("Added Note Successfully","success");
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
                    <input type="text" className="form-control" onChange={handleChange} id="title" name="title" value={newNote.title} aria-describedby="Title"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" onChange={handleChange} id="description" name="description" value={newNote.description} aria-describedby="description"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={handleChange} id="tag" name="tag" value={newNote.tag} aria-describedby="tag"/>
                </div>
                <Link to="/" type="submit" className={newNote.title.length<3 || newNote.description.length<5 ? "btn btn-primary disabled": "btn btn-primary " } onClick={handleSubmit}>Add Note</Link>
            </form>
        </div>
    )
}

export default AddNote
