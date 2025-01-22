import React, { useEffect, useState } from 'react'
import userUsers from '../../../../../Hooks/useUsers'
import CostumTable from '../../../../../Components/Tabs/CostumTable'
import userscolumns from '../../../../../Utils/usersColums'
import { Skeleton } from 'antd'

const UsersTable = ({filter}) => {
    
    const[pagination,setPagination]=useState({current:1,pageSize:10})

    const{users,isLoading,error,totalPages,totalItems}=userUsers(filter,pagination)
    useEffect(()=>{setPagination((prevstate)=>({...prevstate,current:1}) )},[filter])
    const handleTableChange=(newPagination )=>{
      
      const updatedPagination = {
        current: newPagination?.current || pagination.current,
        pageSize: newPagination?.pageSize || pagination.pageSize,
      };
  
    
      console.log("New Pagination:", updatedPagination);
  
     
      setPagination(updatedPagination);
    
    }
    const currentPage = pagination.current>totalPages?totalPages:pagination.current
if(!isLoading)console.log("from table page ",users)
  return (
    <div className='w-full h-4/5 ' > {!isLoading?(<CostumTable
      columns={userscolumns}
      data={users}
      loading={isLoading}
      pagination={{
          current:currentPage,
          pageSize:pagination.pageSize,
          total:totalItems,
          onChange:(page,pageSize)=>{
            setPagination({current:page,pageSize})
          }
      
      }}
      onChange={handleTableChange}
      />):<Skeleton active paragraph={{rows:15}} className='mt-5 bg-white'/>}


    </div>
  )
}

export default UsersTable