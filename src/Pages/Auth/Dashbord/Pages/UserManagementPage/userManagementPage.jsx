import React, { useState } from 'react'
import UsersTable from './usersTable'
import PageHeader from './PageHeader'

const UserManagementPage = () => {
  const[filter,setFilter]=useState({role:'',search:""})
  const handleFilterChange=(newFilter)=>{
setFilter(newFilter)
  }
  return (
    <div className='w-full h-full flex-col  '>
     <div className='w-full h-32 ' ><PageHeader onFilterChange={handleFilterChange}/> </div>
 <div className='h-14 w-full  mr-7  bg-white rounded-t-2xl pb-2 pt-3 mb-1 '> <span className=' font-jakarta text-xl  font-bold size-6 ml-7 my-8 text-[#3A3541]'>Liste des utilisateurs Building</span></div>
    
<div className=' flex-1 w-full  '>

    <UsersTable  filter={filter}/>
</div>
    </div>
  )
}

export default UserManagementPage