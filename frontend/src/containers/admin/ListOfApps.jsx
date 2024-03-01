import React from 'react'
import useApps from '../../hooks/apps/UseApps'

const ListOfApps = () => {
  const {data, isLoading, isError, refetch }  = useApps();

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div>ListOfApps</div>
  )
}

export default ListOfApps