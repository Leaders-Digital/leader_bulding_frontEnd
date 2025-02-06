import { useDraggable } from '@dnd-kit/core'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Dropdown, Space, Tag } from 'antd'
import React from 'react'

const Prospect = ({prospect,isOverlay}) => {
    const{attributes,listeners,setNodeRef,transform,isDragging}=useDraggable({id:prospect._id ,data:prospect})
    const showmsg=()=>{
        console.log("dddddddd")
    }
    const items=[ {key:"1",label:"Voir",icon:<Icon icon="hugeicons:eye" width="24" height="24" />},{key:'2',label:"Edit",icon:<Icon icon="hugeicons:pencil-edit-02" width="24" height="24" />,onClick:showmsg},{key:'3',label:"Delete",icon:<Icon icon="hugeicons:delete-02" width="24" height="24" style={{color:"#fb2424"}} />}]
  return (
    <div
    ref={setNodeRef}
 
    className={`p-2 mt-2 bg-white rounded-md shadow  mr-3  ${
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
   
   <Dropdown
   menu={{items}}
   >

<a onClick={(e) => e.preventDefault()}>
      <Space>
      <Icon icon="hugeicons:more-vertical-circle-01" width="24" height="24" style={{ color: "#3A3541" }} />
      </Space>
    </a>
   </Dropdown>
    
  </div>
         <div    {...listeners}
    {...attributes} className='flex flex-col h-full w-full gap-4 cursor-pointer'>

            <h3 className='font-semibold font-jakarta text-[#3A3541] '>{prospect.name} {prospect.lastName}</h3>

    <Tag bordered={false} color="processing" className='w-40'>
        {prospect.status}
      </Tag>
   <p className='text-sm text-[#3A3541]'> <span className='text-[#3A3541] font-jakarta font-bold'>Email: </span> {prospect.email}</p>
    <p className='text-sm text-gray-500'> <span className='text-[#3A3541] font-jakarta font-bold'>Telephone:</span>  {prospect.telephone}</p>
  
         </div>
  
        </div>

    </div>
  )
}

export default Prospect