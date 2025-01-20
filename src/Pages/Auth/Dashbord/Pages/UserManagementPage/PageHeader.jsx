import { Input } from 'antd'
import React from 'react'

const PageHeader = () => {
  return (
    <div className='h-full w-full flex flex-col'>
        <div className=' mb-3'><span className=' font-jakarta text-3xl  font-bold size-6  text-[#3A3541]'>Gestion Utilisateurs </span></div>
        <div className=' h-full w-full flex flex-row'>
            <div className='  flex flex-row gap-3'>
               <div className='flex flex-col'>
                <label htmlFor="name" className=' text-sm font-medium text-gray-700 mb-1'> Nom et prénom</label>
                <Input className='h-12'/>
                </div>
                <div className='flex flex-col'><label htmlFor="status" className=' text-sm font-medium text-gray-700 mb-1'> Status</label>
                <Input className='h-12'/></div>
              
            </div>
            <div></div>
        </div>

    </div>
  )
}

export default PageHeader