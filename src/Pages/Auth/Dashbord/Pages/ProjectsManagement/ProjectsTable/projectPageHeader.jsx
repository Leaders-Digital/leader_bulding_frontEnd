import { Icon } from '@iconify/react/dist/iconify.js'
import { Input, Modal, Select } from 'antd'
import React, { useState } from 'react'
import CreateProjectForm from '../../../../../../Forms/ProjectForms/createProjectForm'

const ProjectPageHeader = ({onFilterChange}) => {
    const[status,setStatus]=useState("")
    const[search,setSearch]=useState("")
    const [createModal,setCreateModal]=useState(false)

    const handleCreateModal=()=>{
        setCreateModal(true)
    }

    const handleCnacelCreate=()=>{
        setCreateModal(false)
    }

    const projstatus =[
        {
            value: 'Planification ',
            label: 'Planification ',
        },
        {
            value: 'En Cours',
            label: 'En Cours',
        },
        {
            value: 'Terminé ',
            label: 'Terminé ',
        },{
            value: 'En Pause',
            label: 'En Pause ',
        },{
            value: 'Annulé ',
            label: 'Annulé ',
        }
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
            <div className='mb-3 cursor-pointer' onClick={handleCreateModal}>
                <span className='font-jakarta text-3xl font-bold size-6 text-[#3A3541]'>Gestion projets</span>
            </div>
            <div className='h-full w-full flex flex-row justify-between'>
                <div className='flex flex-row gap-3 flex-grow'>
                    <div className='flex flex-col'> 
                        <label htmlFor="name" className='text-sm font-medium text-gray-700 mb-1'>Nom</label>
                        <Input className='h-12' onChange={handleSearchChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="status" className='text-sm font-medium text-gray-700 mb-1'>Status</label>
                        <Select className='h-12 w-40' options={projstatus} onChange={handleFilterChange} allowClear />
                    </div>
                </div>
                <div className='flex flex-row gap-2 mt-6'>
                    <button className='h-12 w-40 bg-transparent border-2 border-[#BC983E] rounded-lg hover:border-black hover:text-black'>
                        <div className='flex flex-row gap-1 ml-3 w-full h-full items-center'>
                            <Icon icon="hugeicons:square-arrow-down-02" width="24" height="24" style={{color:"#BC983E"}} />
                            <span className='font-jakarta font-bold text-base text-[#BC983E] hover:text-black'>Export excel</span>
                        </div>
                    </button>
                    <button className='h-12 w-58 bg-black rounded-lg border-2 border-black px-4 hover:bg-transparent hover:text-black' onClick={handleCreateModal}>
                        <div className='flex flex-row gap-1 justify-center'>
                            <Icon icon="hugeicons:add-square" width="24" height="24" style={{color:"#fff"}}/>
                            <span className='font-jakarta font-bold text-base text-white hover:text-black'>Ajouter un projet</span>
                        </div>
                    </button>
                </div>
            </div>
            <Modal
                title={<span className='font-jakarta text-xl font-bold size-6 ml-6 text-[#3A3541]'>Ajouter un projet</span>}
                open={createModal}
                onCancel={handleCnacelCreate}
                closeIcon={<Icon icon="hugeicons:cancel-circle" width="24" height="24" style={{color:"#F7D47A"}} />}
                width={"45rem"}
                bodyStyle={{
                    height: "47rem", 
                    overflowY:"auto",
                    paddingBottom:"2rem"
                }}
                footer={null}
            >
                <CreateProjectForm handleCancel={handleCnacelCreate}/>
            </Modal>
        </div>
    )
}

export default ProjectPageHeader