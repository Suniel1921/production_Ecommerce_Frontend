import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
    <h2>User Menu</h2>
    <div className='userMenu adminMenu'>
    <NavLink to={"/dashboard/user/profile"}>My Profile</NavLink>
    <NavLink to={"/dashboard/user/order"}>My Orders</NavLink>

    </div>
    </>
  )
}

export default UserMenu