import React from 'react'
import { Outlet } from 'react-router-dom';
import { AdminHeader } from '../components/ExpComp';

const AdminLayout = () => {
  return (
    <div className='w-screen h-auto flex flex-col items-center justify-start px-4 py-3'> 
        <AdminHeader />
        <Outlet></Outlet>
        <p>admin footer</p>
    </div>
  )
}

export default AdminLayout;