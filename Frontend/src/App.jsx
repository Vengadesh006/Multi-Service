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
import { ScrollUp } from './compoents/Nav/ScrollUp'
import { Page } from './compoents/home/Page'
import { ToastContainer } from 'react-toastify'

export const AuthContext = createContext()

function App() {


  return (
    <>

 <ToastContainer position='bottom-right' />
      <AuthContext.Provider >

         <Nav />
          <div style={{ marginTop: "100px" }} />
        <Routes>
         
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path='book/:id' element={<Booking />} />
          <Route path='/addcard' element={<AddToCard />} />

          {/* admin page */}
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin-user' element={<User />} />
          <Route path='/admin-provider' element={<Provider />} />
          <Route path='/admin-booking' element={<BookingDetails />} />
          <Route path='/admin-service' element={<ServiceDetails />} />
          <Route path='/admin-service/:id' element={<ServiceUpdate />} />
          {/* page not found */}
          <Route path='/*' element ={ <Page /> } />
        </Routes>

        <Footer />
      </AuthContext.Provider>
      

    </>
  )
}

export default App
