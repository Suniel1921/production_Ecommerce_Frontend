import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import CategoryForm from "../form/CategoryForm";
import axios from 'axios';
import toast from "react-hot-toast";
import {Modal} from 'antd';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName , setUpdatedName] = useState(''); 


    //get all category network request

    const getAllCategory = async ()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/allCategory`);
        setCategories(res.data.allCategory)        
      } catch (error) {
        // console.log(error)
        toast.error('something went wrong')
        
      }
    }
    //calling getAllCategory
    useEffect(()=>{
      getAllCategory();
    },[])




  //create category network request
  const submitHandler = async (e)=>{
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/createCategory`,{name});
      if (res.status === 201 && res.data.success) {
        toast.success(res.data.message);
        getAllCategory();
        setName('')
      } else {
        toast.error(res.data.message);
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

  //update Category network request
  const updateHandler = async (e)=>{
    e.preventDefault()
    try {
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/updateCategory/${selected._id}`,{name:updatedName})
      if(res.data.success){
        toast.success(res.data.message)
        setSelected(null) //for input form empty
        setUpdatedName('') //for name empty
        setIsModalOpen(false) // for modal off is value is updated
        getAllCategory() // recalling . to get initail time updated value
      }
      else{
        toast.error(res.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
      
    }
  }

  
  //detele category network request
  const deleteHandler = async (id)=>{
    try {
      const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_PORT}/deleteCategory/${id}`);
      if(res.data.success){
        toast.success(res.data.message);
        getAllCategory();
      }
      
    } catch (error) {
      console.log(error)
      toast.error('Something went Wrong')
      
    }
  }



  return (
    <>
      <section className="container">
        <div className="menuContent">
          <AdminMenu />
          <div>
          <h3>create category</h3>
          <CategoryForm submitHandler={submitHandler} value={name} setValue={setName}/>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
              categories.map((c)=>(
                <>
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>
                     <div className="editDeleteBtn">
                     <button onClick={()=>{setIsModalOpen(true); setUpdatedName(c.name); setSelected(c)}} className="btns editBtn">Edit</button>
                      <button onClick={()=> {deleteHandler(c._id)}} className="btns deleteBtn">Delte</button>
                     </div>
                    </td>
                  </tr>
                </>
              ))
            }

            </tbody>
          </table>
          </div> 
        </div>

        <Modal onCancel={()=>setIsModalOpen(false)} open={isModalOpen} footer={null} >
          <CategoryForm value={updatedName} setValue={setUpdatedName} submitHandler={updateHandler}/>
        </Modal>

        
      </section>
    </>
  );
};

export default CreateCategory;
