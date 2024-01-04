import React, { useEffect, useContext,useState } from 'react'
import DataContext from '../context/DataContext'
import Items from '../components/Items';
import Navbar from '../components/Navbar';




export default function UserHome(props) {
   const a = useContext(DataContext);
   const [query, setQuery] = useState('');

   async function updateHome() {
      props.setProgress(5);
      props.setProgress(35);
      const response = await fetch(`https://dummyjson.com/products/search?q=${query}&limit=0`)

      const data = await response.json();
      console.log(data.products);
      props.setProgress(70);
      a.productDispatch({ type: "SET_DATA", payload: data.products });
      props.setProgress(100);
   }
   useEffect(() => {

     a.handlePrice();
      //eslint-disable-next-line 
  }, [a.cart])
   useEffect(() => {
      updateHome();
      //eslint-disable-next-line 
   }, [query])
   useEffect(() => {
      updateHome();
   
      //eslint-disable-next-line 
   }, [])
   const handlesearch = (query) => {
      setQuery(query);
    }

   return (
      <>
         <Navbar onSearch={handlesearch} />
         <div className="container">

            <div className="row my-3" style={{ padding: '10px' }} >
               <Items ItemsArr={a.product.data} />
            </div>
         </div>
      </>
   )
}