import React, {useEffect, useRef, useState} from 'react';
import {Button, DatePicker, Form, Input, message, Modal, Select} from 'antd';
import {Icon} from "@iconify/react";
import dayjs from 'dayjs';
import useUpdateProjectPhase from '../../../../../../../Hooks/ProjectPhases/useUpdateProjectPhase.js';
import {useParams} from "react-router-dom";
import useProject from "../../../../../../../Hooks/ProjectHooks/useProject.js";

const ModifyProjectPhase = ({isOpen, onClose, phase, phasesMutation, projects}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const {updateProjectPhase, isMutating} = useUpdateProjectPhase();
    const formInitializedRef = useRef(false);
    const {id} = useParams()
    const {project, isLoading, error} = useProject(id)

    useEffect(() => {
        if (phase && isOpen && !formInitializedRef.current) {
            let projectId = phase.projectId;
            if (projectId && typeof projectId === 'object' && projectId._id) {
                projectId = projectId._id;
            }

            form.setFieldsValue({
                projectId: projectId,
                name: phase.name,
                status: phase.status,
                pourcentage: phase.pourcentage,
                startDate: phase.startDate ? dayjs(phase.startDate) : null,
                finishDate: phase.finishDate ? dayjs(phase.finishDate) : null
            });
            formInitializedRef.current = true;
        }

        if (!isOpen) {
            formInitializedRef.current = false;
        }
    }, [phase, isOpen]);

    const handleStatusChange = (value) => {
        if (value === 'Terminé') {
            form.setFieldsValue({pourcentage: 100});
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();

            const phaseId = phase?._id || phase?.id;

            if (!phaseId) {
                message.error('ID de phase manquant. Impossible de modifier.');
                return;
            }

            const formattedValues = {
                ...values,
                startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : '',
                finishDate: values.finishDate ? values.finishDate.format('YYYY-MM-DD') : ''
            };

            await updateProjectPhase({id: phaseId, data: formattedValues});

            if (phasesMutation) {
                await phasesMutation();
            }

            form.resetFields();
            onClose();
            message.success('Phase modifiée avec succès');
        } catch (error) {
            message.error('Erreur lors de la modification de la phase');
            console.error('Error updating project phase:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    const validateFinishDate = (_, value) => {
        const startDate = form.getFieldValue('startDate');

        if (!value) {
            return Promise.resolve();
        }

        if (!startDate) {
            return Promise.resolve();
        }

        if (value.isBefore(startDate, 'day')) {
            return Promise.reject(new Error('La date de fin ne peut pas être antérieure à la date de début'));
        }

        return Promise.resolve();
    };

    const disabledFinishDate = (current) => {
        const startDate = form.getFieldValue('startDate');
        if (!startDate) {
            return false;
        }
        return current && current.isBefore(startDate, 'day');
    };

    // Get project name based on different data structures
    const getProjectName = () => {
        if (project && project.data && project.data.name) {
            return project.data.name;
        }


        if (projects && phase && phase.projectId) {
            if (typeof phase.projectId === 'object' && phase.projectId.name) {
                return phase.projectId.name;
            } else if (typeof phase.projectId === 'string') {
                const foundProject = projects.find(p => p._id === phase.projectId);
                return foundProject?.name || 'Projet sans nom';
            }
        }

        return 'Projet sans nom';
    };

    return (
        <Modal
            title={
                <span className='font-jakarta text-xl font-bold size-6 ml-6 text-[#3A3541]'>
                    Modifier une phase
                </span>
            }
            open={isOpen}
            closeIcon={
                <Icon
                    icon="hugeicons:cancel-circle"
                    width="24"
                    height="24"
                    style={{color: "#F7D47A"}}
                />
            }
            footer={null}
            width={"45rem"}
            onCancel={handleCancel}
        >
            <Form
                form={form}
                layout="vertical"
                className="px-6 py-4"
            >
                <Form.Item
                    name="projectId"
                    label="Projet"
                    rules={[{required: true, message: 'Veuillez sélectionner un projet'}]}
                >
                    <Select
                        placeholder="Sélectionner un projet"
                        disabled={true}
                    >
                        {(() => {
                            let projectId = '';
                            if (project && project.data && project.data._id) {
                                projectId = project.data._id;
                            } else if (phase && phase.projectId) {
                                if (typeof phase.projectId === 'object' && phase.projectId._id) {
                                    projectId = phase.projectId._id;
                                } else if (typeof phase.projectId === 'string') {
                                    projectId = phase.projectId;
                                }
                            }

                            return projectId ? (
                                <Select.Option key={projectId} value={projectId}>
                                    {getProjectName()}
                                </Select.Option>
                            ) : null;
                        })()}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Nom de la phase"
                    rules={[{required: true, message: 'Veuillez entrer le nom de la phase'}]}
                >
                    <Input
                        placeholder="Entrez le nom de la phase"
                        className="h-12 rounded-lg"
                        disabled={true}

                    />
                </Form.Item>

                <Form.Item
                    name="status"
                    label="Statut"
                    rules={[{required: true, message: 'Veuillez sélectionner le statut'}]}
                >
                    <Select
                        placeholder="Sélectionner le statut"
                        className="h-12 rounded-lg"
                        onChange={handleStatusChange}
                    >
                        <Select.Option value="En cours">En cours</Select.Option>
                        <Select.Option value="Terminé">Terminé</Select.Option>
                        <Select.Option value="En attente">En attente</Select.Option>
                        <Select.Option value="Annulé">Annulé</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="pourcentage"
                    label="Pourcentage de progression"
                    rules={[{required: true, message: 'Veuillez entrer le pourcentage'}]}
                >
                    <Input
                        placeholder="Ex: 25%"
                        className="h-12 rounded-lg"
                    />
                </Form.Item>

                <Form.Item
                    name="startDate"
                    label="Date de début"
                    rules={[{required: true, message: 'Veuillez sélectionner la date de début'}]}
                >
                    <DatePicker
                        style={{width: '100%', height: '48px'}}
                        format="YYYY-MM-DD"
                        className="rounded-lg"
                        onChange={() => {
                            form.setFieldsValue({finishDate: null});
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="finishDate"
                    label="Date de fin"
                    rules={[
                        {required: true, message: 'Veuillez sélectionner la date de fin'},
                        {validator: validateFinishDate}
                    ]}
                >
                    <DatePicker
                        style={{width: '100%', height: '48px'}}
                        format="YYYY-MM-DD"
                        className="rounded-lg"
                        disabledDate={disabledFinishDate}
                    />
                </Form.Item>

                <div className="flex justify-end gap-4 mt-6">
                    <Button
                        onClick={handleCancel}
                        className="h-10 px-6 rounded-lg"
                    >
                        Annuler
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={loading || isMutating}
                        className="h-10 px-6 rounded-lg bg-[#F7D47A] hover:bg-[#F7D47A]/80"
                    >
                        Modifier
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default ModifyProjectPhase; 