import { UserOutlined } from '@ant-design/icons'
import { Avatar, Upload } from 'antd'
import React from 'react'
import ProfileUserForm from '../../../../../../Forms/profileUserForm'

const UserProfilePage = () => {
  return (
    <div className='w-full h-full bg-white'>

        <div className='w-full h-40  ml-8'>
       <Upload
       showUploadList={false}
       
       >
        <Avatar size={100} icon={<UserOutlined/>} style={{cursor:"pointer"}} className='mt-10'/>

        
        </Upload> 

        </div>
        <div className='h-full w-full'>
          <ProfileUserForm/>
        </div>
    </div>
    
  )
}


export default UserProfilePage