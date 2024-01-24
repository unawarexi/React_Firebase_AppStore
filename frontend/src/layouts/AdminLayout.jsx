import React from 'react'
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div>
        <p>admin header</p>
        <Outlet></Outlet>
        <p>admin footer</p>
    </div>
  )
}

export default AdminLayout;