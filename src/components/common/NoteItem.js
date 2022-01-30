import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { notesMiddleware, alertMiddleware } from '../../state/index';
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlineFire, AiFillFire, AiOutlineComment, AiOutlineDelete } from "react-icons/ai"
import { BiEditAlt, BiBookmark } from "react-icons/bi"
import { RiBookmarkLine, RiBookmarkFill } from "react-icons/ri";
import Comment from '../blog/Comment';

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
    const [showCmt, setShowCmt] = useState(false);
    const [comments, setComments] = useState([]);
    const [myCmt, setMyCmt] = useState("");
    const [like, setLike] = useState(false);
    const [author, setAuthor] = useState();
    const handleShow = () => {
        setShow(!show);
    }
    const likeStatus = () => {
        const newData = note.likes.map((id) => {
            if (id === user._id) {
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
    const viewCmt = async () => {
        if (!showCmt) {
            const url = `${host}/api/notes/comment/${note._id}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json();
            // console.log(json);
            setComments(json);
        }
        setShowCmt(!showCmt);

    }
    const addCmt = async (e) => {
        e.preventDefault();
        const url = `${host}/api/notes/comment/${note._id}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                comment: myCmt
            })
        });
        const json = await response.json();
        setComments(comments.concat(json));
        setMyCmt("");
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
            <div className="b_card_body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.description}</p>
                <span>{note.likes.length} likes</span>
            </div>
            {user._id && <>
                <div className='b_card_footer'>
                    <div onClick={handleLike}>
                        {like ? <AiFillFire className='icon liked' size="25px" /> : <AiOutlineFire className='icon' size="25px" />}
                    </div>
                    <div onClick={viewCmt}>
                        <AiOutlineComment className='icon' size="25px" />
                    </div>
                    <div>
                        <RiBookmarkLine className='icon' size="22px" />
                    </div>
                    {/*<i className="fas fa-trash mx-2" style={{ color: "#E00232" }} onClick={() => { handleDelete(note._id) }}></i>
                <i className="far fa-edit mx-2" style={{ color: "blue" }} onClick={() => { updateNote(note) }}></i>*/}
                </div>
            </>}
            {showCmt &&
                <div className='b_card_comment'>
                    {comments.length > 0 && <div className='b_card_allcomments'>
                        {comments.map((cmt) =>
                            <Comment key={cmt._id} cmt={cmt} />
                        )}
                    </div>}
                    <form onSubmit={(e) => addCmt(e)}>
                        <img src={author && host + '/' + user.profileImg} alt="profile" />
                        <input type='text' placeholder="Add a Comment..." onChange={(e) => setMyCmt(e.target.value)} value={myCmt} />
                        <button className='button-fill' type='submit'>Post</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default NoteItem
