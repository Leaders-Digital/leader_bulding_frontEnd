
import { Icon } from '@iconify/react/dist/iconify.js'
import { Modal } from 'antd'
import React, { useState } from 'react'
import CreateActivitie from '../../../../../../../Forms/ProspecClientForms/ActivitesForms/createActivitie'
import UpcomingActivities from './upcomingActivities'

const ActivitiesProspect = ({id}) => {
    const[openModal,setOpenModal]=useState()
  return (
    <div className='flex-1 w-full flex flex-col'>
        <button className='h-14 w-full flex flex-row items-center justify-center bg-[#F7D47A] rounded-full gap-2 '  onClick={()=>setOpenModal(true)}>
        <Icon icon="hugeicons:plus-sign-circle" width="24" height="24" /> 
        <span className='font-jakarta font-semibold'>Planifier une activitée</span>
        </button>

        <div className='flex flex-col gap-2 mt-5'>
        <div className=' flex flex-row items-center justify-center border-b-2 mb-3 border-[#BC983E] '>
      <span className=' font-jakarta text-l w-52 ml-14   font-bold size-6  text-[#BC983E]'>Activités planifiées</span>
    </div>
        </div>
<UpcomingActivities id={id} />
<div className=' flex flex-row items-center justify-center border-b-2 mb-3 mt-5 border-[#BC983E] '>
      <span className=' font-jakarta text-l w-52 ml-14   font-bold size-6  text-[#BC983E]'>Activités Passées</span>
    </div>
      <Modal
    title={<span className=' font-jakarta text-xl  font-bold size-6 ml-3 my-8 text-[#3A3541] '>Planifier une activité</span>}
    centered={true}
    width={"45rem"}
    open={openModal}
    footer={null}
    onCancel={()=>setOpenModal(false)}
    className="h-[50rem] w-[42rem] px-3 py-3"
            
      >
  <CreateActivitie  prospect={id} openModal={setOpenModal}/>
      </Modal>
    </div>

  )
}

export default ActivitiesProspect