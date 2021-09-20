import Cart from "./components/Cart";
import Header from "./components/Header";
import Productionpg from "./components/Productionpg";
import SubHeader from "./components/SubHeader";
import { AppContext } from "./AppContext";
import { useState } from "react";
import { Footer } from "./components/Footer";




function App() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [currency, setCurrency] = useState(
    JSON.parse(localStorage.getItem("currency")) || "USD"
  );
  const [cartState, setCartState] = useState(false);

  const [products,setProducts] = useState([]);

  function updateCurrency(newCurrency) {
    setCurrency(newCurrency);
    localStorage.setItem("currency", JSON.stringify(newCurrency));

  }
  function updateCart(newCart) {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }
  function toggleCart(state) {
    setCartState(state);
  }

  function updateProducts(newProducts){
    console.log('updating products..', newProducts)
    setProducts(newProducts);
  }
  return (
    <div>
      <AppContext.Provider
        value={{
          cart,
          currency,
          cartState,
          products,
          updateProducts,
          updateCart,
          updateCurrency,
          toggleCart,
        }}
      >
      <Cart />
      <Header/>
      
      <SubHeader/>
      <Productionpg/>
      <Footer/>
      
     
      </AppContext.Provider>
    </div>
  );
}

export default App;
