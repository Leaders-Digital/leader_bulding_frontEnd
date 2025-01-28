import React, { useState } from 'react'
import ProspectsTable from './prospectsTable'
import ProspectPageHeader from './prospectPageHeader'

const ProspectPage = () => {
  const[filter,setFilter]=useState({status:"",search:""})
  const handleChangeFilter=(newFilter)=>{
    setFilter(newFilter)
  }
  return (
    <div className='w-full h-full flex flex-col '> 
    
    <div className='h-32 w-full'>
  <ProspectPageHeader onFilterChange={handleChangeFilter}/>
      
    </div>
    <div className='h-14 w-full  mr-7  bg-white rounded-t-2xl  pt-3 mb-1 '> <span className=' font-jakarta text-xl  font-bold size-6 ml-7 my-8 text-[#3A3541]'>Liste des prospects Building</span></div>
    <div>
      <ProspectsTable filter={filter}/>
    </div>
    </div>
  )
}

export default ProspectPage