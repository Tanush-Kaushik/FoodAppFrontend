import {React} from 'react'
import { useCart, useDispatchCart } from '../components/ContextReducer'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/styles.css'

export default function Cart() {

    let data = useCart()
    let dispatch = useDispatchCart()

    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3'>Cart is empty</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem('userEmail')

        let response = await fetch('https://foodappbackend-zna2.onrender.com/api/orderData', {   // http://localhost:5000/api/orderData
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        })

        // console.log(response)

        if (response.status==200) {
            dispatch({ type: 'DROP'})
        }

        toast.success('Check out Successful', {
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

    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    return (
        <div>
            <div className='fs-2 text-center' >My Cart</div>
            <div className='container m-auto table-responsive mt-5 table-responsive-sm table-responsive-md'>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col' class='head'>S.No</th>
                            <th scope='col' class='head'>Name</th>
                            <th scope='col' class='head'>Quantity</th>
                            <th scope='col' class='head'>Option</th>
                            <th scope='col' class='head'>Amount</th>
                            <th scope='col' class='head'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((food, index) => {
                                return (
                                    <tr>
                                        <th scope='row'>{index + 1}</th>
                                        <td>{food.name}</td>
                                        <td>{food.quantity}</td>
                                        <td>{food.size}</td>
                                        <td>{food.price}</td>
                                        <td>
                                            <button id='delete' onClick={() => dispatch({ type: 'DELETE', index })}>Remove Item</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                
                <div>
                    <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
                </div>
                <div>
                    <button className='mt-5 fs-5' id='co' onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    )
}
