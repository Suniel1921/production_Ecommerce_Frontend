import React, { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";


const Home = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [product , setProduct] = useState([]);
  const navigate = useNavigate();


  //network request to getallproduct list
  const getAllProduct = async ()=>{
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/allProduct`);
      if(res?.data?.success){
        setProduct(res.data.allProduct)
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
    getAllProduct()
  },[])




  return (
    <>
      {/* //main section */}
      <section className="mainsection">
        <main className="container">
          <div className="mainContnet">
            <h4 className="subHeading">STARTING FROM $50</h4>
            <h1 className="heading">HEADPHONES</h1>
            <p className="para">FEEL THE BASE IN YOUR BONES</p>
            <button className="btn">Shop Now</button>
          </div>
        </main>
      </section>

      {/* //section section */}
      <section className="container">
        <div className="sec_Section">
          <div className="left_section">
             {/* this div is for text upon image */}
            <div class="image-container">
              <img src="/images/mobile-bnr.webp" alt="mobilebrn" />
              <div className="textUponImg">
              <h4 className="subHeading ">Glaxy S22 Ultra</h4>
              <p>Make nights epic with <br /> Nightography</p>
              <button className="offBtn">GET 10% OFF</button>
              </div>              
            </div>
          </div>

          <div className="right_section">
            <div className="childSec">
              <img src="/images/game.webp" alt="game" />
              <img src="/images/projectore.webp" alt="projector" />
            </div>
            <div className="childSec">
              <img src="/images/speeker.webp" alt="speeker" />
              <img src="/images/soundbar.webp" alt="soundbar" />
            </div>
          </div>
        </div>
      </section>

      {/* new product section */}

      <section className="newProductSec">
      

      <div className="container">
      <h2 className="subHeadings">New Products</h2>
        <div className="mainCard">
        {
          product.slice(0,6).map((p)=>(
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
      </section>

     


    </>
  );
};

export default Home;
