import React from 'react'
import UsersTable from './usersTable'

const UserManagementPage = () => {
  return (
    <div className='w-full h-full flex-col overflow-hidden '>
 <div className='h-10 w-full  mr-7 '> <span className=' font-jakarta text-xl  font-bold size-6 ml-7 my-6 text-[#3A3541]'>Liste des utilisateurs Building</span></div>
    
<div className=' flex-1 w-full  '>

    <UsersTable/>
</div>
    </div>
  )
}

export default UserManagementPage