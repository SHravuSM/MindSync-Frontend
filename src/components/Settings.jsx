import { reauthenticateWithPopup, getAuth, deleteUser } from 'firebase/auth';
import React from 'react'
import { provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api1';

export default function Settings() {
    const navigate = useNavigate();
    const handleDelete = async () => {
        const res = api.delete('/user');
        // const auth = getAuth()
        // reauthenticateWithPopup(auth.currentUser, provider)
        //     .then(() => {
        //         return deleteUser(auth.currentUser); // retry deletion
        //     })
        //     .then(() => {
        //     })
        //     .then(() => {
        //         navigate('/')
        //         console.log("User successfully reauthenticated and deleted");
        //     })
        //     .catch((error) => {
        //         console.error("Reauthentication or deletion failed:", error);
        //     });
    }
    return (
        <div>
            <p>Delete Account</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}
