import { setUser, editUser, editProfilePic } from "..";

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

//UPDATE PROFILE PICTURE
export const updateProfilePic = (data)=>{
    const host = 'http://localhost:3300'
    return (async (dispatch)=>{
        const url = `${host}/api/profile/add-profile-picture`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token')
            },
            body: data
        });
        const json = await response.json(); 
        dispatch(editProfilePic(json)); 
    })
}