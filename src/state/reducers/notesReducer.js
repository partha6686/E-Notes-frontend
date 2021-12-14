const reducer = (state=[], action) =>{
    switch (action.type) {
        case 'SET_NOTES':
            return action.payload;
        case 'ADD_NOTE' :
            return state.concat(action.payload);
        case 'REMOVE_NOTE':
            return state.filter((note)=>(note._id!==action.payload))
        case 'UPDATE_NOTE':
            const {id, title, description,tag} = action.payload;
            let newNotes = JSON.parse(JSON.stringify(state)); //must create a deep copy
            newNotes.forEach(note => {
                if(note._id===id){
                    note.title = title;
                    note.description = description;
                    note.tag = tag;
                }
            });
            return newNotes;
        default:
            return state;
    }
    // if(action.type==='SET_NOTES'){
    //     return action.payload;
    // }else if(action.type==='ADD_NOTE'){
    //     return state.concat(action.payload)
    // }else if(action.type==='REMOVE_NOTE'){
    //     return state.filter((note)=>(note._id!==action.payload))
    // }else if(action.type==='UPDATE_NOTE'){
    //     const {id, title, description,tag} = action.payload;
    //     let newNotes = JSON.parse(JSON.stringify(state)); //must create a deep copy
    //     newNotes.forEach(note => {
    //         if(note._id===id){
    //             note.title = title;
    //             note.description = description;
    //             note.tag = tag;
    //         }
    //     });
    //     return newNotes;
    // }else{
    //     return state;
    // }
}

export default reducer;