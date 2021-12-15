import {setAlert} from '../index';

export const showAlert = (message, type)=>{
    return (async (dispatch)=>{
        dispatch(setAlert({message, type}));
        setTimeout(() => {
            dispatch(setAlert(null));
        }, 3000);
    })
}