import React, { useState } from 'react'
import ArchivedTable from './archivedTable'
import ArchivedPageHeader from './ArchivedPageHeader'


const ArchivedUserPage = () => {
const[filter,setFilter]=useState({role:'',search:""})

const handleFilterChange=(newfilter)=>{

    setFilter(newfilter)
}
  return (
    <div  className='h-full w-full flex flex-col'>
        
        <div className='w-full h-32 '><ArchivedPageHeader onFilterChange={handleFilterChange}/></div>
        <div className='h-14 w-full  mr-7  bg-white rounded-t-2xl pb-2 pt-3 mb-1 '> <span className=' font-jakarta text-xl  font-bold size-6 ml-7 my-8 text-[#3A3541]'>Liste des utilisateurs archivés Building</span></div>
        <div className='flex-1 w-full'>   <ArchivedTable filter={filter}/></div>
     
        </div>
  )
}
 
export default ArchivedUserPage