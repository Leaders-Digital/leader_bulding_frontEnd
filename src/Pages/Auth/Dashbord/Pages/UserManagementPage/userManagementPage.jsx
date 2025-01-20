import React from 'react'
import UsersTable from './usersTable'
import PageHeader from './PageHeader'

const UserManagementPage = () => {
  return (
    <div className='w-full h-full flex-col  '>
     <div className='w-full h-32 ' ><PageHeader/> </div>
 <div className='h-10 w-full  mr-7  bg-white rounded-t-2xl pt-2 mb-1 '> <span className=' font-jakarta text-xl  font-bold size-6 ml-7 my-6 text-[#3A3541]'>Liste des utilisateurs Building</span></div>
    
<div className=' flex-1 w-full  '>

    <UsersTable/>
</div>
    </div>
  )
}

export default UserManagementPage