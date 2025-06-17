import React, { useState, useEffect } from 'react';
import { Table, message, Modal, Skeleton } from 'antd';
import { Icon } from "@iconify/react";
import ProjectPhasesColumns from '../../../../../../Utils/ProjectPhasesColumns';
import useProjectPhases from '../../../../../../Hooks/ProjectPhases/useProjectPhases';
import CostumTable from '../../../../../../Components/Tabs/CostumTable';
import DeleteProjectPhase from './deleteProjectPhase';
import ModifyProjectPhase from './Components/modifyProjectPhase';

const ProjectPhasesTable = ({ filter }) => {
    const [record, setRecord] = useState('');
    const [modifyModal, setModifyModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    
    const { data: phases, loading, error, refetch } = useProjectPhases(filter, pagination);

    useEffect(() => {
        setPagination((prevstate) => ({ ...prevstate, current: 1 }));
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
    };

    const handleCancelDelete = () => {
        setDeleteModal(false);
    };

    if (error) {
        message.error('Erreur lors du chargement des phases du projet');
    }

    // Filter data based on search
    const filteredData = React.useMemo(() => {
        if (!phases) return [];
        if (!filter?.search) return phases;
        
        return phases.filter(phase => 
            phase.name?.toLowerCase().includes(filter.search.toLowerCase())
        );
    }, [phases, filter?.search]);

    // Calculate paginated data
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
                    columns={ProjectPhasesColumns({ onActionClick: handleActionClick })}
                    data={paginatedData}
                    loading={loading}
                    pagination={{
                        current: pagination.current,
                        pageSize: pagination.pageSize,
                        total: filteredData.length,
                        showSizeChanger: false,
                        onChange: (page, pageSize) => {
                            setPagination({ current: page, pageSize });
                        }
                    }}
                    onChange={handleTableChange}
                />
            ) : (
                <Skeleton active paragraph={{ rows: 15 }} className='mt-10 bg-white' />
            )}

            <ModifyProjectPhase 
                isOpen={modifyModal}
                onClose={handleCancelModify}
                phase={record}
            />

            <Modal
                open={deleteModal}
                closeIcon={
                    <Icon 
                        icon="hugeicons:cancel-circle" 
                        width="24" 
                        height="24" 
                        style={{ color: "#FF2E2E" }} 
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