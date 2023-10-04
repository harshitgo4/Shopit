import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAsync } from './productSlice';
import "./card.css"
import { AddAsync } from '../../cart/Cart/cartSlice';
export default function Products() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.product.products); // Add a default empty array if 'Products' is undefined
  useEffect(() => {
    dispatch(fetchAsync())
  },[dispatch]);
  return (
    <>
      <div>
    
      </div>
      <div className='main'>
        {products.map((product) => (
          <div className="card" key={product.id}>
            <img  className='imga' src={product.thumbnail} alt={product.title} />
            <div className="container">
              <h4><b>{product.title}</b></h4>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Rating: {product.rating}</p>
              <p>Stock: {product.stock}</p>
              <p>Brand: {product.brand}</p>
              <p>Category: {product.category}</p>
              <p> 
                <button onClick={()=>dispatch(AddAsync(product))}> Add to Cart</button>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
