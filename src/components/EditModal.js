import React, { useContext, useRef} from 'react';
import noteContext from '../context/notes/noteContext';
import { Link } from 'react-router-dom';

const EditModal = (props) => {
    const {openModal, currentNote, setCurrentNote} = props;
    const {editNote} = useContext(noteContext);
    const closeModal = useRef(null);
    const handleSubmit = (e) => {
        console.log(currentNote);
        editNote(currentNote.id,currentNote.etitle,currentNote.edescription,currentNote.etag);
        closeModal.current.click();
    }
    const handleChange = (e) => {
        setCurrentNote({...currentNote, [e.target.name]: e.target.value });
    }
    return (
        <div>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={openModal} hidden={true}>
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className="my-3">
                            <div className="mb-3">
                                <label htmlFor="etitle" className="form-label">Title</label>
                                <input type="text" className="form-control"  id="etitle" name="etitle" aria-describedby="edit title" onChange={handleChange} value={currentNote.etitle}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">Description</label>
                                <input type="text" className="form-control"  id="edescription" name="edescription" aria-describedby="edit description" onChange={handleChange} value={currentNote.edescription}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="etag" className="form-label">Tag</label>
                                <input type="text" className="form-control"  id="etag" name="etag" aria-describedby="tag" onChange={handleChange} value={currentNote.etag}/>
                            </div>
                            
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={closeModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <Link to="/" type="submit" className="btn btn-primary" onClick={handleSubmit}>Update Note</Link>
                    </div>
                    </div>
                </div>`
            </div>
        </div>
    )
}

export default EditModal
