import React, { useState, useEffect } from 'react';
import './App.css'
import envConfig from './configENV/configENV'
import {useDispatch} from 'react-redux';
import authService from './appwrite/auth';
import { login,logout } from './store/authSlice';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      } else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false));
  },[])

  return !loading? (
    <div className='min-h-screen flex flex-wrap content-between bg-emerald-400 dark:bg-zinc-800'>
      <div className='w-full block text-black text-center text-2xl'>
        <Header />
          <main>
            <Outlet />
          </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className='loader'></div>
  )
}

export default App
