import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const PipelineHeader = ({prospect}) => {

  return (
    <div className='flex flex-row  justify-between  w-full h-[8rem] bg-[#F7D47A] bg-opacity-50  items-center px-10 py-2  rounded-full '>
      
   <div className= {`flex flex-row rounded-lg h-[3rem] items-center ml-2 w-[14rem] justify-center ${prospect?.stage==="prospection"?"bg-[#F7D47A]":null}` }>
   <Icon icon="hugeicons:ai-user" width="24" height="24"  className='mr-2'/>
<button className='font-jakarta text-lg  font-bold size-6  text-[#3A3541] w-[6.5rem]'>  Prospection </button>

   </div>
   <Icon icon="hugeicons:arrow-right-01" width="35" height="35" className=' font-bold' />
   <div className= {`flex flex-row rounded-lg h-[3rem] items-center ml-2 w-[14rem] justify-center ${prospect?.stage==="suivi"?"bg-[#F7D47A]":null}` }>
   <Icon icon="hugeicons:call-02" width="24" height="24" />
     <button className='font-jakarta text-lg  font-bold size-6  text-[#3A3541] w-[9rem]'>Suivi et relance</button>
   
   </div>
   <Icon icon="hugeicons:arrow-right-01" width="35" height="35" className=' font-bold' />
   <div className= {`flex flex-row rounded-lg h-[3rem] items-center ml-2 w-[14rem] justify-center ${prospect?.stage==="factorisation"?"bg-[#F7D47A]":null}` }>
    <div className='pt-4'><Icon icon="hugeicons:save-money-dollar" width="24" height="24" /></div>
    <div>
     <button className='font-jakarta text-lg  font-bold size-6  text-[#3A3541] w-[10.5rem]'>Facturation 
   et négociation</button></div> 
    </div>
    <Icon icon="hugeicons:arrow-right-01" width="35" height="35" className=' font-bold' />
   <div className= {`flex flex-row rounded-lg h-[3rem] items-center ml-2 w-[14rem] justify-center ${prospect?.stage==="conversion"?"bg-[#F7D47A]":null}` }>
   <Icon icon="hugeicons:agreement-02" width="24" height="24" />
     <button className='font-jakarta text-lg  font-bold size-6  text-[#3A3541] w-[6rem]'>Conversion</button></div>
     <Icon icon="hugeicons:arrow-right-01" width="35" height="35" className=' font-bold' />
   <div className= {`flex flex-row rounded-lg h-[3rem] items-center ml-2 w-[14rem] justify-center ${prospect?.stage==="abondon"?"bg-[#F7D47A]":null}` }>
   <Icon icon="hugeicons:sad-01" width="24" height="24" />
    <button className='font-jakarta text-lg  font-bold size-6  text-[#3A3541] w-[6.5rem]'>Abandon</button></div>
    </div>
  )
}

export default PipelineHeader