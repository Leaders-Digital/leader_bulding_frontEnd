import React, { useEffect, useState } from 'react'
import useArchivedUsers from '../../../../../Hooks/useArchivedUsers'
import CostumTable from '../../../../../Components/Tabs/CostumTable'
import { Modal, Skeleton } from 'antd'
import archivedUsersColumns from '../../../../../Utils/archivedUsersColumns'
import ArchivesModalContent from './archivesModalContent'
import { Icon } from '@iconify/react/dist/iconify.js'

const ArchivedTable = ({filter}) => {
    const[record,setRecord]=useState()
    const[modalVisible,setModalVisible]=useState(false)
    const {archivedUsers,totalItems,totalPages,error,isLoading,mutate}=useArchivedUsers(filter)
    const [pagination,setPagination]=useState({current:1,pageSize:10})
    useEffect(()=>{ setPagination((prevstate)=>({...prevstate,current:1}))} ,[filter])

    const handleTableChange=(newPagination)=>{
    UpdatedPagination={
        current:newPagination?.current||pagination.current,
        pagesize:newPagination?.pageSize || pagination.pageSize
    }
    setPagination(UpdatedPagination)

    }
    const currentPage= pagination.current>totalPages?totalPages:pagination.current
  if(!isLoading)  console.log("archived users",archivedUsers)
     const onActionClick=(record)=>{
   setRecord(record)
setModalVisible(true)

    }
    const handleCancelModal=()=>{
        setModalVisible(false)
    }
  return (
    <div className='w-full h-4/5'>{!isLoading?(<CostumTable
    columns={archivedUsersColumns({onActionClick})}
    data={archivedUsers}
    pagination={{
        current:currentPage,
        pageSize:pagination.pageSize,
        total:totalItems,
        onChange:(page,pageSize)=>{
            setPagination({current:page,pageSize})
        }
    }}
    onChange={handleTableChange}
    />):<Skeleton active paragraph={{rows:15}} className='mt-5 bg-white '/>}
    
    <Modal
    visible={modalVisible}
      closeIcon={<Icon icon="hugeicons:cancel-circle" width="24" height="24"  style={{color:"#FF2E2E"}} />}
           footer={null}
           width={"33rem"}
           centered={true}
           onCancel={handleCancelModal}
    >

        <ArchivesModalContent  user={record} handleCancel={handleCancelModal} usersMutation={mutate} />
    </Modal>
    
    </div>
  )
}

export default ArchivedTable