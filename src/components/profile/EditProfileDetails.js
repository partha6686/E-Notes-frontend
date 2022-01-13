import React from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userMiddleware, alertMiddleware } from '../../state/index';

const EditProfileDetails = (props) => {
  const { show, handleClose, user, setUser } = props;
  const dispatch = useDispatch()
  const {editUserDetails} = bindActionCreators(userMiddleware,dispatch)
  const {showAlert} = bindActionCreators(alertMiddleware,dispatch)
  
  const handleChange=(e)=>{
    setUser({...user, [e.target.name]: e.target.value});
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log(user);
    await editUserDetails(user);
    showAlert("Updated Profile Successfully","success");
  }
  return (
    <div className="modal-box">
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" name="bio" value={user.bio} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" value={user.city} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>DOB</Form.Label>
              <Form.Control type="date" name="dob" value={user.dob} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" onChange={handleChange} defaultValue={user.gender ? user.gender : "default"}>
                <option disabled value="default" >Select Here..</option>
                <option value="M" >Male</option>
                <option value="F" >Female</option>
                <option value="NA" >Prefer not to say</option>
              </Form.Select>
            </Form.Group>
            <button className="button-fill" type="submit" onClick={handleClose}>
              Submit
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditProfileDetails;
