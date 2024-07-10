import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/styles.css'
import ReactiveButton from 'reactive-button';

export default function Login() {

  let navigate = useNavigate()

  const [state, setState] = useState('idle');

  const [credentials, setCredentials] = useState({ email: "", password: "" })

  const submitHandler = async (event) => {
    event.preventDefault()

    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/loginUser', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      })
    })

    const json = await response.json()
    console.log(json)

    if (!json.success) {

      if(json.message=='Sign up first'){
        toast.error('Sign up first', {
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
      }

      else{
        toast.error('Invalid Credentials', {
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
      }
    }
    else{
      localStorage.setItem('userEmail',credentials.email)
      localStorage.setItem('authToken',json.authToken)
      // console.log('bala')

      setTimeout(()=>{toast.success('Login Succesfull', {
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
      });},1500)

      navigate('/')
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  return (
    <div style={{
      backgroundImage:'url("https://images.unsplash.com/photo-1550807014-1236e91b92d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80")',
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            height:'100vh'
    }}>
      <div className='container mb-4'>
        <form onSubmit={submitHandler}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label fs-5 mt-4">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
            <div id="emailHelp" className="form-text">Enter registered email</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label fs-5">Password</label>
            <input type="password" className="form-control" id="exampleInputEmail1" name='password' value={credentials.password} onChange={onChange} />
            <div id="emailHelp" className="form-text">Password should be of at least 8 characters</div>
          </div>

          <ReactiveButton className='fs-5 mt-3'
                        type={'submit'}
                        idleText="Submit"
                        rounded
                        buttonState={state}
                        style={{backgroundColor:'green'}}
                        onClick={() => {
                            setState('loading');
                            setTimeout(() => {
                                setState('success');
                            }, 2000);
                        }}
                    />
          <Link to='/createuser' className='btn fs-5' id='su'>Sign Up</Link>
        </form>
      </div>
      <ToastContainer/>
    </div>
  )
}
