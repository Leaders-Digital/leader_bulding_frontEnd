import React, { useState } from 'react';
import { Modal, Form, Input, message } from 'antd';
import ProjectPhasesHeader from './ProjectPhasesHeader';
import ProjectPhasesTable from './ProjectPhasesTable';
import useProjectPhases from '../../../../../../Hooks/ProjectPhases/useProjectPhases.js';

const ProjectPhasesPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingRecord, setEditingRecord] = useState(null);
    const [filter, setFilter] = useState({ search: '' });
    const { refetch, createProjectPhase, updateProjectPhase } = useProjectPhases();

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    const handleAddClick = () => {
        setEditingRecord(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditClick = (record) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleModalOk = async () => {
        try {
            const values = await form.validateFields();
            const success = editingRecord 
                ? await updateProjectPhase(editingRecord._id, values)
                : await createProjectPhase(values);

            if (success) {
                message.success(`Phase du projet ${editingRecord ? 'modifiée' : 'créée'} avec succès`);
                setIsModalVisible(false);
            } else {
                message.error('Erreur lors de la sauvegarde de la phase du projet');
            }
        } catch (error) {
            message.error('Erreur lors de la sauvegarde de la phase du projet');
            console.error('Error saving project phase:', error);
        }
    };

    return (
        <div className="p-6">
            <ProjectPhasesHeader onFilterChange={handleFilterChange} />
            <ProjectPhasesTable filter={filter} onEditClick={handleEditClick} />
            
            <Modal
                title={editingRecord ? "Modifier la Phase" : "Ajouter une Phase"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={() => setIsModalVisible(false)}
                okText={editingRecord ? "Modifier" : "Ajouter"}
                cancelText="Annuler"
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Nom"
                        rules={[{ required: true, message: 'Veuillez entrer le nom de la phase' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Veuillez entrer la description' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ProjectPhasesPage;