import React from 'react'
import {useDispatch} from "react-redux";
import authService from '../../appwrite/auth';
import {logout} from "../../store/authSlice";


const LogoutBtn = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
         authService.logout().then(()=> {
            dispatch(logout());
         } ) 

    }

  return (
    <button className='bg-red-600 py-2 px-4 text-white hover:bg-red-700 border-none text-lg rounded-lg'>
        Logout
    </button>
  )
}

export default LogoutBtn