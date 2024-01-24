import React from 'react'
import { Outlet } from 'react-router-dom';


const Layouts = () => {
  return (
    <div>
        <p>HEADER</p>
        <Outlet></Outlet>

        <p>Footer</p>
    </div>
  )
}

export default Layouts;