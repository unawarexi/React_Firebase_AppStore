import React from 'react'
import {Link} from "react-router-dom"
import {Logo} from "../../assets/image"
import useUser from '../../hooks/user/UseUser'

const AdminHeader = () => {
    const {data : user, isLoading : userLoading,  isError, refetch} = useUser();
  return (
    <div className='w-full flex items-center justify-between'>
        {/**logo */}
        
        <Link to = {"/"}>
            <img src={Logo} alt="logo"  className='w-16 h-auto object-contain' />
        </Link>


        {/** user profile section */}
    </div>
  )
}

export default AdminHeader