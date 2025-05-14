import React from 'react'
import PuffLoader from "react-spinners/PuffLoader"

const MainLoader = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <PuffLoader color="#ffbb0b" size = {80} />
    </div>
  )
}

export default MainLoader;