import React,{useState} from 'react'
import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Categories from './pages/Categories'
import AdminHome from './pages/admin/AdminHome';
import AdminSignup from './pages/admin/AdminSignup';
import AddNews from './pages/admin/AddNews';
import AllNews from './pages/admin/AllNews';
import UpdateNews from './pages/admin/UpdateNews';
import AllReporter from './pages/admin/AllReporter';
import {Context} from './context'



export default function App() {
  const [page, setPage] = useState("home");
  return (
    <Context.Provider value={{page, setPage}}>
    <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/news/:id' element={<Categories />} />
          

          {/* Admin Route */}
          <Route path='/admin' element={<AdminHome/>} />
          <Route path='/admin/signup' element={<AdminSignup/>} />
          <Route path='/admin/addnews' element={<AddNews/>} />
          <Route path='/admin/allnews' element={<AllNews/>} />
          <Route path='/admin/update/:id' element={<UpdateNews/>} />
          <Route path='/admin/allreporters' element={<AllReporter/>} />
        </Routes>
    </Router>
    </Context.Provider>
    
  )
}

