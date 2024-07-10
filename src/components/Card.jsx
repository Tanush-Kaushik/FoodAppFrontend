import React, { useEffect, useRef, useState } from 'react'
import { useCart, useDispatchCart } from './ContextReducer'
import { ToastContainer, Zoom, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'
import ReactiveButton from 'reactive-button';

export default function Card(props) {

  const [state, setState] = useState('idle');
  let options = props.options
  let priceOptions = Object.keys(options)

  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState('')

  let dispatch = useDispatchCart()
  let data = useCart()
  const priceRef = useRef()


  const handleAddToCart = async () => {

    if (!localStorage.getItem('authToken')) {
      toast.warn('Login First', {
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
    else {
      let food = []

      for (const item of data) {
        if (props.foodItems._id === item.id) {
          food = item
          break
        }
      }

      if (food != [] && food.size === size) {
        await dispatch({
          type: 'UPDATE',
          id: props.foodItems._id,
          price: finalPrice,
          quantity
        })
      }
      else {
        await dispatch({
          type: 'ADD',
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          quantity,
          size
        })
      }

      // toast(`${props.foodItems.name} added successfully`, {
      //   position: "bottom-right",
      //   autoClose: 2000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      // });
    }
  }

  let finalPrice = quantity * parseInt(options[size])

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }} id='card'>
        <img src={props.foodItems.img} className="card-img-top" alt="..." style={{ height: '175px', objectFit: 'fill' }} />
        <div className="card-body" >
          <h5 className="card-title" class='h'>{props.foodItems.name}</h5>

          {/* <p className="card-text">{props.foodItems.description}</p> */}

          <div className='container w-100' class='h'>
            <select className='rounded m-2 h-100' id='addToCart' onClick={(e) => setQuantity(e.target.value)}>
              {
                Array.from(Array(5), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })
              }
            </select>

            <select className='rounded m-2 h-100' id='addToCart' ref={priceRef} onClick={(e) => setSize(e.target.value)}>
              {
                priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })
              }
            </select>

            <div className='d-inline h-100 fs-5'>
              Rs {finalPrice}/-
            </div>

          </div>
          <hr />
          <div class='h'><ReactiveButton 
                        id='addToCart'
                        idleText="Add to cart"
                        rounded
                        buttonState={state}
                        style={{backgroundColor:'rgb(116, 51, 51)'}}
                        onClick={() => {
                            setState('loading');
                            setTimeout(() => {
                                setState('success');
                            }, 1000);
                            handleAddToCart()
                          }}
                    /></div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}
