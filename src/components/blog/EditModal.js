import React, { useRef} from 'react';
// import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notesMiddleware, alertMiddleware } from '../../state/index';

const EditModal = (props) => {
    const {openModal, currentNote, setCurrentNote} = props;
    // const history =useHistory();
    const dispatch = useDispatch();
    const {editNote} = bindActionCreators(notesMiddleware,dispatch)
    const {showAlert} = bindActionCreators(alertMiddleware,dispatch)
    const closeModal = useRef();
    const handleSubmit = async (e) => {
        await editNote(currentNote.id,currentNote.etitle,currentNote.edescription,currentNote.etag, currentNote.estatus);
        closeModal.current.click();
        showAlert("Updated Note Successfully","success");
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
                            <div className="mb-3">
                                <label htmlFor="estatus" className="form-label">Status</label>
                                <input type="text" className="form-control" onChange={handleChange} id="estatus" name="estatus" value={currentNote.estatus} aria-describedby="status"/>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button ref={closeModal} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button className={currentNote.etitle.length<3 || currentNote.edescription.length<5 ? "btn btn-primary disabled": "btn btn-primary " } onClick={handleSubmit}>Update Note</button>
                    </div>
                    </div>
                </div>`
            </div>
        </div>
    )
}

export default EditModal
