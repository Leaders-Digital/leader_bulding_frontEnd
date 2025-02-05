import { useDraggable } from '@dnd-kit/core'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Tag } from 'antd'
import React from 'react'

const Prospect = ({prospect,isOverlay}) => {
    const{attributes,listeners,setNodeRef,transform,isDragging}=useDraggable({id:prospect._id ,data:prospect})
    const showmsg=()=>{
        console.log("dddddddd")
    }
  return (
    <div
    ref={setNodeRef}
    {...listeners}
    {...attributes}
    className={`p-2 mt-2 bg-white rounded-md shadow cursor-pointer mr-3  ${
        isDragging ? "  opacity-0" : "relative"
    }` }
    style={{transform:transform?`translate(${transform.x}px,${transform.y}px)`:"none"}}

    >
        <div className='flex flex-col gap-3 mr-2'>
        <div className="flex flex-row items-center justify-between w-full">
  
    <div className="flex flex-row gap-3">
      <Icon icon="hugeicons:clock-01" width="24" height="24" style={{ color: "#d9d9d9" }} />
      <p className="text-sm text-gray-500">{prospect.createdAt.substring(0, 10)}</p>
    </div>

   
    <Icon icon="hugeicons:more-vertical-circle-01" width="24" height="24" style={{ color: "#3A3541" }} />
  </div>
         
    <h3 className='font-semibold font-jakarta text-[#3A3541] '>{prospect.name} {prospect.lastName}</h3>

    <Tag bordered={false} color="processing" className='w-40'>
        {prospect.status}
      </Tag>
   <p className='text-sm text-[#3A3541]'> <span className='text-[#3A3541] font-jakarta font-bold'>Email: </span> {prospect.email}</p>
    <p className='text-sm text-gray-500'> <span className='text-[#3A3541] font-jakarta font-bold'>Telephone:</span>  {prospect.telephone}</p>
  
        </div>

    </div>
  )
}

export default Prospect