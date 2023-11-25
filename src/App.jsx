import { useEffect, useState } from 'react'
import {useDispatch} from "react-redux"
import authService from "./appwrite/auth"
import {login,logout} from "./store/authSlice"

import './App.css'
import { Footer, Header } from './components'

function App() {
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch();

  useEffect(()=> {
       authService.getCurrentUser()
       .then((userData)=> {
         if(userData){
           dispatch(login({userData}))  
         } 
          else {
            dispatch(logout())  
             
          }
       } )
       .finally(()=> setLoading(false) )    
  },[] )

 // conditional rendering here
 return !loading ? (
   <div className=" min-h-screen flex flex-wrap bg-gray-400 justify-between ">
     <div className='w-full block' >
        <Header/>
        <main>
        Todo:
        </main>
        <Footer/>
     </div>
   </div>
 ) : null 
   
 

}

export default App
