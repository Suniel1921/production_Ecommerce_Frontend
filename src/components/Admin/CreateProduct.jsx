import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import { Select } from 'antd';
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState('');
  const [shipping, setShipping] = useState('');
  const navigate = useNavigate();

  // Get all categories (to show category list in drop-down menu)
  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/allCategory`)
      if (res?.data?.success) {
        setCategories(res.data.allCategory);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  }

  useEffect(() => {
    getAllCategory();
  }, [])

  // Create product
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category); 
      formData.append('quantity', quantity)
      formData.append('photo', photo);
      formData.append('shipping', shipping);
  
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/createProduct`, formData);
  
      if (res?.data.success) {
        toast.success(res?.data?.message);
        navigate('/dashboard/admin/allProduct')
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong');
      }
    }
  }

  return (
    <section className="container">
      <div className="menuContent">
        <AdminMenu />
        <div>
          <h3>Create Product</h3>
          <form onSubmit={submitHandler} className="productForm">
            <div>
              <div className="selectOption">
                <Select
                  onChange={(value) => { setCategory(value) }}
                  size="large"
                  showSearch
                  placeholder="Select Category"
                >
                  {categories.map((c) => (
                    <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>
                  ))}
                </Select>
              </div>

              <div className="photo">
                <label className="uploadPhoto">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    onChange={(e) => setPhoto(e.target.files[0])}
                    type="file"
                    name="photo"
                    accept="image/*"
                    hidden
                  />
                </label>
              </div>

              {/* For photo preview */}

              <div>
                {photo && (
                  <img
                    className=""
                    src={URL.createObjectURL(photo)}
                    alt="product-photo"
                    height={'200px'}
                  />
                )}
              </div>
            </div>

            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Product Name"
            />
            <input
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              type="text"
              placeholder="Product Description"
            />
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              type="number"
              placeholder="Product Price"
            />
            <input
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              type="number"
              placeholder="Product Quantity"
            />
            <Select
              onChange={(value) => setShipping(value)}
              placeholder="Select Shipping"
            >
              <Select.Option value="0">No</Select.Option>
              <Select.Option value="1">Yes</Select.Option>
            </Select>
            <button className="productBtn" type="submit">Create Product</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateProduct;

