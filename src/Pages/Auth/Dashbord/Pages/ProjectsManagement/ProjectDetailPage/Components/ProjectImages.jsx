import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation} from 'swiper/modules';
import {Button, Empty, message, Modal, Upload} from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';
import {Icon} from '@iconify/react/dist/iconify.js';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useFile from "../../../../../../../Hooks/FileHooks/useFile.js";
import useDeleteFile from "../../../../../../../Hooks/FileHooks/useDeleteFile.js";
import uploadFile from "../../../../../../../Hooks/FileHooks/useUploadFile.js";
import useModifyProject from "../../../../../../../Hooks/ProjectHooks/useModifyProject.js";
import ProjectVideos from "./ProjectVideos.jsx";
import useProject from "../../../../../../../Hooks/ProjectHooks/useProject.js";
import {toast} from 'react-toastify';

const ProjectImages = ({id}) => {
    const {file, mutate: mutateFile, isLoading: isLoadingFile, error: errorFile} = useFile(id, "Project");
    const {project, error, isLoading, mutate: mutateProject} = useProject(id);
    const {deleteFile, isMutating: isDeleting} = useDeleteFile();
    const {modifyProject, isMutating: isUpdatingProject} = useModifyProject();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const projectPhotos = project?.data?.photos || [];


    const getFileNameWithoutExtension = (filename) => {
        return filename.split('.').slice(0, -1).join('.');
    };

    const handleDeleteImage = async () => {
        if (!selectedImage) return;

        try {
            const updatedPhotos = projectPhotos.filter(photo => photo._id !== selectedImage._id);
            await updateProjectPhotos(updatedPhotos);

            const response = await toast.promise(
                deleteFile({id: selectedImage._id}),
                {
                    pending: 'Suppression en cours...',
                    success: 'Image supprimée avec succès!',
                    error: 'Erreur lors de la suppression!',
                }
            );

            if (response) {
                mutateFile();
                setDeleteModalVisible(false);
                setSelectedImage(null);
            }
        } catch (e) {
            console.error('Delete error:', e);
            toast.error("Erreur lors de la suppression de l'image");
        }
    };

    const updateProjectPhotos = async (newPhotos) => {
        try {
            const photoIds = newPhotos.map(photo => photo._id);

            console.log('New photos array:', newPhotos);
            console.log('Photo IDs being sent:', photoIds);

            await modifyProject({
                id: id,
                data: {
                    photos: photoIds
                }
            });


            await mutateProject();
        } catch (e) {
            console.error('Error updating project photos:', e);
            toast.error("Erreur lors de la mise à jour du projet");
        }
    };

    const handleUpload = async ({file: uploadedFile}) => {
        try {
            setIsUploading(true);
            console.log('Uploading file:', uploadedFile); // Debug log

            const uploadResponse = await uploadFile({
                file: uploadedFile,
                modelType: 'Project',
                refId: id
            });

            if (uploadResponse && uploadResponse.data) {
                const uploadedFileData = uploadResponse.data;

                const newPhoto = {
                    _id: uploadedFileData._id,
                    FilePath: uploadedFileData.FilePath,
                    originalName: uploadedFileData.originalName,
                    name: uploadedFileData.name,
                    fileType: uploadedFileData.fileType,
                    modelType: uploadedFileData.modelType,
                    refId: uploadedFileData.refId
                };

                const updatedPhotos = [...projectPhotos, newPhoto];
                await updateProjectPhotos(updatedPhotos);

                toast.success("Image téléchargée avec succès!");
                mutateFile(); // Refresh file list
            } else {
                toast.error("Erreur: Réponse d'upload invalide");
            }
        } catch (e) {
            console.error('Upload error:', e);
            toast.error("Erreur lors du téléchargement!");
        } finally {
            setIsUploading(false);
        }
    };

    const uploadProps = {
        name: 'file',
        customRequest: ({file, onSuccess, onError}) => {
            handleUpload({file})
                .then(() => onSuccess())
                .catch((error) => onError(error));
        },
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                message.error('Veuillez sélectionner une image!');
                return false;
            }
            return true;
        },
        showUploadList: false,
        accept: 'image/*'
    };

    if (isLoadingFile || isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-Golden"></div>
            </div>
        );
    }

    if (errorFile || error) {
        return (
            <div className="flex justify-center items-center h-64 text-red-500">
                Erreur lors du chargement des images
            </div>
        );
    }

    if (!projectPhotos || projectPhotos.length === 0) {
        return (
            <div className="w-full bg-white rounded-xl pb-6 pl-6 pt-2  ">
                <div className="w-full h-14 border-b-2 border-b-[#DBDCDE] mb-4 flex justify-between items-center">
                    <span className="font-jakarta text-xl font-bold text-[#3A3541] ml-3">Images du chantier</span>
                    <Upload {...uploadProps}>
                        <Button
                            icon={<PlusOutlined/>}
                            className="mr-6 bg-Golden text-black border-Golden hover:bg-yellow-600 hover:border-yellow-600"
                            loading={isUploading}
                        >
                            Ajouter une image
                        </Button>
                    </Upload>
                </div>
                <div className="flex justify-center items-center h-28 mt-16  text-gray-500">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                </div>
                <ProjectVideos id={id}/>
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-xl pb-6 pl-6 pt-2">
            <div className="w-full h-14 border-b-2 border-b-[#DBDCDE] mb-4 flex justify-between items-center">
                <span className="font-jakarta text-xl font-bold text-[#3A3541] ml-3">Images du chantier</span>
                <Upload {...uploadProps}>
                    <Button
                        icon={<PlusOutlined/>}
                        className="mr-6 bg-Golden text-black border-Golden hover:bg-yellow-600 hover:border-yellow-600"
                        loading={isUploading}
                    >
                        Ajouter une image
                    </Button>
                </Upload>
            </div>

            <div>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    slidesPerView={3}
                    navigation
                    centeredSlides={false}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 4,
                            centeredSlides: false,
                        },
                    }}
                    className="w-full h-[150px]"
                    style={{
                        '--swiper-navigation-size': '25px',
                        '--swiper-navigation-color': '#BC983E',
                        paddingLeft: '0',
                        paddingRight: '0',
                    }}
                >
                    {projectPhotos.map((photo, index) =>
                        (
                            <SwiperSlide key={index} className={'!flex !w-[200px] !justify-center items-center'}>
                                <div className="relative w-[150px] h-[150px] overflow-hidden rounded-lg group">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/${photo.FilePath}`}
                                        alt={`Project image ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div
                                        className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white text-sm font-medium px-2 text-center">
                                        {getFileNameWithoutExtension(photo.originalName)}
                                    </span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedImage(photo);
                                            setDeleteModalVisible(true);
                                        }}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-600"
                                    >
                                        <DeleteOutlined style={{fontSize: '12px'}}/>
                                    </button>
                                </div>
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
            </div>
            <ProjectVideos id={id}/>
            <Modal
                open={deleteModalVisible}
                onCancel={() => {
                    setDeleteModalVisible(false);
                    setSelectedImage(null);
                }}
                footer={null}
                width="33rem"
                centered
                closeIcon={<Icon icon="hugeicons:cancel-circle" width="24" height="24" style={{color: "#FF2E2E"}}/>}
            >
                <div className='w-full h-full flex flex-col gap-6'>
                    <div className='flex flex-row justify-center mt-7'>
                        <Icon icon="hugeicons:alert-circle" width="60" height="60" style={{color: "#ec1919"}}/>
                    </div>
                    <div className='text-center'>
                        <span className='font-jakarta text-3xl font-bold size-9 ml-10 my-8 text-[#3A3541]'>
                            Voulez vous supprimer <br/>
                            cette image ?
                        </span>
                    </div>
                    <div className='flex flex-row justify-center gap-10 mt-11'>
                        <button
                            className='text-black font-jakarta text-l hover:text-red-600'
                            onClick={() => {
                                setDeleteModalVisible(false);
                                setSelectedImage(null);
                            }}
                        >
                            Annuler
                        </button>
                        <button
                            className='h-12 w-28 bg-[#FF2E2E] rounded-lg text-white font-jakarta text-l font-bold hover:bg-red-600'
                            onClick={handleDeleteImage}
                            disabled={isDeleting || isUpdatingProject}
                        >
                            {isDeleting || isUpdatingProject ? 'En cours...' : 'Supprimer'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ProjectImages;