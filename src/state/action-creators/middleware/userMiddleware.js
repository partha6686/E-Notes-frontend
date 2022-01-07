import { setUser } from "..";

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