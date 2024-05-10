import { createContext, useEffect, useState } from "react"

export const CartContext = createContext({});

export default function CartContextProvider({children}) {
  const ls = typeof window  !== "undefined" ? window.localStorage : null; 
  const [cartProducts, setCartProducts] = useState([]) 

  useEffect(() => {
    if(cartProducts?.length > 0){
      ls?.setItem('cart', JSON.stringify(cartProducts))
    }
    if(cartProducts?.length === 0){
      // removes the localstorage memory if cart is empty else it would be display item
      localStorage.removeItem('cart')
    }
  }, [cartProducts])


  useEffect(() => {
    if(ls && ls.getItem('cart')){
      setCartProducts(JSON.parse(ls.getItem('cart')));
    }
  }, []);

  function addProduct(productId){
    setCartProducts(prev => [...prev, productId])
  }

  function removeProduct (productId){
    setCartProducts(prev => {
      const pos = prev.indexOf(productId);
      if(pos !== -1){
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    })
  }

  return (
    <CartContext.Provider 
      value={{cartProducts, setCartProducts, addProduct, removeProduct}}
    >{children}</CartContext.Provider>
  )
}