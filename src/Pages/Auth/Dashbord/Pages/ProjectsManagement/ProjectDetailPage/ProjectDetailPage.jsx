import React, {useEffect, useState} from 'react'
import ListeDevis from './listeDevis'
import {useNavigate, useParams} from 'react-router-dom'
import useProject from '../../../../../../Hooks/ProjectHooks/useProject'
import AddProjectFile from './addProjectFile'
import useFile from '../../../../../../Hooks/FileHooks/useFile'
import {Button, Drawer} from 'antd'
import {
    EyeOutlined,
    FileExcelOutlined,
    FileImageOutlined,
    FilePdfOutlined,
    FileUnknownOutlined,
    PlusOutlined
} from '@ant-design/icons'
import ProjectImages from "./Components/ProjectImages.jsx";
import AddProjectPhase from '../ProjectPhasesPage/Components/addProjectPhase.jsx';
import useProjectPhases from '../../../../../../Hooks/ProjectPhases/useProjectPhases';
import useProjects from '../../../../../../Hooks/ProjectHooks/useProjects';
import usePhasesByProject from '../../../../../../Hooks/ProjectPhases/usePhasesByProject';
import ProjectMembers from "./Components/ProjectMembers.jsx";

const ProjectDetailPage = () => {
    const [filter, setFilter] = useState()
    const [openDrawer, setOpenDrawer] = useState()
    const [addPhaseModal, setAddPhaseModal] = useState(false)
    const {id} = useParams()
    const navigate = useNavigate()
    const {project, isLoading, error} = useProject(id)
    const {file, mutate, isLoading: isLoadingFile, error: errorFile} = useFile(id, "Project")
    const {createProjectPhase} = useProjectPhases();

    // Fetch projects for the phase creation dropdown
    const {projects} = useProjects({search: "", status: ""}, {current: 1, pageSize: 1000});

    // Fetch phases for the current project using SWR
    const {phases, loading: phasesLoading, refetch: refetchPhases} = usePhasesByProject(id);

    const showDrawer = () => {
        setOpenDrawer(true)
    }
    const onCloseDrawer = () => {
        setOpenDrawer(false)
    }

    const getFileIcon = (fileType) => {
        if (fileType?.includes('pdf')) {
            return <FilePdfOutlined style={{fontSize: 20, marginRight: 3}}/>
        } else if (fileType?.includes('image')) {
            return <FileImageOutlined style={{fontSize: 20, marginRight: 3}}/>
        } else if (fileType?.includes('sheet')) {
            return <FileExcelOutlined style={{fontSize: 20, marginRight: 3}}/>
        } else {
            return <FileUnknownOutlined style={{fontSize: 20, color: 'red'}}/>
        }
    }

    useEffect(() => {
        if (project) {
            setFilter({search: project.data._id, status: ""})
        }
    }, [project])

    const handleChangeFilter = (newFilter) => {
        setFilter(newFilter)
    }

    const handleCreateDevis = () => {
        navigate('/gestionProject/devis', {
            state: {
                projectId: project.data._id,
                clientId: project.data.clientId,
                name: project.data.clientId.name,
                lastName: project.data.clientId.lastName
            }
        })
    }

    const handleAddPhase = () => {
        setAddPhaseModal(true);
    }

    const handleCancelAddPhase = () => {
        setAddPhaseModal(false);
    }

    const handleSubmitPhase = async (values) => {
        try {
            // Set the current project as the default project
            const phaseData = {
                ...values,
                projectId: project.data._id
            };

            await createProjectPhase(phaseData);

            // Refresh phases using SWR
            await refetchPhases();

            setAddPhaseModal(false);
        } catch (error) {
            console.error('Error adding phase:', error);
        }
    }

    return (
        <div className=' w-full flex flex-col'>
            <div className=' mb-3'><span className=' font-jakarta text-3xl  font-bold size-6  text-[#3A3541]'>Gestion projets </span>
            </div>
            <div className=' flex flex-row items-center justify-center border-b-2 mb-3 border-[#BC983E]'>
                <span
                    className=' font-jakarta text-xl w-56  font-bold size-6  text-[#BC983E] mb-1'>Détails du projet </span>
            </div>

            <div className='flex flex-col w-full  bg-white rounded-xl p-3'>
                <div className=' w-full h-14 border-b-2 border-b-[#DBDCDE] '>
                    <span className='font-jakarta text-2xl font-bold text-[#3A3541] ml-3'>Détails du projet </span>
                </div>

                {project && project.data && (
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4 w-full mt-4">
                        {/* First Row */}
                        <div className="flex flex-col">
                            <span className="min-w-[110px] font-bold text-gray-700">Nom :</span>
                            <span className="flex-1 break-words">{project.data.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="min-w-[110px] font-bold text-gray-700">Type du projet :</span>
                            <span className="flex-1 break-words">{project.data.projectType}</span>
                        </div>
                        <div className="flex flex-col ml-12">
                            <span className="min-w-[110px] font-bold text-gray-700">Budget :</span>
                            <span className="flex-1 break-words">{project.data.budget}</span>
                        </div>

                        <div className="flex flex-col">
                            <span className="min-w-[110px] font-bold text-gray-700">Status :</span>
                            <span className="flex-1 break-words">{project.data.status}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="min-w-[110px] font-bold text-gray-700">Adresse :</span>
                            <span className="flex-1 break-words">{project.data.location}</span>
                        </div>
                        <div className="flex flex-col ml-12">
                            <span className="min-w-[110px] font-bold text-gray-700">Date Fin :</span>
                            <span
                                className="flex-1 break-words">{new Date(project.data.dateEnd).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <ProjectMembers project={project} onProjectUpdate={() => window.location.reload()} />
                        {/* Phases Section */}
                        <div className="col-span-3 mt-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-xl text-gray-700">Phases du projet :</span>

                                </div>
                                {phases && phases.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-4">
                                        {phases.map((phase, index) => (
                                            <div key={phase._id || index}
                                                 className="flex flex-col p-4 border rounded-lg">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span
                                                        className="font-bold text-gray-700">Phase {index + 1}: {phase.name}</span>
                                                    <span
                                                        className="font-bold text-gray-700">{phase.pourcentage}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className="bg-Golden h-2.5 rounded-full"
                                                        style={{width: `${phase.pourcentage}%`}}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between mt-2 text-sm text-gray-600">
                                                    <span>Status: {phase.status}</span>
                                                    <span>
                                                        {phase.startDate && `Début: ${new Date(phase.startDate).toLocaleDateString('fr-FR')}`}
                                                        {phase.finishDate && ` - Fin: ${new Date(phase.finishDate).toLocaleDateString('fr-FR')}`}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined/>}
                                            onClick={handleAddPhase}
                                            className="!bg-Golden !border-Golden !text-[#3A3541] font-jakarta font-bold px-4 py-2 rounded-lg hover:!bg-[#ddb84e] hover:!border-[#ddb84e]"
                                        >
                                            Ajouter une phase
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-gray-500 text-center py-4">
                                        Aucune phase définie pour ce projet
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className=' flex flex-row items-center justify-center border-b-2 mb-3 border-[#BC983E] mt-5'>
                <span className=' font-jakarta text-xl w-56  font-bold size-6  text-[#BC983E] mb-1 ml-1'>Fichiers du projet </span>
            </div>
            <div className='flex flex-row gap-3 justify-between  '>
                <div className={'flex flex-row gap-3'}>

                    <AddProjectFile id={id}/>
                    <Button onClick={showDrawer} className='w-32'>
                        <div className='flex flex-row gap-1 justify-center'>
                            <EyeOutlined/>
                            <span className='font-jakarta font-semibold  text-[#3A3541]'> Voir fichiers</span>
                        </div>
                    </Button>
                </div>


            </div>

            <div className="flex w-full justify-end mt-4">
                <button className="bg-Golden text-[#3A3541] font-jakarta font-bold px-4 py-2 rounded-lg w-36 h-12"
                        onClick={() => handleCreateDevis()}>Ajouter Devis
                </button>
            </div>

            <div className=' flex flex-row items-center justify-center border-b-2 mb-3 border-[#BC983E] mt-5'>
                <span className=' font-jakarta text-xl w-56  font-bold size-6  text-[#BC983E] mb-1 ml-1'>Détails du Devis </span>
            </div>


            <ListeDevis filter={filter}/>

            <Drawer title="Tous fiches projet" onClose={onCloseDrawer} open={openDrawer}>
                {file?.data.map((f) => (
                    <div key={f._id} className='mb-3 px-2 rounded-lg hover:bg-slate-100 '>
                        <a href={`http://localhost:5000/${f.FilePath}`} target="_blank" rel="noreferrer">
                            {getFileIcon(f.fileType)}
                            <span className='font-jakarta text-sm font-bold text-[#3A3541] '>

                                {f.originalName}</span>
                        </a>
                    </div>
                ))}

            </Drawer>
            <div className=' flex flex-row items-center justify-center border-b-2 mb-3 border-[#BC983E] mt-5'>
                <span
                    className=' font-jakarta text-xl w-56  font-bold size-6  text-[#BC983E] mb-1 ml-1'>Infos du projet </span>
            </div>

            <ProjectImages id={id}/>
            <div className={'min-h-[200px]'}>
            </div>

            <AddProjectPhase
                isOpen={addPhaseModal}
                onClose={handleCancelAddPhase}
                onSubmit={handleSubmitPhase}
                projects={projects || []}
                defaultProjectId={project?.data?._id}
                currentProjectPhases={phases || []}
            />
        </div>
    )
}

export default ProjectDetailPage