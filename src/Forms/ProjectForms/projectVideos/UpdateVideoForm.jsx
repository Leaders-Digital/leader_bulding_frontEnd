import React from 'react';
import {DatePicker, Form, Input} from "antd";

const UpdateVideoForm = ({form}) => {
    return (
        <Form form={form} layout="vertical">
            <Form.Item
                name="name"
                label="Nom de la vidéo"
                rules={[{required: true, message: 'Veuillez saisir le nom de la vidéo'}]}
            >
                <Input placeholder="Nom de la vidéo"/>
            </Form.Item>
            <Form.Item
                name="description"
                label="Description"
                rules={[{required: true, message: 'Veuillez saisir la description'}]}
            >
                <Input.TextArea rows={3} placeholder="Description de la vidéo"/>
            </Form.Item>
            <Form.Item
                name="url"
                label="URL YouTube"
                rules={[
                    {required: true, message: 'Veuillez saisir l\'URL YouTube'},
                    {
                        pattern: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
                        message: 'Veuillez saisir une URL YouTube valide'
                    }
                ]}
            >
                <Input placeholder="https://www.youtube.com/watch?v=..."/>
            </Form.Item>
            <Form.Item
                name="date"
                label="Date"
                rules={[{required: true, message: 'Veuillez sélectionner une date'}]}
            >
                <DatePicker
                    style={{width: '100%'}}
                    placeholder="Sélectionner une date"
                    format="YYYY-MM-DD"
                />
            </Form.Item>
        </Form>
    );
};

export default UpdateVideoForm;