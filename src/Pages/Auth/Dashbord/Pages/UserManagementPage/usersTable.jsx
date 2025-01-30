import React, { useEffect, useState } from 'react'
import userUsers from '../../../../../Hooks/useUsers'
import CostumTable from '../../../../../Components/Tabs/CostumTable'
import userscolumns from '../../../../../Utils/usersColums.jsx'
import { Modal, Skeleton } from 'antd'
import { Icon } from '@iconify/react/dist/iconify.js'
import ModifyUserForm from '../../../../../Forms/modifyUserForm.jsx'
import DeleteUser from './deleteUser.jsx'

const UsersTable = ({filter}) => {
    const [isModalEditVisible,setIsModalEditVisible]=useState()
    const[isModalArchivedVisible,setIsModalArchivedVisible]=useState()
    const [record ,setRecord]=useState()
    const[pagination,setPagination]=useState({current:1,pageSize:10})

    const{users,isLoading,error,totalPages,totalItems,usersMutation}=userUsers(filter,pagination)
    useEffect(()=>{setPagination((prevstate)=>({...prevstate,current:1}) )},[filter])
    const handleTableChange=(newPagination )=>{
      
      const updatedPagination = {
        current: newPagination?.current || pagination.current,
        pageSize: newPagination?.pageSize || pagination.pageSize,
      };
      setPagination(updatedPagination);
    }
    const currentPage = pagination.current>totalPages?totalPages:pagination.current
if(!isLoading)console.log("from table page ",users)
  
  const onActionClick=(action,record)=>{
 if(action ==="edit"){
  setRecord(record)
  setIsModalEditVisible(true) 
 }
 if(action ==="delete"){
  setRecord(record)
  setIsModalArchivedVisible(true)
 }
  }
  const hadnleCancel=()=>{
    setIsModalEditVisible(false)
     }
     const handleCancelArchived=()=>{
      setIsModalArchivedVisible(false)
     }
  return (
    <div className='w-full h-4/5 ' > {!isLoading?(<CostumTable
      columns={userscolumns({onActionClick})}
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

     <Modal
      title={<span className=' font-jakarta text-xl  font-bold size-6 ml-10 my-8 text-[#3A3541] '>Modifer un utilisateur </span>}
      open={isModalEditVisible}
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
      onCancel={hadnleCancel}
     >

      <ModifyUserForm user={record}/>
     </Modal>
     <Modal
     open={isModalArchivedVisible}
     closeIcon={<Icon icon="hugeicons:cancel-circle" width="24" height="24"  style={{color:"#FF2E2E"}} />}
       footer={null}
       width={"33rem"}
       centered={true}
       onCancel={handleCancelArchived}
     >
    <DeleteUser handleCancel={handleCancelArchived} user={record} usersMutation={usersMutation}/>
     </Modal>
    </div>
  )
}

export default UsersTable