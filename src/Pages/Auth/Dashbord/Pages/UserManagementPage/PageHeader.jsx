
import { Icon } from '@iconify/react/dist/iconify.js'
import { Button, Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import CreateUserForm from '../../../../../Forms/createUserForm'

const PageHeader = ({onFilterChange}) => {
  const[role,setRole]=useState("")
  const[search,setSearch]=useState("")
  const[isModalVisible,setIsModalVisible]=useState()
  const roles =[
    {
      value: 'user',
      label: 'User',
    },
    {
      value: 'admin',
      label: 'Admin',
    },
    
  ]
 const handleFilterchange=(value)=>{ 
 
  setRole(value)
  onFilterChange({role:value || '',search})
 }
 
  const handleSearchChange=(e)=>{
    const val =e.target.value
   
   setSearch(val)
    onFilterChange({role,search:val||''})
  }
  const showModal=()=>{
    setIsModalVisible(true)
  }
  const handleCancel=()=>{
    setIsModalVisible(false)
  }

  return (
    <div className='h-full w-full flex flex-col'>
        <div className=' mb-3'><span className=' font-jakarta text-3xl  font-bold size-6  text-[#3A3541]'>Gestion Utilisateurs </span></div>
        <div className=' h-full w-full flex flex-row justify-between '>
            <div className='  flex flex-row gap-3 flex-grow'>
               <div className='flex flex-col'> 
                <label htmlFor="name" className=' text-sm font-medium text-gray-700 mb-1'> Nom et prénom</label>
                <Input className='h-12'  onChange={handleSearchChange}/>
                </div>
                <div className='flex flex-col'><label htmlFor="status" className=' text-sm font-medium text-gray-700 mb-1'> Role</label>
                <Select className='h-12 w-40' options={roles} onChange={handleFilterchange} allowClear />
                </div>
              
            </div>
            <div className='flex flex-row gap-2 mt-6 '>  <button className=' h-12 w-40  bg-transparent border-2 border-[#BC983E] rounded-lg hover:border-black hover:text-black'>
               <div className='flex flex-row gap-1 ml-3 w-full h-full  items-center'><Icon icon="hugeicons:square-arrow-down-02" width="24" height="24"  style={{color:"#BC983E"}} />
            <span className=' font-jakarta font-bold text-base text-[#BC983E] hover:text-black'>  Export excel</span></div>  </button>
            <button className='h-12 w-48 bg-black  rounded-lg border-2 border-black hover:bg-transparent  hover:text-black ' onClick={showModal}> <div className='flex flex-row gap-1 justify-center'><Icon icon="hugeicons:add-square" width="24" height="24"  style={{color:"#fff"}}/> <span className='font-jakarta font-bold text-base text-white hover:text-black'>Ajouter un utilisateur</span></div> </button>
             <Modal 
             title={<span className=' font-jakarta text-xl  font-bold size-6 ml-10 my-8 text-[#3A3541] '>Ajouter un utilisateur </span>}
             open={isModalVisible}
             onCancel={handleCancel}
             closeIcon={<Icon icon="hugeicons:cancel-circle" width="24" height="24"  style={{color:"#F7D47A"}} />}
             footer={null}
             className="h-[50rem] w-[42rem] px-3 py-3"
             width={"45rem"}
             styles={{
              body:{
                height: "45rem", 
              padding: "1rem",
              }
            
            }}
             >
            <CreateUserForm
            handelCancel={handleCancel}
            />
             </Modal>
                         
            </div>
          
            <div></div>
        </div>

    </div>
  )
}

export default PageHeader