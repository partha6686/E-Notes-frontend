import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const {deleteNote} = useContext(noteContext);
    const {note, updateNote} = props;
    const handleDelete = (id) => {
        deleteNote(id);
    }
    return (
        <div className="col-md-3">
            <div className="card my-2" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fas fa-trash mx-2" style={{color: "#E00232"}} onClick={()=>{handleDelete(note._id)}}></i>
                    <i className="far fa-edit mx-2" style={{color: "blue"}} onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
