import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import useProjects from '../../../../../../Hooks/ProjectHooks/useProjects'
import CostumTable from '../../../../../../Components/Tabs/CostumTable'
import {Modal, Skeleton} from 'antd'
import projectColumns from '../../../../../../Utils/projectColumns'
import {Icon} from "@iconify/react";
import ModifyProjectForm from "../../../../../../Forms/ProjectForms/modifyProjectForm.jsx";
import DeleteProject from "./deleteProject.jsx";

const ProjectsTable = ({filter}) => {

    const [record, setRecord] = useState('')
    const [modifyModal, setModifyModal] = useState()
    const [deleteModal, setDeleteModal] = useState()
    const navigate = useNavigate()
    const [pagination, setPagination] = useState({current: 1, pageSize: 10})
    const {projects, isLoading, totalItems, totalPages, mutate: refreshProjects} = useProjects(filter, pagination)


    useEffect(() => {
        setPagination(prevState => ({...prevState, current: 1}))
    }, [filter])

    useEffect(() => {
        // Ensure current page is valid when totalPages changes
        if (totalPages > 0 && pagination.current > totalPages) {
            setPagination(prevState => ({...prevState, current: totalPages}))
        }
    }, [totalPages, pagination.current])

    const handleTableChange = (newPagination) => {
        setPagination({
            current: newPagination.current || pagination.current,
            pageSize: newPagination.pageSize || pagination.pageSize
        })
    }

    const onActionClick = (action, record) => {
        if (action === "edit") {
            setRecord(record)
            setModifyModal(true)
        }
        if (action === "delete") {
            setRecord(record)
            setDeleteModal(true)
        }
    }

    const handleCancelModify = () => {
        setModifyModal(false)
    }

    const handleCancelDelete = () => {
        setDeleteModal(false)
    }

    const handleProjectDeleted = () => {

        // Add a small delay to ensure backend deletion is complete
        setTimeout(() => {
            refreshProjects()
        }, 500)
    }

    const onClickDetails = (id) => {
        navigate(`/gestionProject/project/${id}`)
    }

    return (
        <div className='w-full h-4/5'>
            {!isLoading ? <CostumTable
                columns={projectColumns({onActionClick, onClickDetails})}
                data={projects}
                loading={isLoading}
                pagination={{
                    current: pagination.current,
                    pageSize: pagination.pageSize,
                    total: totalItems,
                }}
                onChange={handleTableChange}
            /> : <Skeleton active paragraph={{rows: 15}} className='mt-5 bg-white'/>}
            <Modal
                title={<span
                    className=' font-jakarta text-xl  font-bold size-6 ml-6  text-[#3A3541] '>Modifer un projet </span>}
                open={modifyModal}
                closeIcon={<Icon icon="hugeicons:cancel-circle" width="24" height="24" style={{color: "#F7D47A"}}/>}
                footer={null}
                width={"45rem"}
                style={{top: 50}}
                bodyStyle={{
                    height: "44rem",
                    overflowY: "auto",

                }}
                onCancel={handleCancelModify}
            >

                <ModifyProjectForm project={record} refreshProjects={refreshProjects}
                                   handleCancel={handleCancelModify}/>
            </Modal>
            <Modal
                open={deleteModal}
                closeIcon={<Icon icon="hugeicons:cancel-circle" width="24" height="24" style={{color: "#FF2E2E"}}/>}
                footer={null}
                width={"33rem"}
                centered={true}
                onCancel={handleCancelDelete}
            >
                <DeleteProject handleCancel={handleCancelDelete} project={record}
                               onProjectDeleted={handleProjectDeleted}/>
            </Modal>
        </div>
    )
}

export default ProjectsTable