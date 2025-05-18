import React from 'react'
import { AdminNewApps, ListOfApps } from '../../containers/ExpContainers'

const AdminApps = () => {
  return (
    <div className="w-full mx-auto h-full bg-white dark:bg-gray-900 transition-colors duration-300 rounded-lg px-4">
      <div className="mx-auto px-2 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
        
          <div className="col-span-1 lg:col-span-2 flex flex-col items-start">
            <AdminNewApps />
          </div>
       
          <div className="col-span-1 lg:col-span-2">
            <ListOfApps />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminApps