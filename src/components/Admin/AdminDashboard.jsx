import React from 'react'
import { useAuth } from '../context/UserContext'
import AdminMenu from './AdminMenu';

const AdminDashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <>
      <section className='container'>
      <div className='adminContents'>
      <AdminMenu/>

      {/* <h3>welcome to the Admin Dashboard Mr {auth.user.name}</h3> */}
    
      </div>
      

      </section>
    </>
  )
}

export default AdminDashboard