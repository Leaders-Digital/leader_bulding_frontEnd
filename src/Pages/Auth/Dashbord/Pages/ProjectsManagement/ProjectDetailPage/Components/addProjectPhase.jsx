import React, {useEffect, useMemo, useState} from 'react';
import {Button, DatePicker, Form, Input, message, Modal, Select} from 'antd';
import {Icon} from "@iconify/react";
import useProjectPhases from '../../../../../../../Hooks/ProjectPhases/useProjectPhases.js';

const extractPhaseNames = (projectsData, currentPhases = [], allPhases = []) => {
    const allPhaseNames = new Set();

    if (allPhases && Array.isArray(allPhases)) {
        allPhases.forEach(phase => {
            if (phase.name) {
                allPhaseNames.add(phase.name);
            }
        });
    }

    if (projectsData && projectsData.length > 0) {
        projectsData.forEach(project => {
            if (project.phases && Array.isArray(project.phases)) {
                project.phases.forEach(phase => {
                    if (phase.name) {
                        allPhaseNames.add(phase.name);
                    }
                });
            }
        });
    }

    if (currentPhases && Array.isArray(currentPhases)) {
        currentPhases.forEach(phase => {
            if (phase.name) {
                allPhaseNames.add(phase.name);
            }
        });
    }

    return Array.from(allPhaseNames).sort();
};

const AddProjectPhase = ({
                             isOpen,
                             onClose,
                             onSubmit,
                             projects = [],
                             defaultProjectId = null,
                             currentProjectPhases = []
                         }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [showCustomInput, setShowCustomInput] = useState(false);

    const {data: allPhases} = useProjectPhases();

    const phaseNames = useMemo(() => {
        return extractPhaseNames(projects, currentProjectPhases, allPhases);
    }, [projects, currentProjectPhases, allPhases]);

    useEffect(() => {
        if (isOpen && defaultProjectId) {
            form.setFieldsValue({projectId: defaultProjectId});
        }
    }, [isOpen, defaultProjectId, form]);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();


            const formattedValues = {
                ...values,
                startDate: values.startDate ? values.startDate.format('YYYY-MM-DD') : '',
                finishDate: values.finishDate ? values.finishDate.format('YYYY-MM-DD') : ''
            };

            await onSubmit(formattedValues);


            form.resetFields();
            setShowCustomInput(false);
            onClose();
            message.success('Phase ajoutée avec succès');
        } catch (error) {
            message.error('Erreur lors de l\'ajout de la phase');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setShowCustomInput(false);
        onClose();
    };

    const filterProjects = (input, option) => {
        const projectName = option.children?.toLowerCase() || '';
        const searchTerm = input.toLowerCase();
        return projectName.includes(searchTerm);
    };

    const filterPhaseNames = (input, option) => {
        const phaseName = option.children?.toLowerCase() || '';
        const searchTerm = input.toLowerCase();
        return phaseName.includes(searchTerm);
    };

    const handlePhaseNameChange = (value) => {
        if (value === 'new') {
            setShowCustomInput(true);
            form.setFieldsValue({name: ''});
        } else {
            setShowCustomInput(false);
        }
    };

    const handleCustomNameChange = (e) => {
        form.setFieldsValue({name: e.target.value});
    };

    const handleStatusChange = (value) => {
        if (value === 'terminé') {
            form.setFieldsValue({pourcentage: '100'});
        }
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
                    Ajouter une phase
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
            style={{top: 40}}

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
                        className="h-12 rounded-lg"
                        showSearch={!defaultProjectId}
                        filterOption={filterProjects}
                        optionFilterProp="children"
                        notFoundContent="Aucun projet trouvé"
                        loading={projects.length === 0}
                        disabled={!!defaultProjectId}
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
                    <Select
                        placeholder="Sélectionner ou créer un nom de phase"
                        className="h-12 rounded-lg"
                        showSearch
                        filterOption={filterPhaseNames}
                        optionFilterProp="children"
                        onChange={handlePhaseNameChange}
                        notFoundContent="Aucune phase trouvée"
                        allowClear
                    >
                        {phaseNames.map(phaseName => (
                            <Select.Option key={phaseName} value={phaseName}>
                                {phaseName}
                            </Select.Option>
                        ))}
                        <Select.Option value="new">
                            ──── Créer une nouvelle phase ────
                        </Select.Option>
                    </Select>
                </Form.Item>

                {showCustomInput && (
                    <Form.Item
                        name="customName"
                        label="Nouveau nom de phase"
                        rules={[{required: false}]}
                    >
                        <Input
                            placeholder="Entrez un nouveau nom de phase"
                            className="h-12 rounded-lg"
                            onChange={handleCustomNameChange}
                        />
                    </Form.Item>
                )}

                <Form.Item
                    name="status"
                    label="Statut"
                    rules={[{required: true, message: 'Veuillez sélectionner un statut'}]}
                >
                    <Select
                        placeholder="Sélectionner un statut"
                        className="h-12 rounded-lg"
                        onChange={handleStatusChange}
                    >
                        <Select.Option value="en attente">En attente</Select.Option>
                        <Select.Option value="en cours">En cours</Select.Option>
                        <Select.Option value="terminé">Terminé</Select.Option>
                        <Select.Option value="annulé">Annulé</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="pourcentage"
                    label="Pourcentage d'avancement"
                    rules={[
                        {required: true, message: 'Veuillez entrer le pourcentage'},
                        {type: 'string', message: 'Le pourcentage doit être entre 0 et 100'},
                        {
                            validator: (_, value) => {
                                const numValue = parseInt(value);
                                if (isNaN(numValue) || numValue < 0 || numValue > 100) {
                                    return Promise.reject(new Error('Le pourcentage doit être entre 0 et 100'));
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <Input
                        type="number"
                        placeholder="0"
                        className="h-12 rounded-lg"
                        min={0}
                        max={100}
                    />
                </Form.Item>

                <Form.Item
                    name="startDate"
                    label="Date de début"
                >
                    <DatePicker
                        placeholder="Sélectionner une date de début"
                        className="h-12 rounded-lg w-full"
                        format="DD/MM/YYYY"
                    />
                </Form.Item>

                <Form.Item
                    name="finishDate"
                    label="Date de fin"
                    dependencies={['startDate']}
                    rules={[
                        {
                            validator: validateFinishDate
                        }
                    ]}
                >
                    <DatePicker
                        placeholder="Sélectionner une date de fin"
                        className="h-12 rounded-lg w-full"
                        format="DD/MM/YYYY"
                        disabledDate={disabledFinishDate}
                    />
                </Form.Item>

                <Form.Item className="mb-0">
                    <div className="flex justify-end gap-3">
                        <Button
                            onClick={handleCancel}
                            className="h-12 px-6 rounded-lg"
                        >
                            Annuler
                        </Button>
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            loading={loading}
                            className="h-12 px-6 rounded-lg bg-Golden hover:bg-yellow-500 text-[#3A3541] border-Golden"
                        >
                            Ajouter
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProjectPhase;