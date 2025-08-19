import './App.css'
import { BrowserRouter, Router, Route, Routes } from "react-router-dom"
import { Nav } from './compoents/Nav/Nav'
import { Home } from './compoents/home/Home'
import { Signup } from './compoents/Signup/Signup'
import { Login } from './compoents/Signup/Login'
import { Footer } from './compoents/Footer/Footer'
import { Booking } from './compoents/book/Booking'
import { Admin } from './compoents/admin/Admin'
import { User } from './compoents/admin/User'
import { Provider } from './compoents/admin/Provider'
import { BookingDetails } from './compoents/admin/BookingDetails'
import { ServiceDetails } from './compoents/admin/ServiceDetails'
import { ServiceUpdate } from './compoents/admin/ServiceUpdate'
import { AddToCard } from './compoents/Add/AddToCard'
import { createContext } from 'react'

export const AuthContext = createContext()

function App() {
  const userName = "vengadesh"

  return (
    <>
      <AuthContext.Provider value={{userName}} >

        <Nav />
        <div style={{ marginTop: "100px" }} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='/:id' element={<Booking />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin-user' element={<User />} />
          <Route path='/admin-provider' element={<Provider />} />
          <Route path='/admin-booking' element={<BookingDetails />} />
          <Route path='/admin-service' element={<ServiceDetails />} />
          <Route path='/admin-service/:id' element={<ServiceUpdate />} />
          <Route path='/addcard' element={<AddToCard />} />
        </Routes>

        <Footer />
      </AuthContext.Provider>
    </>
  )
}

export default App
