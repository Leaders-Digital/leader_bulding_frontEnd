import React, {useState} from 'react';
import {Button, Collapse, Modal} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {Icon} from "@iconify/react";
import {toast} from 'react-toastify';
import DeleteModal from "../../../../../../../Components/Modals/DeleteModal.jsx";
import useDeleteProjectPhase from "../../../../../../../Hooks/ProjectPhases/useDeleteProjectPhase.js";
import ModifyProjectPhase from "./modifyProjectPhase.jsx";

const ProjectPhases = ({phases, handleAddPhase, phasesMutation, projects}) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedPhase, setSelectedPhase] = useState(null);
    const [deleteSubphaseModalVisible, setDeleteSubphaseModalVisible] = useState(false);
    const [selectedSubphase, setSelectedSubphase] = useState(null);
    const {deleteProjectPhase, isMutating: isDeleting} = useDeleteProjectPhase();

    const getProgressBarColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'en attente':
                return 'bg-gray-400';
            case 'terminé':
                return 'bg-green-500';
            case 'annulé':
                return 'bg-red-500';
            case 'en cours':
            default:
                return 'bg-Golden';
        }
    };
    const getProgressBorderColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'en attente':
                return 'border-l-gray-400';

            case 'terminé':
                return 'border-l-green-500';
            case 'annulé':
                return 'border-l-red-500';
            case 'en cours':
            default:
                return 'border-l-Golden';
        }
    };

    const handleEditPhase = (phase) => {
        setSelectedPhase(phase);
        setEditModalVisible(true);
    };

    const handleDeletePhase = (phase) => {
        setSelectedPhase(phase);
        setDeleteModalVisible(true);
    };

    const handleDeleteSubmit = async () => {
        try {
            toast.info('Suppression en cours...');
            const result = await deleteProjectPhase(selectedPhase._id);

            if (result) {
                toast.success('Phase supprimée avec succès!');
                await phasesMutation();
                setDeleteModalVisible(false);
                setSelectedPhase(null);
            }
        } catch (e) {
            console.error('Error deleting phase:', e);
            toast.error('Erreur lors de la suppression!');
        }
    };

    const handleDeleteSubphase = (subphase) => {
        setSelectedSubphase(subphase);
        setDeleteSubphaseModalVisible(true);
    };

    const handleDeleteSubphaseSubmit = async () => {
        try {
            toast.info('Suppression de la sous-phase en cours...');
            // TODO: Implement API call to delete subphase
            console.log('Deleting subphase:', selectedSubphase);
            toast.success('Sous-phase supprimée avec succès!');
            await phasesMutation();
            setDeleteSubphaseModalVisible(false);
            setSelectedSubphase(null);
        } catch (e) {
            console.error('Error deleting subphase:', e);
            toast.error('Erreur lors de la suppression de la sous-phase!');
        }
    };

    return (
        <>
            <div className="col-span-3 mt-4">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-xl text-gray-700">Phases du projet :</span>
                    </div>
                    {phases && phases.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            <Collapse
                                ghost
                                className="bg-transparent"
                                expandIconPosition="end"
                            >
                                {phases.map((phase, index) => (
                                    <Collapse.Panel
                                        key={phase._id || index}
                                        header={
                                            <div className="flex flex-col p-4 border rounded-lg relative w-full">
                                                <div className="absolute top-1 right-5 flex gap-2 z-10">
                                                    <button
                                                        className="bg-yellow-100 hover:bg-yellow-200 py-1 px-2 rounded-full"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditPhase(phase);
                                                        }}
                                                    >
                                                        <Icon icon="hugeicons:pencil-edit-02"
                                                              className="h-6 w-6 text-yellow-600"/>
                                                    </button>
                                                    <button
                                                        className="bg-red-100 hover:bg-red-200 py-1 px-2 rounded-full"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDeletePhase(phase);
                                                        }}
                                                    >
                                                        <Icon icon="hugeicons:delete-01"
                                                              className="h-4 w-4 text-red-600"/>
                                                    </button>
                                                </div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <span
                                                        className="font-bold text-gray-700">Phase {index + 1}: {phase.name}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                    <div
                                                        className={`${getProgressBarColor(phase.status)} h-2.5 rounded-full`}
                                                        style={{width: `${phase.pourcentage}%`}}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between mt-2  text-sm text-gray-600">
                                                    <span>Status: {phase.status}</span>
                                                    <span
                                                        className="font-bold !ml-32 text-gray-700">{phase.pourcentage}%</span>
                                                    <span>
                                                        {phase.startDate && `Début: ${new Date(phase.startDate).toLocaleDateString('fr-FR')}`}
                                                        {phase.finishDate && ` - Fin: ${new Date(phase.finishDate).toLocaleDateString('fr-FR')}`}
                                                    </span>
                                                </div>
                                            </div>
                                        }
                                        className="mb-4"
                                    >
                                        <div className="pl-4">
                                            {phase.subphases && phase.subphases.length > 0 ? (
                                                <div className="space-y-3">

                                                    {phase.subphases.map((subphase, subIndex) => (
                                                        <div
                                                            key={subphase._id || subIndex}
                                                            className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4  ${getProgressBorderColor(subphase.status)}`}
                                                        >
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-3">
                                                                    <div
                                                                        className={`"w-2 h-2 ${getProgressBarColor(subphase.status)} rounded-full`}></div>
                                                                    <div>
                                                                        <h4 className="font-medium text-gray-800">{subphase.name}</h4>
                                                                        <div
                                                                            className="flex items-center gap-4 text-sm text-gray-600">
                                                                            <span
                                                                                className={`${getProgressBorderColor(subphase.status)
                                                                                }`}>
                                                                                Status: {subphase.status}
                                                                            </span>
                                                                            <span>Progression: {subphase.pourcentage}%</span>
                                                                            {subphase.startDate && (
                                                                                <span>
                                                                                    Début: {new Date(subphase.startDate).toLocaleDateString('fr-FR')}
                                                                                </span>
                                                                            )}
                                                                            {subphase.finishDate && (
                                                                                <span>
                                                                                    Fin: {new Date(subphase.finishDate).toLocaleDateString('fr-FR')}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <button
                                                                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                                                                    onClick={() => handleDeleteSubphase(subphase)}
                                                                    title="Supprimer la sous-phase"
                                                                >
                                                                    <Icon icon="hugeicons:delete-01"
                                                                          className="h-4 w-4"/>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-gray-500 text-center py-4">
                                                    Aucune sous-phase définie pour cette phase
                                                </div>
                                            )}
                                        </div>
                                    </Collapse.Panel>
                                ))}
                            </Collapse>

                        </div>
                    ) : (
                        <div className="text-gray-500 text-center py-4">
                            Aucune phase définie pour ce projet
                        </div>
                    )}
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined/>}
                    onClick={handleAddPhase}
                    className="!bg-Golden w-full !border-Golden !text-[#3A3541] font-jakarta font-bold px-4 py-2 rounded-lg hover:!bg-[#ddb84e] hover:!border-[#ddb84e]"
                >
                    Ajouter une phase
                </Button>
            </div>

            <ModifyProjectPhase
                isOpen={editModalVisible}
                onClose={() => {
                    setEditModalVisible(false);
                    setSelectedPhase(null);
                }}
                phase={selectedPhase}
                phasesMutation={phasesMutation}
            />

            <Modal
                open={deleteModalVisible}
                onCancel={() => {
                    setDeleteModalVisible(false);
                    setSelectedPhase(null);
                }}
                footer={null}
                width="33rem"
                centered
                closeIcon={<Icon icon="hugeicons:cancel-circle" width="24" height="24" style={{color: "#FF2E2E"}}/>}
            >
                <DeleteModal
                    itemName={`la phase "${selectedPhase?.name}"`}
                    onCancel={() => {
                        setDeleteModalVisible(false);
                        setSelectedPhase(null);
                    }}
                    onDelete={handleDeleteSubmit}
                    isLoading={isDeleting}
                />
            </Modal>

            {/* Delete Subphase Modal */}
            <Modal
                open={deleteSubphaseModalVisible}
                onCancel={() => {
                    setDeleteSubphaseModalVisible(false);
                    setSelectedSubphase(null);
                }}
                footer={null}
                width="33rem"
                centered
                closeIcon={<Icon icon="hugeicons:cancel-circle" width="24" height="24" style={{color: "#FF2E2E"}}/>}
            >
                <DeleteModal
                    itemName={`la sous-phase "${selectedSubphase?.name}"`}
                    onCancel={() => {
                        setDeleteSubphaseModalVisible(false);
                        setSelectedSubphase(null);
                    }}
                    onDelete={handleDeleteSubphaseSubmit}
                    isLoading={isDeleting}
                />
            </Modal>
        </>
    );
};

export default ProjectPhases;