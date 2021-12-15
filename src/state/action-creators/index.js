export const setNotes = (notes)=>{
    return (dispatch) => {
        dispatch({
            type: 'SET_NOTES',
            payload: notes
        })
    }
}
export const addNote = (note)=>{
    return (dispatch) => {
        dispatch({
            type: 'ADD_NOTE',
            payload: note
        })
    }
}
export const removeNote = (id)=>{
    return (dispatch) => {
        dispatch({ 
            type: 'REMOVE_NOTE',
            payload: id
        })
    }
}
export const updateNote = (note)=>{
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_NOTE',
            payload: note
        })
    }
}

export const setAlert = (alert) =>{
    return (dispatch) => {
        dispatch({
            type: 'SHOW_ALERT',
            payload: alert
        })
    }
}