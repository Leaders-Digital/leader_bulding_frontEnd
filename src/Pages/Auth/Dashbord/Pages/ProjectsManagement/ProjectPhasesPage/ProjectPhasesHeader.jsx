import {Icon} from '@iconify/react/dist/iconify.js'
import {Input} from 'antd'
import React, {useCallback, useState} from 'react'
import AddProjectPhase from "../ProjectDetailPage/Components/addProjectPhase.jsx";
import useProjectPhases from '../../../../../../Hooks/ProjectPhases/useProjectPhases';
import useProjects from '../../../../../../Hooks/ProjectHooks/useProjects';

const ProjectPhasesHeader = ({onFilterChange}) => {
    const [search, setSearch] = useState("")
    const [createModal, setCreateModal] = useState(false)
    const {createProjectPhase, refetch} = useProjectPhases();

    const filter = {search: "", status: ""};
    const pagination = {current: 1, pageSize: 1000};
    const {projects, isLoading: projectsLoading, mutate: mutateProjects} = useProjects(filter, pagination);

    const handleCreateModal = () => {
        setCreateModal(true)
    }

    const handleCancelCreate = () => {
        setCreateModal(false)
    }

    const handleSubmit = async (values) => {
        try {
            await createProjectPhase(values);
            await refetch();
            await mutateProjects();
            setCreateModal(false);
        } catch (error) {
        }
    }

    const handleSearchChange = useCallback((e) => {
        const value = e.target.value;
        setSearch(value);
        onFilterChange({search: value});
    }, [onFilterChange])

    const handleClearSearch = useCallback(() => {
        setSearch("");
        onFilterChange({search: ""});
    }, [onFilterChange])

    return (
        <div className='h-full w-full flex flex-col mb-6'>
            <div className='mb-3'>
                <span className='font-jakarta text-3xl font-bold size-6 text-[#3A3541]'>
                    Gestion des Phases
                </span>
            </div>
            <div className='h-full w-full flex flex-row justify-between'>
                <div className='flex flex-row gap-3 flex-grow'>
                    <div className='flex flex-col'>
                        <label htmlFor="name" className='text-sm font-medium text-gray-700 mb-1'>
                            Rechercher
                        </label>
                        <Input
                            className='h-12'
                            onChange={handleSearchChange}
                            onClear={handleClearSearch}
                            placeholder="Rechercher par nom de projet ou nom de phase..."
                            value={search}
                            allowClear
                        />
                    </div>
                </div>
                <div className='flex flex-row gap-2 mt-6'>
                    <button
                        className='h-12 w-58 bg-black rounded-lg border-2 border-black px-4 hover:bg-transparent hover:text-black'
                        onClick={handleCreateModal}
                    >
                        <div className='flex flex-row gap-1 justify-center'>
                            <Icon
                                icon="hugeicons:add-square"
                                width="24"
                                height="24"
                                style={{color: "#fff"}}
                            />
                            <span className='font-jakarta font-bold text-base text-white hover:text-black'>
                                Ajouter une phase
                            </span>
                        </div>
                    </button>
                </div>
            </div>
            <AddProjectPhase
                isOpen={createModal}
                onClose={handleCancelCreate}
                onSubmit={handleSubmit}
                projects={projects || []}
            />
        </div>
    )
}

export default ProjectPhasesHeader;