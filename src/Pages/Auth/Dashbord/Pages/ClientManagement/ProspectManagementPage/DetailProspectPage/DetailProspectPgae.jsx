import React, { useEffect, useState } from 'react'
import PipelineHeader from './pipelineHeader'
import InfoProspect from './infoProspect'
import useProspect from '../../../../../../../Hooks/ProspectClientHooks/useProspect'
import { useParams } from 'react-router-dom'
import Axios from '../../../../../../../Config/Axios'
import { fetcher } from '../../../../../../../Config/SwrConfig'
import useSWR from 'swr'
import ActivitiesProspect from './activitiesProspect'

const DetailProspectPgae = () => {
  
  const{id}=useParams()
  
  console.log("the id ",id)
  const { data: prospect, error, isLoading } = useSWR(
    id ? `prospect/getById/${id}` : null, 
    fetcher
  )
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }
   console.log("error",error)
   console.log("prospect",prospect?.data)
  return (
    <div className='h-full w-full flex flex-col gap-3 '>
    <PipelineHeader prospect={prospect?.data}/>

    <InfoProspect prospect={prospect}/>
   <div className='flex flex-col w-full pb-4'>
   <div className=' flex flex-row items-center justify-center border-b-2 mb-3 border-[#BC983E] mt-5  '>
      <span className=' font-jakarta text-l w-36  font-bold size-6  text-[#BC983E]'>Affectation Equipe</span>
    </div>
     <div className='flex flex-col w-full h-[8.5rem] bg-white gap-3 p-3 rounded-lg'>
     <div className='flex flex-col'>
        <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] w-full">Responsable</span>
        <span>xxxxxxxxxx</span>
        </div>
        <div className='flex flex-col'>
        <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] w-full">Agent en suivi</span>
        <span>xxxxxxxx</span>
        </div>
     </div>
   </div>
<ActivitiesProspect id={id}/>
    </div>
  )
}

export default DetailProspectPgae