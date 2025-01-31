import React, { useState } from 'react'
import ProspectInformationSection from './prospectInformationSection'
import MeetingsInfinityScroll from './MeetingsInfinityScroll'
import { useParams } from 'react-router-dom'

const ProspectDeatilsPage = () => {
  const[filters,setFilters]=useState({date:"",status:''})
  const{id}=useParams()
  return (
    <div className='h-full w-full flex flex-col'> 
    <div className=' flex flex-row items-center justify-center border-b-2 mb-3 border-[#BC983E]'>
      <span className=' font-jakarta text-l w-32  font-bold size-6  text-[#BC983E]'>Détails du client </span>
    </div>
    <div className='h-1/3 w-ful '><ProspectInformationSection/></div>
    <div className=' flex flex-row items-center justify-center border-b-2 my-3 border-[#BC983E]'>
      <span className=' font-jakarta text-l w-32  font-bold size-6  text-[#BC983E]'>Historique </span>
    </div>
    <div className='flex-1 w-full'>meetings table

      <MeetingsInfinityScroll filters={filters} id={id} />
    </div>
    
    </div>
  )
}

export default ProspectDeatilsPage