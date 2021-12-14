import {setNotes, addNote, removeNote, updateNote} from '../index';

//* FETCH ALL NOTES
export const fetchNotes = () => {
    const host = 'http://localhost:3300';
    return (async (dispatch)=>{
        const url = `${host}/api/notes/all`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json(); 
        dispatch(setNotes(json)); 
    })
}

//* ADD A NOTE
export const addNewNote = (title, description, tag)=>{
    const host = 'http://localhost:3300';
    //* API Calls
    return (async (dispatch)=>{
        const url = `${host}/api/notes/addnote`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag}) 
        });
        // eslint-disable-next-line
        const json = await response.json();
        if(json.status===200){
            dispatch(addNote(json));//push updates whereas concat returns a new array
        }
        return json;
    })
}

//* DELETE A NOTE
export const deleteNote = async (id)=>{
    const host = 'http://localhost:3300';
    //* API Calls to delete a Note
    return (async (dispatch)=>{
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
export const editNote = async (id,title, description, tag)=>{
    const host = 'http://localhost:3300';
    //* API Calls to fetch the note to be updated
    return (async (dispatch)=>{
        const url = `${host}/api/notes/updatenote/${id}`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        // eslint-disable-next-line
        const json = await response.json(); 
        dispatch(updateNote(json));
        return json;
    })
    
}