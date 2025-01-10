import { Routes,Route , Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import SignUpPage from './pages/SignUpPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'

import {Loader} from "lucide-react"

import {Toaster} from "react-hot-toast"
import { useThemeStore } from './store/useThemeStore'

function App() {

  const {authUser , checkAuth ,isCheckingAuth,onlineUsers}  = useAuthStore();

  const {theme} = useThemeStore();

  console.log(onlineUsers);

  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  if(isCheckingAuth && !authUser){
  // if(false){
    return (
      <div className='flex items-center justify-center h-screen'>
          <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" /> }></Route>
        <Route path='/signup' element={ !authUser ? <SignUpPage /> : <Navigate to="/" />}></Route>
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />}></Route>
        <Route path='/settings' element={<SettingsPage />}></Route>
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />}></Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App


// npm i react-router-dom react-hot-toast 
// hot-toast to show notification 
// npm install axios zustand
// npm lucide-react ( to get loading icon)

// npm i  socket.io-client