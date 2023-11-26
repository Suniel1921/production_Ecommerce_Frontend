import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="adminMenu">
        <NavLink to={"/dashboard/admin/createCategory"}>Create Category</NavLink>
        <NavLink to={"/dashboard/admin/createProduct"}>Create Products</NavLink>
        <NavLink to={"/dashboard/admin/allProduct"}>All Products</NavLink>
        <NavLink to={"/dashboard/admin/allUsers"}>All Users</NavLink>
        <NavLink to={"/dashboard/admin/AdminOrders"}>All Orders</NavLink>
      </div>
    </>
  );
};

export default AdminMenu;
