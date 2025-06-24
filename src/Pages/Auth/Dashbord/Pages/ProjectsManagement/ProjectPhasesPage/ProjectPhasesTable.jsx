import React, {useEffect, useState} from 'react';
import {message, Modal, Skeleton} from 'antd';
import {Icon} from "@iconify/react";
import ProjectPhasesColumns from '../../../../../../Utils/ProjectPhasesColumns';
import useProjectPhases from '../../../../../../Hooks/ProjectPhases/useProjectPhases';
import CostumTable from '../../../../../../Components/Tabs/CostumTable';
import DeleteProjectPhase from './deleteProjectPhase';
import ModifyProjectPhase from '../ProjectDetailPage/Components/modifyProjectPhase.jsx';

const ProjectPhasesTable = ({filter, projects = []}) => {
    const [record, setRecord] = useState('');
    const [modifyModal, setModifyModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [pagination, setPagination] = useState({current: 1, pageSize: 10});

    const {data: phases, loading, error, refetch} = useProjectPhases(filter, pagination);

    useEffect(() => {
        setPagination((prevstate) => ({...prevstate, current: 1}));
    }, [filter]);

    const handleTableChange = (newPagination) => {
        const updatedPagination = {
            current: newPagination?.current || pagination.current,
            pageSize: newPagination.pageSize || pagination.pageSize
        };
        setPagination(updatedPagination);
    };

    const handleActionClick = (action, record) => {
        if (action === "edit") {
            setRecord(record);
            setModifyModal(true);
        }
        if (action === "delete") {
            setRecord(record);
            setDeleteModal(true);
        }
    };

    const handleCancelModify = () => {
        setModifyModal(false);
        setRecord('');
    };

    const handleCancelDelete = () => {
        setDeleteModal(false);
        setRecord('');
    };

    if (error) {
        message.error('Erreur lors du chargement des phases du projet');
    }

    const filteredData = React.useMemo(() => {
        if (!phases) return [];
        if (!filter?.search) return phases;

        const searchTerm = filter.search.toLowerCase();

        return phases.filter(phase => {
            const phaseNameMatch = phase.name?.toLowerCase().includes(searchTerm);

            let projectName = '';

            if (phase.projectId && typeof phase.projectId === 'object' && phase.projectId.name) {
                projectName = phase.projectId.name;
            } else if (phase.project && typeof phase.project === 'object' && phase.project.name) {
                projectName = phase.project.name;
            } else if (phase.projectId && typeof phase.projectId === 'string') {
                const project = projects.find(p => p._id === phase.projectId);
                projectName = project?.name || '';
            }

            const projectNameMatch = projectName.toLowerCase().includes(searchTerm);

            return phaseNameMatch || projectNameMatch;
        });
    }, [phases, filter?.search, projects]);

    const paginatedData = React.useMemo(() => {
        return filteredData.slice(
            (pagination.current - 1) * pagination.pageSize,
            pagination.current * pagination.pageSize
        );
    }, [filteredData, pagination.current, pagination.pageSize]);

    return (
        <div className='w-full h-4/5'>
            {!loading ? (
                <CostumTable
                    columns={ProjectPhasesColumns({onActionClick: handleActionClick, projects})}
                    data={paginatedData}
                    loading={loading}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: filteredData.length,
                        showSizeChanger: false,
                        onChange: (page, pageSize) => {
                            setPagination({current: page, pageSize});
                        }
                    }}
                    onChange={handleTableChange}
                />
            ) : (
                <Skeleton active paragraph={{rows: 15}} className='mt-10 bg-white'/>
            )}

            <ModifyProjectPhase
                isOpen={modifyModal}
                onClose={handleCancelModify}
                phase={record}
                projects={projects}
            />

            <Modal
                open={deleteModal}
                closeIcon={
                    <Icon
                        icon="hugeicons:cancel-circle"
                        width="24"
                        height="24"
                        style={{color: "#FF2E2E"}}
                    />
                }
                footer={null}
                width={"33rem"}
                centered={true}
                onCancel={handleCancelDelete}
            >
                <DeleteProjectPhase
                    handleCancel={handleCancelDelete}
                    phase={record}
                    phasesMutation={refetch}
                />
            </Modal>
        </div>
    );
};

export default ProjectPhasesTable;