import React, { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { Icon } from "@iconify/react";

const AddProjectPhase = ({ isOpen, onClose, onSubmit }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            await onSubmit(values);
            form.resetFields();
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
        onClose();
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
                    style={{ color: "#F7D47A" }} 
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
                    name="name"
                    label="Nom"
                    rules={[{ required: true, message: 'Veuillez entrer le nom de la phase' }]}
                >
                    <Input 
                        placeholder="Entrez le nom de la phase"
                        className="h-12 rounded-lg"
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{ required: true, message: 'Veuillez entrer la description' }]}
                >
                    <Input.TextArea 
                        placeholder="Entrez la description de la phase"
                        className="rounded-lg"
                        rows={4}
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
                        Ajouter
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default AddProjectPhase;