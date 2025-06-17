import React, { useState } from 'react'

import { Input,  Select } from 'antd'
const ArchivedPageHeader = ({onFilterChange}) => {
    const[role,setRole]=useState("")
    const[search,setSearch]=useState("")
    const[isModalVisible,setIsModalVisible]=useState()
    const roles =[
      {
        value: 'user',
        label: 'User',
      },
      {
        value: 'admin',
        label: 'Admin',
      },
      
    ]
   const handleFilterchange=(value)=>{ 
   
    setRole(value)
    onFilterChange({role:value || '',search})
   }
   
    const handleSearchChange=(e)=>{
      const val =e.target.value
     
     setSearch(val)
      onFilterChange({role,search:val||''})
    }
  
  
    return (
      <div className='h-full w-full flex flex-col'>
          <div className=' mb-3'><span className=' font-jakarta text-3xl  font-bold size-6  text-[#3A3541]'>Utilisateurs Archivés</span></div>
          <div className=' h-full w-full flex flex-row justify-between '>
              <div className='  flex flex-row gap-3 flex-grow'>
                 <div className='flex flex-col'> 
                  <label htmlFor="name" className=' text-sm font-medium text-gray-700 mb-1'> Nom et prénom</label>
                  <Input className='h-12'  onChange={handleSearchChange}/>
                  </div>
                  <div className='flex flex-col'><label htmlFor="status" className=' text-sm font-medium text-gray-700 mb-1'> Role</label>
                  <Select className='h-12 w-40' options={roles} onChange={handleFilterchange} allowClear />
                  </div>
                
              </div>
              <div></div>
          </div>
  
      </div>
    )
}

export default ArchivedPageHeader