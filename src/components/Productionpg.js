import React from 'react';
import './Product.css';
import { getProduct } from './Queries/ProdQ';
import { useQuery, gql } from "@apollo/client";
import Modal from './Modal.js'
import { useState, useEffect} from 'react';
import { useAppContext } from '../AppContext';


const getDefaultPersonalization = (cartItem) => {
  const defaultState = cartItem?.product_options?.map((item) => {
    return {
      name: item.title,
      value: item.options?.length && item.options[0].value,
    };
  });
  return defaultState;
};

export const Productionpg = () => {
  const { currency, cart, updateCart, toggleCart, updateProducts } =
  useAppContext();
const { loading, error, data } = useQuery(getProduct, {
  variables: { currency },
});
  const [showModal, toggleModal] = useState(false);
  const [cartItem, setCartItem] = useState(null);
  const [personalizations, setPersonalizations] = useState([]);

  const handleChange = (event) => {
    const updatedPersonalization = personalizations?.map((p) =>
      p.name === event.target?.name ? { ...p, value: event.target?.value } : p
    );
    setPersonalizations(updatedPersonalization);
  };


  const pushToCart = (e) => {
    e.preventDefault();
    const duplicate = cart.find((c) => c.id === cartItem.id);
    if (duplicate) {
      const newCart = cart.map((c) =>
        c.id === cartItem.id ? { ...c, quantity: c.quantity + 1 } : c
      );

      updateCart(newCart);
    } else {
      const newCart = [
        ...cart,
        { ...cartItem, options: personalizations, quantity: 1 },
      ];
      updateCart(newCart);
    }
    toggleModal(false);
    toggleCart(true);
  };

  
  useEffect(() => {
    setPersonalizations(getDefaultPersonalization(cartItem));
    if (data && data.products) updateProducts(data.products);
  }, [cartItem, data]);

  const addToCart = (productId) => {
    const product = data?.products.find((item) => item?.id === productId);
    if (product) {
      setCartItem(product);
      toggleModal(true);
    }
  };
    // const { data, loading, error } = useQuery(getProduct,{variables:{currency}});
    // console.log(data);

    if (loading) return "Loading...";
    if (error) return <pre>{error.message}</pre>
    return (
      <>
    <section class="products-section">
    {data.products.map((product) => (
        
          <div class="product" key={product.id}>
              <div class="text-center">
                  <img src={product?.image_url} alt="Premium-Grade Moisturizing Balm"/>
                  </div>
                  <h4 class="title">{product?.title}</h4>
                  <h2 class="price">{currency}{product?.price}.00</h2>
                  <button onClick={() => addToCart(product?.id)} class="btn">Add to Cart</button>
                  </div>  
          
       
    
    ))};
    </section>)
     <Modal show={showModal} closeModal={() => toggleModal(false)}>
     <div className="cart-item-wrapper">
       <div>
         <div className="text-center mb-5 pb-5">
           <img
             className="item-image"
             src={cartItem?.image_url}
             alt={cartItem?.title}
           />
         </div>
         <h4>First, Let's personalize.</h4>
         <p>
           Products that you receive may vary according to your age bracket &
           skin type to optimize results.
         </p>
         <h6>Personalization Details</h6>
         {cartItem?.product_options &&
           cartItem?.product_options.map((item, index) => (
             <div className="mb-3" key={index}>
               <label
                 htmlFor="exampleFormControlInput1"
                 className="form-label"
               >
                 {item?.title}
               </label>
               <select
                 name={item?.title}
                 className="form-select"
                 aria-label="Default select example"
                 onChange={handleChange}
                 value={
                   personalizations?.find((i) => i.name === item.title)
                     ?.value
                 }
               >
                 {item?.options &&
                   item?.options.map((option, index) => (
                     <option value={option?.value} key={index}>
                       {option?.value}
                     </option>
                   ))}
               </select>
             </div>
           ))}
       </div>
       <button onClick={pushToCart} className="btn">
         Add to cart
       </button>
     </div>
   </Modal>
   <div  className="mancare">
     <a className="join" href="https://www.instagram.com/lumin.skin/" >Join the #ManCareMovement</a>
     <svg viewBox="0 0 94 94" focusable="false" class="arrow"><path fill="currentColor" d="M58.75 19.5833L53.2275 25.1058L71.1658 43.0833H7.83333V50.9167H71.1658L53.1883 68.8942L58.75 74.4167L86.1667 47L58.75 19.5833Z"></path></svg>
    <div className="mancarepic">
    <a href="https://www.instagram.com/p/B5OA2E7h-3a/"  class="css-1idia5r"><img src="https://i.shgcdn.com/d39c7a95-9888-4f13-b43a-355a2f0849dd/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt ="" class="css-1ywmljq"/></a>
    <a href="https://www.instagram.com/p/B5OA2E7h-3a/"  class="css-1idia5r"><img src="https://i.shgcdn.com/19e25e65-d583-4357-9626-ee0f08d88c34/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt ="" class="css-1ywmljq"/></a>
    <a href="https://www.instagram.com/p/B33L4-en8Eb/"  class="css-1idia5r"><img src="https://i.shgcdn.com/c5b55791-a2d4-4659-b8bd-93ab3d0b3874/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt ="" class="css-1ywmljq"/></a>
    <a href="https://www.instagram.com/p/B4fnY0Ihh07/"  class="css-1idia5r"><img src="https://i.shgcdn.com/b24d9740-8340-40dd-ab30-c5e35d755c26/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt ="" class="css-1ywmljq"/></a>
    <a href="https://www.instagram.com/p/B87GtVLBp3z/"  class="css-tj8qcz"><img src="https://i.shgcdn.com/4fce0508-7701-43b0-893b-51c6fc785b5f/-/format/auto/-/preview/3000x3000/-/quality/lighter/" alt ="" class="css-1ywmljq"/></a>
    </div>

   </div>
 </>
);
    
}
export default Productionpg;