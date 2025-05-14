import React from 'react'
import { AdminNewApps, ListOfApps } from '../../containers/ExpContainers'

const AdminApps = () => {
  return (
    <div className='w-full grid grid-cols-1 lg:grid-cols-2'>
      {/* {adminapps left} */}
      <AdminNewApps />


      {/* {adminapps right} */}
      <ListOfApps />
    </div>
  )
}

export default AdminApps