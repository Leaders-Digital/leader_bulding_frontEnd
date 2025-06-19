// components/ImageUploader.js
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Image, message } from 'antd';
import DevisItemForm from '../../../../../../../Forms/DevisForms/devisItemForm.jsx';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const ImageUploader = ({ setImages, images, deleteImages }) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    console.log('ImageUploader rendered with images:', images);

    useEffect(() => {
        if (images && images.length > 0) {
            setFileList(images);
        }
    }, [images]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const beforeUpload = (file) => {
        const isImage = /^image\/(jpeg|png)$/.test(file.type);
        if (!isImage) {
            message.error('Format de fichier non supporté. Veuillez utiliser uniquement des images (JPEG, PNG, )');
        }
        return false;
    };

    const handleChange = ({ fileList: newFileList }) => {
        console.log('Handle change - New file list:', newFileList);
        setFileList(newFileList);
        setImages(newFileList);
    };

    useEffect(() => {
        if (deleteImages) {
            setFileList([]);
        }
    }, [deleteImages]);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={beforeUpload}
                multiple
                accept="image/*"
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: 'none' }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};

export default ImageUploader;
