import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteAsync, updateAsync } from './cartSlice';
import './cart.css';

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  // State to store the inputted quantity
  const [inputQuantity, setInputQuantity] = useState(1); // Initialize with a default value

  const changehandler = (e) => {
    // Update the inputQuantity state when the input changes
    setInputQuantity(e.target.value);
    //setInputQuantity(1);
  };

  return (
    <>
      <div className="main">
        {items.map((item) => (
          <div className="innermain" key={item.id}>
            <div className="cart-item-image">
              <img src={item.thumbnail} alt={item.name} />

              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <h3 className="cart-item-title">{item.name}</h3>
                <p className="cart-item-description">{item.brand}</p>
                <span style={{ fontSize: '2rem' }}>Quantity: {item.quantity} </span>
                <p className="cart-item-price">${item.price}</p>

                <button
                  className="cart-item-remove"
                  onClick={() => dispatch(DeleteAsync(item.id))}
                >
                  Remove
                </button>

                {/* Input field to update quantity */}
                <input
                  type="number"
                  value={inputQuantity}
                  onChange={changehandler}
                  style={{ margin: '20px' }}
                />

                <button
                  className="cart-item-remove"
                  onClick={() => {
                    // Use the updated inputQuantity value
                    const id=item.id
                    dispatch(updateAsync({id,inputQuantity}))
                  }}
                >
                  Update Quantity
                </button>
              </div>
            </div>
          
            </div>
        ))}
        { <h1> Total:{items.reduce((acc,item)=>item.price*item.quantity+acc,0)}</h1>}
      </div>
    </>
  );
}
