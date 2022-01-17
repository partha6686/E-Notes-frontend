import React, { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notesMiddleware, alertMiddleware } from '../../state/index';
import {useHistory} from 'react-router-dom';


const AddNote = () => {
    const dispatch = useDispatch();
    const {addNewNote} = bindActionCreators(notesMiddleware,dispatch)
    const {showAlert} = bindActionCreators(alertMiddleware,dispatch)
    const [newNote, setNewNote] = useState({
        title:"",
        description: "",
        tag: "",
        status: ""
    });
    let history = useHistory();
    useEffect(() => {
        if(!localStorage.getItem('token')){
            showAlert("Please Login to Continue","warning");
            history.push("/auth/login");
        }
        // eslint-disable-next-line
    }, [])
    const handleSubmit = async (e) => {
        const json = await addNewNote(newNote.title,newNote.description,newNote.tag===''?'default':newNote.tag, newNote.status);
        if(!json.errors){
            showAlert("Added Note Successfully","success");
            history.push("/");
        }else{
            showAlert(json.errors.msg?json.errors.msg:json.errors,"danger");
        }
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
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <input type="text" className="form-control" onChange={handleChange} id="status" name="status" value={newNote.status} aria-describedby="status"/>
                </div>
            </form>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add Note</button>
        </div>
    )
}

export default AddNote
