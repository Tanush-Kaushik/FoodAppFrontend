import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Window from '../Window'
import Cart from '../screens/Cart'
import { useCart } from './ContextReducer'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'

export default function Navbar() {

  const [cartView, setCartView] = useState(false)
  let data = useCart()

  let navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem('authToken')

    toast.success('Logout Successful', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition:Zoom,
      style:{
        borderRadius:40,
        backgroundColor:'#5d1d38'
      }
    });

    navigate('/')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark" id='nav' style={{ "width": "100%" }}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">FOODY</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto">

              {
                (localStorage.getItem('authToken')) ?
                  <li>
                    <Link className='nav-link active fs-5 m-1 mx-3' id='but' aria-current="page" to='/myOrders'>Order History</Link>
                  </li>
                  : <></>
              }

            </ul>

            {
              (!localStorage.getItem('authToken')) ?
                <div className='d-flex'>
                  <Link className="nav-link active fs-5 m-1" id='login' to="/login">Login</Link>
                  <Link className="nav-link active fs-5 m-1" id='login' to="/createuser">Sign up</Link>
                </div>
                :
                <div className='d-flex'>

                  <Link className=" position-relative nav-link active fs-5 m-1" id='myCart' onClick={() => setCartView(true)}>
                    My Cart
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {data.length === 0 ? <></> : data.length}
                    </span>
                  </Link>

                  {cartView ? <Window onClose={() => setCartView(false)}> <Cart /> </Window> : ''}

                  <Link className="nav-link active fs-5 m-1" id='logout' onClick={handleLogout}>Logout</Link>

                </div>
            }

          </div>
        </div>
      </nav>
    </div>
  )
}
