import React, { useEffect, useState } from 'react'
import userUsers from '../../../../../Hooks/useUsers'
import CostumTable from '../../../../../Components/Tabs/CostumTable'
import userscolumns from '../../../../../Utils/usersColums'
import { Skeleton } from 'antd'

const UsersTable = () => {
    const[filter,setFilter]=useState("")
    const[pagination,setPagination]=useState({current:1,pageSize:10})

    const{users,isLoading,error,totalPages,totalItems}=userUsers(filter,pagination)
    useEffect(()=>{setPagination((prevstate)=>({...prevstate,current:1}) )},[filter])
    const handleTableChange=(newPagination ,filters)=>{
      let selectedFilter=""
     
      if (filters){  selectedFilter = filters?.role ?filters.role[0]:""}
    console.log("filters",filters)
    console.log("new pagination",newPagination)
     setFilter(selectedFilter)
    setPagination({current:newPagination?.current || 1 ,pageSize:newPagination.pageSize|| 10 })
    
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