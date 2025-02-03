import { useDraggable } from '@dnd-kit/core'
import React from 'react'

const Prospect = ({prospect}) => {
    const{attributes,listeners,setNodeRef,transform,isDragging}=useDraggable({id:prospect._id})
    const showmsg=()=>{
        console.log("dddddddd")
    }
  return (
    <div
    ref={setNodeRef}
    {...listeners}
    {...attributes}
    className={`p-2 mt-2 bg-white rounded-md shadow cursor-pointer mr-3  ${
        isDragging ? "absolute z-50" : "relative"
    }`}
    style={{transform:transform?`translate(${transform.x}px,${transform.y}px)`:"none"}}

    >
        <div className='flex flex-col gap-3 mr-3'>
    <h3 className='font-semibold font-jakarta text-[#3A3541] '>{prospect.name} {prospect.lastName}</h3>
    <p className='text-sm text-gray-500'>Email: {prospect.email}</p>
    <p className='text-sm text-gray-500'>Telephone: {prospect.telephone}</p>
  <button onClick={(e)=>{e.stopPropagation();showmsg()}}> hiiiiiiii</button>
        </div>

    </div>
  )
}

export default Prospect