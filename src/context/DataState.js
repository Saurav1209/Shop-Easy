import React, { useEffect, useState } from "react";
import DataContext from './DataContext'
import { useReducer } from "react";



const initialState = {
    data: [],
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_DATA':
        return {
          ...state,
          data: action.payload,
        };
      case 'SORT_LOW_TO_HIGH':
        return {
          ...state,
          data: state.data.slice().sort((a, b) => a.price - b.price),
        };
      case 'SORT_HIGH_TO_LOW':
        return {
          ...state,
          data: state.data.slice().sort((a, b) => b.price - a.price),
        };
      default:
        return state;
    }
  };


function DataState(props) {
    // const toast = useToast()
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(0)
    const [amt, setAmt] = useState(0);
    const [user, setUser] = useState(null);
    const [product, productDispatch] = useReducer(reducer, initialState);


    const handleCart  = () => {
      setCart([]);
      setAmt(0);
      setQuantity(0);
      localStorage.removeItem(user.userId);

     
    }
    const handlePrice = () => {
      let ans = 0;
      
      cart.forEach((it) => {
          if (it && it.price) {
              ans += it.price;
          }
      });
  
      setAmt(ans);
  }

    const handleclick = (item) => {
      //   // console.log(item)
      //   let temp = {};
      //   temp = item;

      // //  const uniqueCount = new Set(cart).size;
      // //  quantity = uniqueCount;
      //   // console.log(quantity);
      //   let present = false;
      //   cart.forEach((pro) => {
      //       if (item.id === pro.id)
      //           present = true;
      //   })
      //   if (present) {
      //       toast({
      //           title: 'Item is aleady present in Cart',
      //           status: 'error',
      //           duration: 2000,
      //           position: 'top-right',
      //           isClosable: true,
      //       })
      //       return;
      //   }

        // console.log(item)
        setCart([...cart, item]);
        localStorage.setItem(user.userId,JSON.stringify([...cart,item]))
        setQuantity((prevNumItems) => prevNumItems + 1)
    }
    useEffect(() => {
      const loggedInUser = {
        userId: localStorage.getItem('id'),
      
      };
      // console.log(loggedInUser.userId);
      setUser(loggedInUser);
      const storedCart = JSON.parse(localStorage.getItem(loggedInUser.userId)) || [] ;
      setCart(storedCart)
      setQuantity(storedCart.length)
  }, [cart])
    return (
        <DataContext.Provider value={{ handleCart, handleclick, handlePrice, product, productDispatch , quantity, amt, setAmt,cart, user}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState
