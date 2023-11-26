import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import {Modal} from 'antd'
import UpdateProductForm from "../form/UpdateProductForm";


const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


  // Fetch and display all products
  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/allProduct`);
      if (res?.data?.success) {
        setProducts(res?.data?.allProduct);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  useEffect(() => {
    getAllProduct();
  }, []);




 //delete product
const deleteHandler = async (id) => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/deleteProduct/${id}`);
    if (res.data.success) {
      toast.success(res.data.message);
      getAllProduct();
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong');
  }
}




  return (
    <section className="container">
      <h3>All products</h3>
      <div className="menuContent">
        <AdminMenu />

        <div className="mainCard">

          {
            products.map((p) => (
              <>
                <div className="childCard">
                <img className="cardImg" src={`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/productPhoto/${p._id}`} alt="" />
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <h4>price ${p.price}</h4>
                  <div className="editDeleteBtn">
                    <button onClick={()=>{setIsModalOpen(true); setSelectedProduct(p._id)}}>Edit</button>                                   
                    <button onClick={() => deleteHandler(p._id)}>Delete</button>
                  </div>
                </div>
              </>

            ))
          }

          <Modal open={isModalOpen} footer={null} onCancel={()=>setIsModalOpen(false)}>
            <UpdateProductForm  productId={selectedProduct}/>
          </Modal>


        </div>
      </div>


    </section>
  );
};

export default AllProduct;
