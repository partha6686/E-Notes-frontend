import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const [notes, setNotes] = useState([
        {
          "_id": "6196765edc71a008be6756bf",
          "user": "619675e8dc71a008be6756bc",
          "title": "I am Mike",
          "description": "Mike - from Staranger Things",
          "tag": "School",
          "date": "2021-11-18T15:50:54.014Z",
          "__v": 0
        },
        {
          "_id": "61967673dc71a008be6756c1",
          "user": "619675e8dc71a008be6756bc",
          "title": "I am Ell",
          "description": "Ell - from Staranger Things",
          "tag": "School",
          "date": "2021-11-18T15:51:15.538Z",
          "__v": 0
        },
        {
          "_id": "61967685dc71a008be6756c3",
          "user": "619675e8dc71a008be6756bc",
          "title": "I am Will",
          "description": "Will - from Staranger Things",
          "tag": "School",
          "date": "2021-11-18T15:51:33.323Z",
          "__v": 0
        },
        {
          "_id": "61967693dc71a008be6756c5",
          "user": "619675e8dc71a008be6756bc",
          "title": "I am Mad Max",
          "description": "Mad Max - from Staranger Things",
          "tag": "School",
          "date": "2021-11-18T15:51:47.267Z",
          "__v": 0
        },
        {
          "_id": "619676a5dc71a008be6756c7",
          "user": "619675e8dc71a008be6756bc",
          "title": "I am Nancy",
          "description": "Nancy - from Staranger Things",
          "tag": "School",
          "date": "2021-11-18T15:52:05.732Z",
          "__v": 0
        },
        {
          "_id": "619676b5dc71a008be6756c9",
          "user": "619675e8dc71a008be6756bc",
          "title": "I am Jonathon",
          "description": "Jonathon - from Staranger Things",
          "tag": "School",
          "date": "2021-11-18T15:52:21.170Z",
          "__v": 0
        }
    ])

    //* Add a Note
    const addNote = (title, description, tag)=>{
        // TODO: API Calls
        const note = {
            "_id": "619676b5dc7156a008be0750c9",
            "user": "619675e8dc7434351a008be6756bc",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2021-11-18T15:52:21.170Z",
            "__v": 0
        };
        setNotes(notes.concat(note)); //push updates whereas concat returns a new array 
    }

    //* Delete a Note
    const deleteNote = (id)=>{
      // TODO: API Calls
      setNotes(notes.filter((note)=>(note._id!==id)));
    }

    //* Edit a Note
    const editNote = ()=>{
        
    }


    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;