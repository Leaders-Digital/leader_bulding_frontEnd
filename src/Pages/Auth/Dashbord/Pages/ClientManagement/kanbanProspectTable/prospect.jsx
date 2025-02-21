import { useDraggable } from '@dnd-kit/core'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Dropdown, Space, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Prospect = ({prospect,isOverlay}) => {
    const{attributes,listeners,setNodeRef,transform,isDragging}=useDraggable({id:prospect._id ,data:prospect})
    const navigate=useNavigate()
    const showmsg=()=>{
        console.log("dddddddd")
        console.log('ff',prospect._id)
    }
    const viewDetails=()=>{
      navigate(`/gestionClient/prospect/${prospect._id}`)
    }
    const items=[ {key:"1",label:"Voir",icon:<Icon icon="hugeicons:eye" width="24" height="24" />,onClick:viewDetails},{key:'2',label:"Edit",icon:<Icon icon="hugeicons:pencil-edit-02" width="24" height="24" />,onClick:showmsg},{key:'3',label:"Delete",icon:<Icon icon="hugeicons:delete-02" width="24" height="24" style={{color:"#fb2424"}} />}]

    const getTagColor=(status)=>{
switch (status){
  case "Nouveau lead": return "processing"
  case "A qualifie" :return "gold"
  case "Contact Effectué":return "success"
  case "En discussion" :return"processing"
  case "Relance" :return "gold"
  case "Proposition envoyeé" :return "processing"
  case "En discussion" :return "processing"
  case "Négociation en cours" :return "gold"
  case "En attente de validation" :return"success"
  case "Deal approuvé" :return "gold"
  case "Contract signé" :return "success"
  case "Paiement reçu" :return "success"
  case "Perdu":return "red"
  case "Sans Réponse":return "gold"
  case "changement de projet":return "gold"
  default:
    return 'processing';
}
    }
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

    <Tag bordered={false} color={getTagColor(prospect.status)} className='w-fit'>
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