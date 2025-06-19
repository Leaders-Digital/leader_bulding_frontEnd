import React, {useState} from 'react';
import useProject from "../../../../../../../Hooks/ProjectHooks/useProject.js";
import useModifyProject from "../../../../../../../Hooks/ProjectHooks/useModifyProject.js";
import {PlusOutlined} from '@ant-design/icons';
import YouTube from 'react-youtube';
import {Icon} from "@iconify/react";
import {Button, DatePicker, Form, Input, Modal} from 'antd';
import {toast} from 'react-toastify';
import dayjs from 'dayjs';

const getYoutubeId = (url) => {
    if (!url || typeof url !== 'string') return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const ProjectVideos = ({id}) => {
    const {project, isLoading, error, mutate: mutateProject} = useProject(id);
    const {modifyProject, isMutating: isUpdatingProject} = useModifyProject();
    const [playingIdx, setPlayingIdx] = useState(null);
    const [visibleCount, setVisibleCount] = useState(3);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [form] = Form.useForm();
    const [addForm] = Form.useForm();

    const handleAddVideo = () => {
        addForm.resetFields();
        setAddModalVisible(true);
    };

    const handleEditVideo = (video, globalIdx) => {
        setSelectedVideo({...video, globalIdx});
        form.setFieldsValue({
            name: video.name || '',
            description: video.description || '',
            url: video.url || '',
            date: video.date ? dayjs(video.date) : null
        });
        setEditModalVisible(true);
    };

    const handleDeleteVideo = (video, globalIdx) => {
        setSelectedVideo({...video, globalIdx});
        setDeleteModalVisible(true);
    };

    const handleAddSubmit = async () => {
        try {
            const values = await addForm.validateFields();
            const newVideo = {
                name: values.name,
                description: values.description,
                url: values.url,
                date: values.date ? values.date.format('YYYY-MM-DD') : null
            };

            const videos = [newVideo, ...project.data.video]; // Add new video at the beginning

            await modifyProject({
                id: id,
                data: {
                    video: videos
                }
            });

            await mutateProject();
            setAddModalVisible(false);
            addForm.resetFields();
            toast.success("Vidéo ajoutée avec succès!");
        } catch (e) {
            console.error('Error adding video:', e);
            toast.error("Erreur lors de l'ajout de la vidéo");
        }
    };

    const handleEditSubmit = async () => {
        try {
            const values = await form.validateFields();
            const videos = [...project.data.video];
            const videoIndex = selectedVideo.globalIdx;

            videos[videoIndex] = {
                ...videos[videoIndex],
                name: values.name,
                description: values.description,
                url: values.url,
                date: values.date ? values.date.format('YYYY-MM-DD') : null
            };

            await modifyProject({
                id: id,
                data: {
                    video: videos
                }
            });

            await mutateProject();
            setEditModalVisible(false);
            setSelectedVideo(null);
            form.resetFields();
            toast.success("Vidéo modifiée avec succès!");
        } catch (e) {
            console.error('Error updating video:', e);
            toast.error("Erreur lors de la modification de la vidéo");
        }
    };

    const handleDeleteSubmit = async () => {
        try {
            const videos = [...project.data.video];
            const videoIndex = selectedVideo.globalIdx;

            videos.splice(videoIndex, 1);

            await modifyProject({
                id: id,
                data: {
                    video: videos
                }
            });

            await mutateProject();
            setDeleteModalVisible(false);
            setSelectedVideo(null);
            toast.success("Vidéo supprimée avec succès!");
        } catch (e) {
            console.error('Error deleting video:', e);
            toast.error("Erreur lors de la suppression de la vidéo");
        }
    };

    if (isLoading) return <div>Chargement...</div>;
    if (error) return <div>Erreur lors du chargement des vidéos.</div>;

    // Show most recent videos first (no need to reverse since we add new videos at the beginning)
    const videos = project?.data?.video || [];
    const visibleVideos = videos.slice(0, visibleCount);

    if (!videos.length) {
        return (
            <div className={'mt-12'}>
                <div className="w-full h-14 border-b-2 border-b-[#DBDCDE] mb-4 flex justify-between items-center">
                    <span className="font-jakarta text-xl font-bold text-[#3A3541] ml-3">Les vidéos du chantier</span>
                    <Button
                        icon={<PlusOutlined/>}
                        className="mr-6 bg-Golden text-black border-Golden hover:bg-yellow-600 hover:border-yellow-600"
                        onClick={handleAddVideo}
                        loading={isUpdatingProject}
                    >
                        Ajouter une vidéo
                    </Button>
                </div>
                <div className="flex justify-center items-center h-64 text-gray-500">
                    Aucune vidéo disponible
                </div>
            </div>
        );
    }

    // Group videos into rows of 3
    const rows = [];
    for (let i = 0; i < visibleVideos.length; i += 3) {
        rows.push(visibleVideos.slice(i, i + 3));
    }

    return (
        <div className={'mt-12'}>
            <div className="w-full h-14 border-b-2 border-b-[#DBDCDE] mb-4 flex justify-between items-center">
                <span className="font-jakarta text-xl font-bold text-[#3A3541] ml-3">Les vidéos du chantier</span>
                <Button
                    icon={<PlusOutlined/>}
                    className="mr-6 bg-Golden text-black border-Golden hover:bg-yellow-600 hover:border-yellow-600"
                    onClick={handleAddVideo}
                    loading={isUpdatingProject}
                >
                    Ajouter une vidéo
                </Button>
            </div>
            <div className="flex flex-col gap-6">
                {rows.map((row, rowIdx) => (
                    <div key={rowIdx} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {row.map((video, idx) => {
                            const url = video?.url || '';
                            const youtubeId = getYoutubeId(url);
                            const globalIdx = rowIdx * 3 + idx;
                            return (
                                <div key={globalIdx}
                                     className="relative bg-white rounded-xl p-4 flex flex-col gap-2 shadow">
                                    {/* Edit/Delete icons */}
                                    <div className="absolute top-2 right-2 flex gap-2 z-10">
                                        <button
                                            className="bg-yellow-100 hover:bg-yellow-200 p-2 rounded-full"
                                            onClick={() => handleEditVideo(video, globalIdx)}
                                        >
                                            <Icon icon="hugeicons:pencil-edit-02" className="h-6 w-6 text-yellow-600"/>
                                        </button>
                                        <button
                                            className="bg-red-100 hover:bg-red-200 p-2 rounded-full"
                                            onClick={() => handleDeleteVideo(video, globalIdx)}
                                        >
                                            <Icon icon="hugeicons:delete-01" className="h-5 w-5 text-red-600"/>
                                        </button>
                                    </div>
                                    {/* Video info */}
                                    <div className="font-semibold">{video.name || "Video Name"}</div>
                                    <div className="text-xs text-gray-500 mb-2">
                                        Ajouté le : {(() => {
                                        if (!video.date) return "Date non spécifiée";
                                        try {
                                            const date = new Date(video.date);
                                            if (isNaN(date.getTime())) return "Date invalide";
                                            return date.toLocaleDateString('fr-FR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            });
                                        } catch (e) {
                                            return "Date invalide";
                                        }
                                    })()}
                                    </div>
                                    {/* Video preview or player */}
                                    <div
                                        className="relative w-full h-40 rounded-lg overflow-hidden flex items-center bg-gray-200">
                                        {playingIdx === globalIdx && youtubeId ? (
                                            <YouTube
                                                videoId={youtubeId}
                                                className="w-full h-full"
                                                opts={{
                                                    width: '100%',
                                                    height: '100%',
                                                    playerVars: {autoplay: 1}
                                                }}
                                                onEnd={() => setPlayingIdx(null)}
                                            />
                                        ) : (
                                            <button
                                                className="w-full h-full flex items-center justify-center relative"
                                                onClick={() => setPlayingIdx(globalIdx)}
                                                style={{outline: 'none'}}
                                            >
                                                <img
                                                    src={youtubeId
                                                        ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                                                        : 'https://via.placeholder.com/640x360?text=No+Preview'}
                                                    alt={video.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <span className="absolute inset-0 flex items-center justify-center">
                                                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                                                        <circle cx="30" cy="30" r="30" fill="rgba(0,0,0,0.4)"/>
                                                        <polygon points="25,20 45,30 25,40" fill="#fff"/>
                                                    </svg>
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
            {visibleCount < videos.length && (
                <div className="flex justify-center mt-6">
                    <button
                        className="px-6 py-2 bg-Golden text-white font-bold rounded-lg hover:bg-yellow-600 transition"
                        onClick={() => setVisibleCount(visibleCount + 3)}
                    >
                        Voir plus
                    </button>
                </div>
            )}

            {/* Add Video Modal */}
            <Modal
                title="Ajouter une vidéo"
                open={addModalVisible}
                onCancel={() => {
                    setAddModalVisible(false);
                    addForm.resetFields();
                }}
                footer={[
                    <Button key="cancel" onClick={() => {
                        setAddModalVisible(false);
                        addForm.resetFields();
                    }}>
                        Annuler
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={isUpdatingProject}
                        onClick={handleAddSubmit}
                    >
                        Ajouter
                    </Button>
                ]}
                width={600}
            >
                <Form form={addForm} layout="vertical">
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
            </Modal>

            {/* Edit Video Modal */}
            <Modal
                title="Modifier la vidéo"
                open={editModalVisible}
                onCancel={() => {
                    setEditModalVisible(false);
                    setSelectedVideo(null);
                    form.resetFields();
                }}
                footer={[
                    <Button key="cancel" onClick={() => {
                        setEditModalVisible(false);
                        setSelectedVideo(null);
                        form.resetFields();
                    }}>
                        Annuler
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        loading={isUpdatingProject}
                        onClick={handleEditSubmit}
                    >
                        Modifier
                    </Button>
                ]}
                width={600}
            >
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
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                open={deleteModalVisible}
                onCancel={() => {
                    setDeleteModalVisible(false);
                    setSelectedVideo(null);
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
                            cette vidéo ?
                        </span>
                    </div>
                    <div className='flex flex-row justify-center gap-10 mt-11'>
                        <button
                            className='text-black font-jakarta text-l hover:text-red-600'
                            onClick={() => {
                                setDeleteModalVisible(false);
                                setSelectedVideo(null);
                            }}
                        >
                            Annuler
                        </button>
                        <button
                            className='h-12 w-28 bg-[#FF2E2E] rounded-lg text-white font-jakarta text-l font-bold hover:bg-red-600'
                            onClick={handleDeleteSubmit}
                            disabled={isUpdatingProject}
                        >
                            {isUpdatingProject ? 'En cours...' : 'Supprimer'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ProjectVideos;