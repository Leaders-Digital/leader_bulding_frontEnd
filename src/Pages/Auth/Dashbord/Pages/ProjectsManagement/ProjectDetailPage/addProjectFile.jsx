import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import React from 'react'
import { toast } from 'react-toastify'

const AddProjectFile = ({id}) => {

    const modelTyepe="Project"
    const refId=id
   const backendUrl= `http://localhost:5000/api/file/addFile/${modelTyepe}/${refId}`

   const props={
    name:"file",
    action:backendUrl,
    onChange(info){
        const {status} = info.file
        if(status === "done"){
           
            toast.success("File uploaded")
        }else if(status === "error"){
            c
            toast.error("File upload failed")
        }
    },
    showUploadList:false
   }

  return (
    <div className='w-full h-24'>
        <Upload
        { ...props}
        >
            <Button icon={<UploadOutlined/>}>Upload File</Button>
        </Upload>
    </div>
  )
}

export default AddProjectFile