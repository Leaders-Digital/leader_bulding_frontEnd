import React, { useEffect, useState } from 'react'
import useProspects from '../../../../../../Hooks/ProspectClientHooks/useProspects'
import CostumTable from '../../../../../../Components/Tabs/CostumTable'
import { Skeleton } from 'antd'
import prospectColumns from '../../../../../../Utils/ProspectManagementColumns/prospectColumns'

const ProspectsTable = () => {
  const[pagination,setPagination]=useState({current:1,pageSize:10})
  const[filter,setFilter]=useState({search:""})
    const{prospects,isLoading,totalItems,totalPages,error}=useProspects(filter,pagination)
   
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

  return (
    <div className='w-full h-4/5'>
{!isLoading?<CostumTable
columns={prospectColumns()}
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

    </div>
  )
}

export default ProspectsTable