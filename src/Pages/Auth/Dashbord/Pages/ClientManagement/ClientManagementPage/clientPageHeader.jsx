import React, { useState } from 'react'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Button, Input, Modal, Select } from 'antd'
import CreateProspectForm from '../../../../../../Forms/ProspecClientForms/createProspectForm'
import {useNavigate} from "react-router-dom";
const ClientPageHeader = ({onFilterChange}) => {
    const[status,setStatus]=useState("")
    const[search,setSearch]=useState("")
    const [createModal,setCreateModal]=useState(false)
    const navigate = useNavigate()
    const handleCreateModal=()=>{
      setCreateModal(true)
    }
    const handleCnacelCreate=()=>{
      setCreateModal(false)
    }
      const prostatus =[
          {
            value: 'pas encore de résultat',
            label: 'Pas encore de résultat',
          },
          {
            value: 'À rappeler',
            label: 'À rappeler',
          },
          {
              value: 'RDV',
              label: 'RDV',
            },{
              value: 'Pas intéressé',
              label: 'Pas intéressé',
            },{
              value: 'Injoignable',
              label: 'Injoignable',
            },{
              value: 'Reporter',
              label: 'Reporter',
            },
            {
              value: 'RDV annulé',
              label: 'RDV annulé',
            },
      
      ]
      const handleFilterChange=(value)=>{
        setStatus(value)
        
     onFilterChange( {status:value || '',search})
      }
      const handleSearchChange=(e)=>{
      const value= e.target.value
        setSearch(value)
        onFilterChange({status,search:value||''})
      }
    return (
      <div className='h-full w-full flex flex-col'>
          <div className=' mb-3'><span className=' font-jakarta text-3xl  font-bold size-6  text-[#3A3541]'>Gestion clients </span></div>
          <div className=' h-full w-full flex flex-row justify-between '>
              <div className='  flex flex-row gap-3 flex-grow'>
                 <div className='flex flex-col'> 
                  <label htmlFor="name" className=' text-sm font-medium text-gray-700 mb-1'> Nom et prénom</label>
                  <Input className='h-12'  onChange={handleSearchChange} />
                  </div>

                
              </div>
              <div className='flex flex-row gap-2 mt-6 '>  <button className=' h-12 w-40  bg-transparent border-2 border-[#BC983E] rounded-lg hover:border-black hover:text-black'>
                 <div className='flex flex-row gap-1 ml-3 w-full h-full  items-center'><Icon icon="hugeicons:square-arrow-down-02" width="24" height="24"  style={{color:"#BC983E"}} />
              <span className=' font-jakarta font-bold text-base text-[#BC983E] hover:text-black'>  Export excel</span></div>  </button>
              <button className='h-12 w-58 bg-black  rounded-lg border-2 border-black px-4 hover:bg-transparent  hover:text-black  ' onClick={()=>navigate('/gestionClient/client/ajouter')}> <div className='flex flex-row gap-1 justify-center'><Icon icon="hugeicons:add-square" width="24" height="24"  style={{color:"#fff"}}/> <span className='font-jakarta font-bold text-base text-white hover:text-black'>Ajouter un client</span></div> </button>
             
                           
              </div>
            
              <div></div>
          </div>
          <Modal
         title={<span className=' font-jakarta text-xl  font-bold size-6 ml-10 my-8 text-[#3A3541] '>Ajouter un prospect </span>}
          open={createModal}
          onCancel={handleCnacelCreate}
          closeIcon={<Icon icon="hugeicons:cancel-circle" width="24" height="24"  style={{color:"#F7D47A"}} />}
          width={"45rem"}
               bodyStyle={{
                height: "47rem", 
                padding: "1rem",
              
              }}
              footer={null}
          >
  
              <CreateProspectForm handleCancel={handleCnacelCreate}/>
          </Modal>
  
      </div>
    )
}

export default ClientPageHeader