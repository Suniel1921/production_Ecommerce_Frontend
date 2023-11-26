import React from 'react';
import Layout from './components/layout/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Account from './components/pages/Login';
import Cart from './components/pages/Cart';
import Home from './components/pages/Home';
import Register from './components/pages/Regster';
import toast, { Toaster } from 'react-hot-toast';
import Login from './components/pages/Login';
import PrivateRoute from './components/user/PrivateRoute';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminRoute from './components/Admin/AdminRoute';
import Dashboard from './components/user/Dashboard';
import CreateCategory from './components/Admin/CreateCategory';
import CreateProduct from './components/Admin/CreateProduct';
import AllProduct from './components/Admin/AllProduct';
import Users from './components/Admin/Users';
import ProductList from './components/pages/ProductList';
import ProductDetails from './components/pages/ProductDetails';
import Order from './components/user/Order';
import Profile from './components/user/Profile';
import AdminOrder from './components/Admin/AdminOrder';


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />

            <Route path='/dashboard' element={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>}/>
            <Route path='admin/createCategory' element={<CreateCategory/>}/>
            <Route path='admin/createProduct' element={<CreateProduct/>}/>
            <Route path='admin/allProduct' element={<AllProduct/>}/>
            <Route path='admin/allUsers' element={<Users/>}/>
            <Route path='admin/AdminOrders' element={<AdminOrder/>}/>
            </Route>            


            <Route path='/dashboard' element={<PrivateRoute/>}>
            <Route path='user' element={<Dashboard/>}/>
            <Route path='user/order' element={<Order/>}/>
            <Route path='user/profile' element={<Profile/>}/>
            <Route path='productlist' element={<ProductList/>}/>         
            </Route>
            
            <Route path="/productDetails/:id" element={<ProductDetails />} />

            
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
