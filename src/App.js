import { useState ,useEffect} from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import Cart from './cart/Cart/Cart';
import Products from './features/product/product';
import { useSelector } from 'react-redux';
import { fetchAsync } from './cart/Cart/cartSlice';

function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchAsync())
  },[dispatch]);
  const [show,setshow]=useState(false);
  const items=useSelector(state=>state.cart.items)
  return (
    <div className="App">
      <button className='btn' onClick={()=>setshow(!show)}>{show === false ? `Go to Cart (${items.length})` : 'Go to Products'} </button>
      {show===false? <Products />:<Cart/>}
    </div>
  );
}

export default App;
