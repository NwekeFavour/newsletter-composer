import { useState } from 'react'
import './App.css'
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/home'
import ManageNewsletters from './pages/manage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/manage" element={<ManageNewsletters/>} />
      </Routes>
    
    </>
  )
}

export default App
