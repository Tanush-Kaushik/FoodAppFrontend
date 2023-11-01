import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/styles.css'
import ReactiveButton from 'reactive-button';

export default function Signup() {

    let navigate = useNavigate()
    const [credentials, setCredentials] = useState({ name: "", email: "", location: "", password: "" })

    const submitHandler = async (event) => {
        event.preventDefault()

        const response = await fetch('https://foodappbackend-zna2.onrender.com/api/createUser', {  //  http://localhost:5000/api/createUser
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.location
            })
        })

        const json = await response.json()
        // console.log(json)

        if (!json.success) {

            if(json.message=='User already exists'){
                toast.error('User already exists', {
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
        else {

            localStorage.setItem('userEmail', credentials.email)
            localStorage.setItem('authToken', json.authToken)
            // console.log("hello puttar")

            setTimeout(()=>{
                toast.success('Registered Successfully', {
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
            },1500)

            navigate('/')
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    const [state, setState] = useState('idle');

    return (
        <div style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1550807014-1236e91b92d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMGZvb2QlMjBwaG90b2dyYXBoeXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '100vh',
            // opacity:'0.5',
            // backgroundColor:'black'

        }}>
            <div className='container'>
                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fs-5 mt-4">Name</label>
                        <input type="text" className="form-control" id='exampleInputEmail1' name='name' value={credentials.name} onChange={onChange} />
                        <div id="emailHelp" className="form-text">Enter full name</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label fs-5">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text">Please enter a valid email (doesn't have to be real)</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label fs-5">Password</label>
                        <input type="password" className="form-control" id='exampleInputEmail1' name='password' value={credentials.password} onChange={onChange} />
                        <div id="emailHelp" className="form-text">Password should be of at least 8 characters</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label fs-5">Location</label>
                        <input type="text" className="form-control" id='exampleInputEmail1' name='location' value={credentials.location} onChange={onChange} />
                    </div>
                    {/* <button type="submit" className="m-2 btn btn-success">Submit</button> */}

                    <ReactiveButton className='fs-5 mt-3'
                        type={'submit'}
                        idleText="Submit"
                        rounded
                        buttonState={state}
                        style={{ backgroundColor: 'green' }}
                        onClick={() => {
                            setState('loading');
                            setTimeout(() => {
                                setState('success');
                            }, 2000);
                        }}
                    />

                    <Link to='/login' className='btn fs-5' id='su' >Already a user</Link>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}
