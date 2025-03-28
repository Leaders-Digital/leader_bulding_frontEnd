import { UserOutlined } from '@ant-design/icons'
import { Avatar, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import ProfileUserForm from '../../../../../../Forms/profileUserForm'
import uploadFile from '../../../../../../Hooks/FileHooks/useUploadFile'
import { UseAuth } from '../../../../../../Contexts/AuthContext'
import { toast } from 'react-toastify'
import useFile from '../../../../../../Hooks/FileHooks/useFile'

const UserProfilePage = () => {
  const { user } = UseAuth()
  const { file, mutate } = useFile(user?.data?._id, 'User')
  const [imageUrl, setImageUrl] = useState(null)

  const handleUpload = async ({ file: uploadedFile }) => {
    try {
      await uploadFile({
        file: uploadedFile,
        modelType: 'User',
        refId: user?.data?._id
      })
      toast.success("The picture uploaded")
      mutate()
    } catch (e) {
      toast.error("The upload failed")
    }
  }

  useEffect(() => {
    if (file?.data && file.data.length > 0) {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const baseUrl = apiUrl.split('/api')[0]
      setImageUrl(`${apiUrl}/${file.data[0]?.FilePath}`)
    }
  }, [file])

  const handleImageError = () => {
    if (file?.data && file.data.length > 0) {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      const baseUrl = apiUrl.split('/api')[0]
      const filePath = file.data[0]?.FilePath

      if (imageUrl.includes(apiUrl)) {
        setImageUrl(`${baseUrl}${filePath}`)
      } else if (imageUrl === `${baseUrl}${filePath}`) {
        setImageUrl(`${baseUrl}/${filePath}`)
      }
    }
  }

  return (
    <div className='w-full h-full bg-white'>
      <div className='w-full h-40 ml-8'>
        <Upload
          showUploadList={false}
          customRequest={handleUpload}
          accept='image/png, image/jpeg'
        >
          <Avatar
            size={100}
            src={imageUrl}
            icon={!imageUrl && <UserOutlined />}
            style={{ cursor: "pointer" }}
            className='mt-10'
            onError={handleImageError}
          />
        </Upload>
      </div>
      <div className='h-full w-full'>
        <ProfileUserForm />
      </div>
    </div>
  )
}

export default UserProfilePage