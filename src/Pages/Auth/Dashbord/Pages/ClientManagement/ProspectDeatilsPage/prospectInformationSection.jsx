
import { Icon } from '@iconify/react/dist/iconify.js'
import { Alert, Modal, Spin, Tag } from 'antd'
import React, { useState } from 'react'
import DynamicInfo from '../../../../../../Components/Sections/DynamicInfo'
import useProspect from '../../../../../../Hooks/ProspectClientHooks/useProspect'
import { useParams } from 'react-router-dom'
import BecomClientForm from './becomClientForm'

const ProspectInformationSection = () => {
   const{id}=useParams()
   const {prospect,error,isLoading}=useProspect(id)
  const[becomeClientModal,setBecomeClientModal]=useState()
   if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Spin size="large" />
      </div>
    );
  }
  if (!prospect) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Alert message="No prospect data available" type="warning" showIcon />
      </div>
    );
  }
 

  
  const prospectInfo = {
    name: prospect?.data?.name,
    lastName: prospect?.data?.lastName,
    email: prospect?.data?.email,
    telephone: prospect?.data?.telephone,
  };
 
  return (
    <div className='h-full w-full   flex flex-col bg-white p-3 pt-6 rounded-xl'>
      <div className='h-24 w-full flex flex-row justify-between' >
        <div className='flex flex-col w-1/2 gap-3'>
        <span className=' font-jakarta text-2xl  font-bold size-6   text-[#3A3541] w-full'>Sleh dine bouchoucha</span>
        <Tag bordered={false} color='error' className=' w-24'>Prospect</Tag>
        </div>
        <div className='flex flex-row gap-3'>
            <button className='h-12 w-12 bg-[#BC983E] rounded-lg'><span className='flex flex-row justify-center justify-items-center'><Icon icon="hugeicons:message-02" width="24" height="24"  style={{color: "#fff"}} /></span></button>
            <button className='h-12 w-12 bg-[#BC983E] rounded-lg'><span className='flex flex-row justify-center justify-items-center'><Icon icon="hugeicons:call-02" width="24" height="24"  style={{color: "#fff"}} /></span></button>
            <button className='h-12 w-28 bg-[#3A3541] rounded-lg flex flex-row items-center justify-center  gap-1' > <Icon icon="hugeicons:edit-user-02" width="24" height="24"  style={{color: "#fff"}} /> <span className=' text-white'>Modifier</span></button>
        </div>
      </div>
      <span className=' font-jakarta text-xl  font-bold size-6  text-[#3A3541] w-full'>Informations personnelles</span>
     <DynamicInfo data={prospectInfo}/>
     <button className='h-12 w-44 bg-[#3A3541] rounded-lg flex flex-row items-center justify-center mt-4 gap-1' onClick={()=>setBecomeClientModal(true)}> <Icon icon="hugeicons:checkmark-circle-04" width="24" height="24"  style={{color: "#fff"}} /> <span className=' text-white font-jakarta   font-bold '>Valider comme client </span></button>

     <Modal
     visible={becomeClientModal}
     footer={null}
     className="h-[50rem] w-[42rem] px-3 py-3"
  width={"35rem"}
  centered={true}
  onCancel={()=>setBecomeClientModal(false)}
     >
        <BecomClientForm prospectId={id} handleCancel={setBecomeClientModal}/>
     </Modal>
    </div>
  )
}

export default ProspectInformationSection