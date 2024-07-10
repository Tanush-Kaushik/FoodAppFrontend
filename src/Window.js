import React from 'react'
import ReactDom from 'react-dom'
import './components/styles.css'

export default function Window({children,onClose}) {

  return ReactDom.createPortal(
    <div style={{
        position:'fixed',
        top:0,
        left:0,
        right:0,
        bottom:0,
        backgroundColor:'rgb(0,0,0,.7)',
        zIndex:1000
    }}>
        <div style={{
            position:'fixed',
            top:'50%',
            left:'50%',
            backgroundColor:'#45202e',
            transform:'translate(-50%,-50%)',
            zIndex:1000,
            height:'90%',
            width:'90%',
            'border-radius':'50px',
        }}>

            <button id='cross'  style={{marginLeft:'90%',marginTop:"-35px"}} onClick={onClose}>x</button>

            {children}
        </div>
    </div>,
    document.getElementById('cart-view')
  )
}
