const reducer = (state=[], action) =>{
    switch (action.type) {
        case 'SET_NOTES':
            return action.payload;
        case 'ADD_NOTE' :
            return state.concat(action.payload);
        case 'REMOVE_NOTE':
            return state.filter((note)=>(note._id!==action.payload))
        case 'UPDATE_NOTE':
            const {_id, title, description,tag} = action.payload;
            let newNotes = JSON.parse(JSON.stringify(state)); //must create a deep copy
            newNotes.forEach(note => {
                if(note._id===_id){
                    note.title = title;
                    note.description = description;
                    note.tag = tag;
                }
            });
            return newNotes;
        default:
            return state;
    }
}

export default reducer;