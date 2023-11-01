import './App.css';
import Home from './screens/Home';
import Login from './screens/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrders from './screens/MyOrders';



function App() {

  return (
    <CartProvider>

      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            {/* <Route exact path='/cart' element={<Cart />} /> */}
            <Route exact path='/myOrders' element={<MyOrders />} />
          </Routes>

        </div>
      
      </Router>

     </CartProvider>
  )
}

export default App;
