import React, { useEffect, useState } from 'react'
import useProspects from '../../../../../../Hooks/ProspectClientHooks/useProspects'
import CostumTable from '../../../../../../Components/Tabs/CostumTable'
import { Modal, Skeleton } from 'antd'
import prospectColumns from '../../../../../../Utils/ProspectManagementColumns/prospectColumns'
import ModifyProspectForm from '../../../../../../Forms/ProspecClientForms/modifyProspectForm'
import DeleteProspect from './deleteProspect'
import { useNavigate } from 'react-router-dom'


const ProspectsTable = ({filter}) => {
  const[record,setRecord]=useState('')
  const[modifyModal,setModifyModal]=useState()
  const[deleteModal,setDeleteModal]=useState()
const navigate=useNavigate()
  const[pagination,setPagination]=useState({current:1,pageSize:10})
 
    const{prospects,isLoading,totalItems,totalPages,error,mutate}=useProspects(filter,pagination)
   
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
  navigate(`/gestionClient/prospect/${id}`)
}
  return (
    <div className='w-full h-4/5'>
{!isLoading?<CostumTable
columns={prospectColumns({onActionClick,onClickDetails})}
data={prospects}
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
<Modal
title={<span className=' font-jakarta text-xl  font-bold size-6 ml-10 my-8 text-[#3A3541] '>Modifer un prospect </span>}
open={modifyModal}
footer={null}
className="h-[42rem] w-[42rem] px-3 py-3"
width={"45rem"}
bodyStyle={{
 height: "43rem", 
 padding: "1rem",
}}
onCancel={handleCancelModify}
>
<ModifyProspectForm prospect={record} prospectMutation={mutate} handelCancel={handleCancelModify}/>
</Modal>

<Modal
open={deleteModal}
footer={null}
className="h-[50rem] w-[42rem] px-3 py-3"
width={"35rem"}
centered={true}
onCancel={()=>setDeleteModal(false)}

>
  <DeleteProspect prospect={record} handleCancel={setDeleteModal} prospectsMutation={mutate}/>
</Modal>
    </div>
  )
}

export default ProspectsTable