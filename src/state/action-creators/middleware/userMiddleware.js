import { setUser, editUser } from "..";

// FETCH USER DETAILS
export const fetchUser = ()=>{
    const host = 'http://localhost:3300';
    return (async (dispatch)=>{
        const url = `${host}/api/profile/`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            } 
        });
        const json = await response.json(); 
        dispatch(setUser(json)); 
    })
}

//EDIT USER DETAILS
export const editUserDetails = (details)=>{
    const host = 'http://localhost:3300'
    return (async (dispatch)=>{
        const url = `${host}/api/profile/edit`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify(details)
        });
        const json = await response.json(); 
        dispatch(editUser(json)); 
    })
}