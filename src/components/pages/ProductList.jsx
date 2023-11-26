import React, { useEffect, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import {Checkbox, Radio} from 'antd'
import { prices } from "./Price";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";


const ProductsPage = () => {
  const [cart, setCart] = useCart();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const navigate = useNavigate();



  //get all product list
  const getAllProducts = async ()=>{
   try {
    const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/allProduct`)
    if(res?.data?.success){
      setProducts(res.data.allProduct)
    }
    else{
      toast.error(res.data.message)
    }    
   } catch (error) {
    console.log(error)
    toast.error("Something went wrong")    
   }
  }


  useEffect(()=>{
    // getAllProducts();
    if(!checked.length || !radio.length) getAllProducts();
  },[])

  //get all category list
  const getAllCategory = async ()=>{
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/allCategory`)
      if(res?.data?.success){
        setCategory(res.data.allCategory);
      }
      else{
        toast.error(res.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
      
    }
  }

  useEffect(()=>{
    getAllCategory()
  },[])



  //filter by category
  const filterHandler = (value, id)=>{
    let all = [...checked];
    if(value){
      all.push(id);
    }
    else{
      all = all.filter((c)=> c!== id);
    }
    setChecked(all);

  }

  //network requrest to backend filter code
  const productFilter = async ()=>{
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/productFilter`,{checked, radio})
      if(res.data.success){
        setProducts(res.data.products)
      }

      
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(()=>{
    if(checked.length || radio.length) productFilter();
  },[checked, radio])

  









  return (
    <div className="mainContainer">
      <div className="filterSection">
      {/* {JSON.stringify(checked, null, 4)}
      {JSON.stringify(radio, null, 4)} */}
      {/* //filter by category */}
      <h3>Filter by Category</h3>
       {
        category.map((c)=>(
          <>
          <Checkbox onChange={(e)=> filterHandler(e.target.checked, c._id)} key={c._id}>{c.name}</Checkbox>
       
          </>
        ))
       }

       {/* //filter by price */}

       <h3>Filter by Price</h3>
       <Radio.Group onChange={(e)=> setRadio(e.target.value)}>
        {
          prices.map((p)=>(
            <div key={p._id}>
            <Radio value={p.array}>{p.name}</Radio>
            </div>
          ))
        }
       </Radio.Group>

       {/* Reset Button */}
       <button onClick={()=> window.location.reload()}>Reset Filter</button>

   


      </div>

      <div className="productSection">
        <div className="mainCard">
        {
          products.map((p)=>(
            <>
            <div className="childCard" key={p._id}>
            <img src={`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/productPhoto/${p._id}`} alt=""/>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <h4>Price $ {p.price}</h4>
            <div className="moredetailsCart">
            <button className="moreDetailBtn both_Btn" onClick={() => navigate(`/productDetails/${p._id}`)}>More Details</button>
              <button className="cartBtn both_Btn" onClick={()=> {setCart([...cart,p]); 
              //setting localstorage
              localStorage.setItem('cart', JSON.stringify([...cart, p]))
              toast.success('Item added to cart')}}>Add to cart</button>
            </div>
          </div> 

            </>
          ))
        }       
         
          
      
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
