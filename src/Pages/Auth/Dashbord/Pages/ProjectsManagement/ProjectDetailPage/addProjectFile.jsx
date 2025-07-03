import {UploadOutlined} from '@ant-design/icons'
import {Button, message, Upload} from 'antd'
import React from 'react'
import {toast} from 'react-toastify'
import useFile from '../../../../../../Hooks/FileHooks/useFile'
import {UseAuth} from '../../../../../../Contexts/AuthContext'

const AddProjectFile = ({id}) => {
    const {mutate} = useFile(id, "Project")
    const {user} = UseAuth()
    const modelTyepe = "Project"
    const refId = id
    const backendUrl = `${import.meta.env.VITE_API_URL || 'https://serveur.leaders-building.com/api'}/file/addFile/${modelTyepe}/${refId}`

    const props = {
        name: "file",
        action: backendUrl,
        headers: {
            'Authorization': `Bearer ${user?.token}`,
        },
        beforeUpload: (file) => {
            const isLt100M = file.size / 1024 / 1024 < 100;
            if (!isLt100M) {
                message.error('File must be smaller than 100MB!');
                return false;
            }
            return true;
        },
        onChange(info) {
            const {status} = info.file
            if (status === "done") {
                toast.success("File uploaded successfully")
                mutate()
            } else if (status === "error") {
                console.error("Upload error:", info.file.error)
                toast.error("File upload failed. Please try again.")
            } else if (status === "uploading") {
                console.log("Uploading...", info.file.percent)
            }
        },
        showUploadList: false,
        accept: ".jpg,.png,.jpeg,.pdf,.xlsx"
    }

    return (
        <div className=' h-24'>
            <Upload
                {...props}
            >
                <Button icon={<UploadOutlined/>}><span className='font-jakarta font-semibold  text-[#3A3541]'>Upload File</span>
                </Button>
            </Upload>
        </div>
    )
}

export default AddProjectFile