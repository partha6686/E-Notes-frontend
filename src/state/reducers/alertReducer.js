const reducer = (state=null, action) =>{
    switch (action.type) {
        case 'SHOW_ALERT':
            return action.payload;
        default:
            return state;
    }
}

export default reducer;