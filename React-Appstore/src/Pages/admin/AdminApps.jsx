/* eslint-disable no-unused-vars */
import React from 'react'
import { AdminNewApps, ListOfApps } from '../../containers/ExpContainers'
import useResponsive from '../../hooks/responsive/useResponsive';

const AdminApps = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  return (
    <div className="w-full min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 rounded-lg flex justify-center items-start px-1 sm:px-2 md:px-4 overflow-x-hidden">
      <div className="w-full mx-auto py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-10 items-start">
          <div className="col-span-1 lg:col-span-2 flex flex-col lg:items-start items-center w-full">
            <AdminNewApps />
          </div>
          <div className="col-span-1 lg:col-span-1"></div>
          <div className="col-span-1 lg:col-span-2 flex flex-col lg:items-end items-center w-full">
            <ListOfApps />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminApps