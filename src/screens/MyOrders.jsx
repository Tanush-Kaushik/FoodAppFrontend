import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../components/styles.css'

export default function MyOrders() {

    const [arr,setArr] = useState([])

    const fetchOrder = async () => {

        await fetch(process.env.REACT_APP_BACKEND_URL+'/api/myOrders', {  //  http://localhost:5000/api/myOrders
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {

            let response = await res.json()
           
            if(response.success){
                setArr(response.orderData.order_data.reverse())
            }
        })
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    return (
        <>
            <div><Navbar/></div>

            <div className='container'>
                    {
                        arr !=[]?
                            arr.map((item)=>{
                                return (
                                    item.map((obj)=>{
                                        return (
                                            <div>
                                                {
                                                    obj.order_date?
                                                    <div>
                                                        <br/>
                                                        <div className='m-auto mt-5'>{obj.order_date}</div>
                                                        <br/>
                                                    </div>
                                                    :<div>
                                                        <div className='col-12 col-md-6 col-lg-3'>
                                                            <div className='card mt-3' id='hcard' style={{ width: "16rem", maxHeight: "360px" }}>

                                                                <div className='card-body'>

                                                                    <h5 className='card-title'>{obj.name}</h5>

                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>

                                                                        <span className='m-1'>{obj.quantity}</span>
                                                                        <span className='m-1'>{obj.size}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5'>Rs {obj.price}/-</div>

                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                )
                            })
                        :''
                    }

            </div>

            <div><Footer /></div>
        </>
    )
}
