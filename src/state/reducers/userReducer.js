const reducer = (state={}, action) =>{
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'EDIT_USER':
            return action.payload;
        case 'EDIT_PROFILE_PIC':
            return action.payload;
        default:
            return state;
    }
}

export default reducer;