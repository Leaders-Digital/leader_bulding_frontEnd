import React, { useState } from 'react'
import ListeDevis from './listeDevis'
import { useNavigate, useParams } from 'react-router-dom'
import useProject from '../../../../../../Hooks/ProjectHooks/useProject'

const ProjectDetailPage = () => {
    const [filter, setFilter] = useState()
    const { id } = useParams()
    const navigate = useNavigate()
    const { project, isLoading, error } = useProject(id)
    const handleChangeFilter = (newFilter) => {
        setFilter(newFilter)
    }
    const handleCreateDevis = () => {
        navigate('/gestionProject/devis', { state: { projectId: project.data._id, clientId: project.data.clientId } })
    }
    if (project) {
        console.log("project :", project)
    }
    return (
        <div className='h-full w-full flex flex-col'>
            <div className=' flex flex-row items-center justify-center border-b-2 mb-3 border-[#BC983E]'>
                <span className=' font-jakarta text-xl w-56  font-bold size-6  text-[#BC983E] mb-1'>Détails du projet </span>
            </div>

            <div className='flex flex-col w-full h-[20rem] bg-white rounded-xl p-3'>
                <div className=' w-full h-14 border-b-2 border-b-[#DBDCDE] '>
                    <span className='font-jakarta text-2xl font-bold text-[#3A3541] ml-3'>Détails du projet </span>
                </div>

                {/* 2+ rows, 3 columns, perfectly aligned and filling parent, extra space between col 2 and 3 */}
                {project && project.data && (
                    <div className="grid grid-cols-3 gap-x-8 gap-y-4 w-full mt-4">
                        {/* First Row */}
                        <div className="flex flex-col">
                            <span className="min-w-[110px] font-semibold text-gray-700">Nom :</span>
                            <span className="flex-1 break-words">{project.data.name}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="min-w-[110px] font-semibold text-gray-700">Type du projet :</span>
                            <span className="flex-1 break-words">{project.data.projectType}</span>
                        </div>
                        <div className="flex flex-col ml-12">
                            <span className="min-w-[110px] font-semibold text-gray-700">Budget :</span>
                            <span className="flex-1 break-words">{project.data.budget}</span>
                        </div>
                        {/* Second Row */}
                        <div className="flex flex-col">
                            <span className="min-w-[110px] font-semibold text-gray-700">Status :</span>
                            <span className="flex-1 break-words">{project.data.status}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="min-w-[110px] font-semibold text-gray-700">Adresse :</span>
                            <span className="flex-1 break-words">{project.data.location}</span>
                        </div>
                        <div className="flex flex-col ml-12">
                            <span className="min-w-[110px] font-semibold text-gray-700">Date Fin :</span>
                            <span className="flex-1 break-words">{new Date(project.data.dateEnd).toLocaleDateString('fr-FR')}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex w-full justify-end mt-4">
                <button className="bg-Golden text-[#3A3541] font-jakarta font-bold px-4 py-2 rounded-lg w-36 h-12" onClick={() => handleCreateDevis()}>Ajouter Devis</button>
            </div>
            <div className=' flex flex-row items-center justify-center border-b-2 mb-3 border-[#BC983E] mt-5'>
                <span className=' font-jakarta text-xl w-56  font-bold size-6  text-[#BC983E] mb-1'>Détails du Devis </span>
            </div>
            <ListeDevis filter={filter} />
        </div>
    )
}

export default ProjectDetailPage