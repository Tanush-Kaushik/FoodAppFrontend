import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, {
        id: action.id,
        name: action.name,
        quantity: action.quantity,
        size: action.size,
        price: action.price
      }]
    
    case 'DELETE':
      let arr = [...state]
      arr.splice(action.index,1)
      return arr  
    
    case 'UPDATE':
      let arr2 = [...state]
      arr2.find((food,index)=>{
        if(food.id===action.id){
          arr2[index] = {...food, quantity: parseInt(action.quantity) + parseInt(food.quantity) , price: action.price + food.price}
        }
      })
      return arr2

    case 'DROP':
      let arr3 =[]
      return arr3

    default:
      console.log('error in reducer')
  }
}

export const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, [])

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)
