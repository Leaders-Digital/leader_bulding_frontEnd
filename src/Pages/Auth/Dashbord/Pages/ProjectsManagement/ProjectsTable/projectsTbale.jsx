
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useProjects from '../../../../../../Hooks/ProjectHooks/useProjects'
import CostumTable from '../../../../../../Components/Tabs/CostumTable'
import { Skeleton } from 'antd'
import projectColumns from '../../../../../../Utils/projectColumns'

const ProjectsTbale = ({filter}) => {
   
     const[record,setRecord]=useState('')
    const[modifyModal,setModifyModal]=useState()
    const[deleteModal,setDeleteModal]=useState()
    const navigate=useNavigate()
     const[pagination,setPagination]=useState({current:1,pageSize:10})
     const{projects,isLoading,totalItems,totalPages,mutate}=useProjects(filter,pagination)

           useEffect(()=>{
       
          setPagination((prevstate)=>({...prevstate,current:1}))
       
           },[filter])
           const handleTbaleChange=(newPagination)=>{
            const updatedPagination={
                current:newPagination?.current || pagination.current,
                pageSize:newPagination.pageSize || pagination.pageSize
            }
            setPagination(updatedPagination)
                }

                const currentPage=pagination.current>totalPages?totalPages:pagination.current
                const onActionClick=(action,record)=>{
                    if(action==="edit"){
                      setRecord(record)
                      setModifyModal(true)
                    }
                    if(action==="delete"){
                      setRecord(record)
                      setDeleteModal(true)
                    }
                    
                    }
                    const handleCancelModify=()=>{
                      setModifyModal(false)
                    }
                    const onClickDetails=(id)=>{
                      navigate(`/gestionProject/project/${id}`)
                    }
  return (
    <div className='w-full h-4/5' >
{!isLoading?<CostumTable
columns={projectColumns({onActionClick,onClickDetails})}

data={projects}
loading={isLoading}
pagination={{
    current:currentPage,
    pageSize:pagination.pageSize,
    total:totalItems,
    onchange:(page,pageSize)=>{
        setPagination({current:page,pageSize})
    }
}}
onChange={handleTbaleChange}
/>:<Skeleton active paragraph={{rows:15}} className='mt-5 bg-white'/>}
    </div>
  )
}

export default ProjectsTbale