import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const PipelineHeader = () => {
  return (
    <div className='flex flex-row  justify-between  w-full h-[4.5rem] bg-[#F7D47A] bg-opacity-50  items-center px-12  rounded-full '>
      
   <div className=' flex flex-row  gap-2 justify-between'>
   <Icon icon="hugeicons:ai-user" width="24" height="24" />
<button className='font-jakarta text-lg  font-bold size-6  text-[#3A3541] w-[6.5rem]'>  Prospection </button>
   </div>
   <div className='flex flex-row  '>
   <Icon icon="hugeicons:call-02" width="24" height="24" />
     <button className='font-jakarta text-lg  font-bold size-6  text-[#3A3541] w-[9rem]'>Suivi et relance</button>
   
   </div>
   <div className='flex flex-row '>
    <div className='pt-4'><Icon icon="hugeicons:save-money-dollar" width="24" height="24" /></div>
    <div>
     <button className='font-jakarta text-lg  font-bold size-6  text-[#3A3541] w-[10.5rem]'>Facturation 
   et négociation</button></div> 
    </div>
   <div className='flex flex-row  gap-2 items-center'>
   <Icon icon="hugeicons:agreement-02" width="24" height="24" />
     <button className='font-jakarta text-lg  font-bold size-6  text-[#3A3541] w-[6rem]'>Conversion</button></div>
   <div className='flex flex-row '>
   <Icon icon="hugeicons:sad-01" width="24" height="24" />
    <button className='font-jakarta text-lg  font-bold size-6  text-[#3A3541] w-[6.5rem]'>Abandon</button></div>
    </div>
  )
}

export default PipelineHeader