import React from 'react'
import { auth } from '../config/Firebase.config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleSignOut = () => {
    auth.signOut().then(() => {
      toast.success("Logged out successful")

      navigate("/auth", {replace: true})
    })

  }

  return (
    <div>Home


      <button onClick={handleSignOut}>signout</button>
    </div>
  )
}

export default Home