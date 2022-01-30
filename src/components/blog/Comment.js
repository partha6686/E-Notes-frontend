import React, { useState, useEffect } from 'react';

const Comment = (props) => {
    const host = 'http://localhost:3300';
    const { cmt } = props;
    const [author, setAuthor] = useState();
    const getAuthor = async () => {
        const url = `${host}/api/profile/${cmt.user}`;
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
    }, [cmt]);

    return <div className=''>
        <img src={author && host + '/' + author.profileImg} alt='profile' />
        <p><b>{author && author.name}</b> {cmt.comment}</p>
    </div>;
};

export default Comment;
