import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
  const host = 'http://localhost:3300';
    const [notes, setNotes] = useState([]);
    //* Fetch all Notes
    const fetchNotes = async ()=>{
      // TODO: API Calls
      const url = `${host}/api/notes/all`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      const json = await response.json(); 
      setNotes(json);  
    }


    //* Add a Note
    const addNote = async (title, description, tag)=>{
      //* API Calls
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
        setNotes(notes.concat(json)); //push updates whereas concat returns a new array
      }
    }

    //* Delete a Note
    const deleteNote = async (id)=>{
      //* API Calls to delete a Note
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
      setNotes(notes.filter((note)=>(note._id!==id)));
    }

    //* Edit a Note
    const editNote = async (id,title, description, tag)=>{
      //* API Calls to fetch the note to be updated
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

      let newNotes = JSON.parse(JSON.stringify(notes)); //must create a deep copy
      //* Edit the note
      newNotes.forEach(note => {
        if(note._id===id){
          note.title = title;
          note.description = description;
          note.tag = tag;
        }
      });
      setNotes(newNotes);
    }


    return(
        <NoteContext.Provider value={{notes, fetchNotes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;