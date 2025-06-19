import React, {useEffect, useState, useRef} from 'react';
import {Button, DatePicker, Form, Input, message, Modal, Select} from 'antd';
import {Icon} from "@iconify/react";
import dayjs from 'dayjs';
import useProjectPhases from '../../../../../../../Hooks/ProjectPhases/useProjectPhases';

const ModifyProjectPhase = ({isOpen, onClose, phase, projects = []}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const {updateProjectPhase, refetch} = useProjectPhases();
    const formInitializedRef = useRef(false);

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
        
        // Reset the ref when modal closes
        if (!isOpen) {
            formInitializedRef.current = false;
        }
    }, [phase, isOpen]);

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
            await refetch();
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
                        {projects.map(project => (
                            <Select.Option key={project._id} value={project._id}>
                                {project.name || 'Projet sans nom'}
                            </Select.Option>
                        ))}
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
                        loading={loading}
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