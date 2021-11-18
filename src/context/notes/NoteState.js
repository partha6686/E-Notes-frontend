import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props)=>{
    const [state, setstate] = useState({
        name: "Partha",
        sem: "3rd"
    });
    const update = ()=>{
        setTimeout(() => {
            setstate({
                name:"Paras",
                sem: "7th"
            })
        }, 5000);
    }
    return(
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;