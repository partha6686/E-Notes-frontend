import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notesMiddleware, alertMiddleware } from '../../state/index';
import { HiShare, HiDotsVertical } from "react-icons/hi";
import { AiOutlineFire, AiOutlineComment } from "react-icons/ai"

const NoteItem = (props) => {
    const host = 'http://localhost:3300';
    const dispatch = useDispatch();
    const { deleteNote } = bindActionCreators(notesMiddleware, dispatch)
    const { showAlert } = bindActionCreators(alertMiddleware, dispatch)
    const { note, updateNote } = props;
    const handleDelete = (id) => {
        deleteNote(id);
        showAlert("Deleted Note Successfully", "success");
    }
    const [author, setAuthor] = useState();
    const getAuthor = async () => {
        const url = `${host}/api/profile/${note.user}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        setAuthor(json);
    }
    useEffect(() => {
        getAuthor();
    }, [note])
    return (
        <div className="b_card" >
            <div className='b_card_head'>
                <div>
                    <img src={author && host + '/' + author.profileImg} alt="profile" />
                    <h5>{author && author.name}</h5>
                </div>
                <HiDotsVertical />
            </div>
            <hr />
            <div className="b_card_body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
            </div>
            <hr />
            <div className='b_card_footer'>
                <div>
                    <AiOutlineFire className='icon' size="25px" />
                </div>
                <div>
                    <AiOutlineComment className='icon' size="25px" />
                </div>
                <div>
                    <HiShare className='icon' size="25px" />
                </div>
                {/*<i className="fas fa-trash mx-2" style={{ color: "#E00232" }} onClick={() => { handleDelete(note._id) }}></i>
                <i className="far fa-edit mx-2" style={{ color: "blue" }} onClick={() => { updateNote(note) }}></i>*/}
            </div>
        </div>
    )
}

export default NoteItem
