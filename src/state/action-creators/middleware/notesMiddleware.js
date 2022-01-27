import { setNotes, addNote, removeNote, updateNote, likeNote, setUserNotes } from '../index';
const host = 'http://localhost:3300';

//* FETCH NOTES OF A SPECIFIC USER
export const fetchUserNotes = () => {
    const host = 'http://localhost:3300';
    return (async (dispatch) => {
        const url = `${host}/api/notes/user`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        dispatch(setUserNotes(json));
    })
}

//* FETCH ALL PUBLIC NOTES
export const fetchNotes = () => {
    const host = 'http://localhost:3300';
    return (async (dispatch) => {
        const url = `${host}/api/notes/`;
        const response = await fetch(url, {
            method: 'GET',
        });
        const json = await response.json();
        dispatch(setNotes(json));
    })
}

//* ADD A NOTE
export const addNewNote = (title, description, tag, status) => {
    const host = 'http://localhost:3300';
    //* API Calls
    return (async (dispatch) => {
        const url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag, status })
        });
        // eslint-disable-next-line
        const json = await response.json();
        if (json.status === 200) {
            dispatch(addNote(json));//push updates whereas concat returns a new array
        }
        return json;
    })
}

//* DELETE A NOTE
export const deleteNote = (id) => {
    const host = 'http://localhost:3300';
    //* API Calls to delete a Note
    return (async (dispatch) => {
        const url = `${host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        // eslint-disable-next-line
        const json = await response.json();
        dispatch(removeNote(id));
    })
}

//* EDIT A NOTE
export const editNote = (id, title, description, tag, status) => {
    const host = 'http://localhost:3300';
    //* API Calls to fetch the note to be updated
    return (async (dispatch) => {
        const url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag, status })
        });
        // eslint-disable-next-line
        const json = await response.json();
        dispatch(updateNote(json.note));
        return json;
    })
}

/***************************************** LIKE A POST ***********************************************/
export const likeBlog = (id) => {
    return (async (dispatch) => {
        const url = `${host}/api/notes/like/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        dispatch(likeNote(json.note));
    });
}

/***************************************** UNLIKE A POST ***********************************************/
export const unlikeBlog = (id) => {
    return (async (dispatch) => {
        const url = `${host}/api/notes/unlike/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        dispatch(likeNote(json.note));
    });
}