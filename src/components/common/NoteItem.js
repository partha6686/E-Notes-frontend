import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notesMiddleware, alertMiddleware } from '../../state/index';
import { HiShare, HiDotsVertical } from "react-icons/hi";
import { AiOutlineFire, AiFillFire, AiOutlineComment, AiOutlineDelete } from "react-icons/ai"
import { BiEditAlt, BiBookmark } from "react-icons/bi"

const NoteItem = (props) => {
    const user = useSelector((state) => state.user);
    const host = 'http://localhost:3300';
    let location = useLocation();
    const dispatch = useDispatch();
    const { deleteNote, likeBlog, unlikeBlog } = bindActionCreators(notesMiddleware, dispatch)
    const { showAlert } = bindActionCreators(alertMiddleware, dispatch)
    const { note, updateNote } = props;
    const handleDelete = (id) => {
        deleteNote(id);
        showAlert("Deleted Note Successfully", "success");
        handleShow();
    }
    const [show, setShow] = useState(false);
    const [like, setLike] = useState(false);
    const [author, setAuthor] = useState();
    const handleShow = () => {
        setShow(!show);
    }
    const likeStatus = () => {
        const newData = note.likes.map((id) => {
            if (id == user._id) {
                setLike(true);
            }
        })
    }
    const handleLike = async () => {
        if (!like) {
            await likeBlog(note._id);
            setLike(true);
        } else {
            await unlikeBlog(note._id);
            setLike(false);
        }
    }
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
        return () => {
            setAuthor({});
        };
        // eslint-disable-next-line
    }, [note])
    useEffect(() => {
        likeStatus();
        // eslint-disable-next-line
    }, [user]);
    return (
        <div className="b_card" >
            <div className='b_card_head'>
                <div>
                    <img src={author && host + '/' + author.profileImg} alt="profile" />
                    <h5>{author && author.name}</h5>
                </div>
                {location.pathname === '/profile' && <>
                    <HiDotsVertical size='26px' className={show ? 'menu_icon active' : 'menu_icon'} onClick={handleShow} />
                    <div className={show ? 'dropdown_div show' : 'dropdown_div'}>
                        <li onClick={() => { updateNote(note); handleShow() }}><BiEditAlt size='22px' className='icon' />Edit Blog</li>
                        <li><BiBookmark size='22px' className='icon' />Save Blog</li>
                        <hr />
                        <li onClick={() => { handleDelete(note._id) }}><AiOutlineDelete size='22px' className='icon' />Delete Blog</li>
                    </div>
                </>}
            </div>
            <hr />
            <div className="b_card_body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
            </div>
            <hr />
            <div className='b_card_footer'>
                <div onClick={handleLike}>
                    {like ? <AiFillFire className='icon' size="25px" /> : <AiOutlineFire className='icon' size="25px" />}
                    <span>{note.likes.length}</span>
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
