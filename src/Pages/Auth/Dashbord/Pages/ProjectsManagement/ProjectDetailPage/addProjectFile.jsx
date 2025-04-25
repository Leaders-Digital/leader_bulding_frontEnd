import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import React from 'react'
import { toast } from 'react-toastify'
import useFile from '../../../../../../Hooks/FileHooks/useFile'

const AddProjectFile = ({id}) => {
const{mutate}=useFile(id,"Project")
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
            mutate()
        }else if(status === "error"){
            
            toast.error("File upload failed")
        }
    },
    showUploadList:false
   }

  return (
    <div className=' h-24'>
        <Upload
        { ...props}
        >
            <Button icon={<UploadOutlined/>}><span className='font-jakarta font-semibold  text-[#3A3541]'>Upload File</span> </Button>
        </Upload>
    </div>
  )
}

export default AddProjectFile