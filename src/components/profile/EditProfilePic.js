import React, { useState } from 'react'
import { Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userMiddleware, alertMiddleware } from '../../state/index';

const EditProfilePic = (props) => {
    const dispatch = useDispatch()
    const { show, handleClose} = props;
    
    const [file, setFile] = useState();
    
    const {updateProfilePic} = bindActionCreators(userMiddleware,dispatch)
    const {showAlert} = bindActionCreators(alertMiddleware,dispatch)

    const handleFileChange = (e)=>{
        setFile(e.target.files[0])
        // data.append(photo,e.target.files[0] );
        // console.log(data);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('profilePicture',file);
        
        await updateProfilePic(data);
        showAlert("Updated Profile Picture Successfully","success");
    }
    return (
        <div  className="modal-box">
            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile Picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Control type='file' name="profilePicture" onChange={handleFileChange} />
                        </Form.Group>
                        <button className="button-fill" type="submit" onClick={handleClose}>
                            Submit
                        </button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default EditProfilePic
