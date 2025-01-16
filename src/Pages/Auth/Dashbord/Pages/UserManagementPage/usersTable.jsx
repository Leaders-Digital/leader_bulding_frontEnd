import React, { useState } from 'react'
import userUsers from '../../../../../Hooks/useUsers'
import CostumTable from '../../../../../Components/Tabs/CostumTable'
import userscolumns from '../../../../../Utils/usersColums'

const UsersTable = () => {
    const[filter,setFilter]=useState("")
    const[pagination,setPagination]=useState({current:1,pageSize:10})

    const{users,isLoading,error,totalPages}=userUsers(filter,pagination)
    const handleTableChange=(pagination ,filters)=>{
       console.log("from antdesing",filters.role)
      const selectedFilter = filters.role ?filters.role[0]:""
     setFilter(selectedFilter)
     setPagination({
        current:pagination.current,
        pageSize:pagination.pageSize
     })
    }
if(!isLoading)console.log("from table page ",users)
  return (
    <div className='w-full h-full overflow-hidden' > {!isLoading?(<CostumTable
      columns={userscolumns}
      data={users}
      loading={isLoading}
      pagination={{
          current:pagination.current,
          pageSize:pagination.pageSize,
          total:totalPages*pagination.pageSize,
          onchange:handleTableChange
      
      }}
      onChange={handleTableChange}
      />):null}


    </div>
  )
}

export default UsersTable