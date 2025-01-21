
import { Icon } from '@iconify/react/dist/iconify.js'
import { Button, Input } from 'antd'
import React from 'react'

const PageHeader = () => {
  return (
    <div className='h-full w-full flex flex-col'>
        <div className=' mb-3'><span className=' font-jakarta text-3xl  font-bold size-6  text-[#3A3541]'>Gestion Utilisateurs </span></div>
        <div className=' h-full w-full flex flex-row justify-between '>
            <div className='  flex flex-row gap-3 flex-grow'>
               <div className='flex flex-col'> 
                <label htmlFor="name" className=' text-sm font-medium text-gray-700 mb-1'> Nom et prénom</label>
                <Input className='h-12'/>
                </div>
                <div className='flex flex-col'><label htmlFor="status" className=' text-sm font-medium text-gray-700 mb-1'> Status</label>
                <Input className='h-12'/></div>
              
            </div>
            <div className='flex flex-row gap-2 mt-6 '>  <button className=' h-12 w-40  bg-transparent border-2 border-[#BC983E] rounded-lg hover:border-black hover:text-black'>
               <div className='flex flex-row gap-1 ml-3 w-full h-full  items-center'><Icon icon="hugeicons:square-arrow-down-02" width="24" height="24"  style={{color:"#BC983E"}} />
            <span className=' font-jakarta font-bold text-base text-[#BC983E] hover:text-black'>  Export excel</span></div>  </button>
            <button className='h-12 w-44 bg-black  rounded-lg border-2 border-black  hover:bg-transparent  hover:text-black '> <div className='flex flex-row gap-1 justify-center'><Icon icon="hugeicons:add-square" width="24" height="24"  style={{color:"#fff"}}/> <span className='font-jakarta font-bold text-base text-white hover:text-black'>Ajouter un client</span></div> </button>
            </div>
          
            <div></div>
        </div>

    </div>
  )
}

export default PageHeader