import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import InputField from '../../Components/InputForm/InputField'
import { Button, DatePicker, Input, Select, Space, Divider, Upload, Modal, message } from 'antd'
import data from '../../Data/state-municipality.json'
import axios from 'axios'
import useClients from '../../Hooks/ClientsHooks/useClients'
import useModifyProject from '../../Hooks/ProjectHooks/useModifyProject'
import { mutate } from 'swr'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import useProjects from "../../Hooks/ProjectHooks/useProjects.js";
import ImageUploader from "./ImageUploader.jsx";
import useFile from "../../Hooks/FileHooks/useFile.js";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import useProjectPhases from '../../Hooks/ProjectPhases/useProjectPhases';
import { useNavigate } from 'react-router-dom'
import uploadFile from "../../Hooks/FileHooks/useUploadFile.js";

const ModifyProjectForm = ({ project, handleCancel, refreshProjects }) => {
    const [states, setStates] = useState([])
    const [state, setState] = useState()
    const [clientsData, setClientsData] = useState([])
    const [cities, setCities] = useState([])
    const [images, setImages] = useState([])
    const [address, setAddress] = useState(project?.address || {})
    const { file, error, mutate } = useFile(project._id, "Project")
    const { data: phasesData } = useProjectPhases();
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [deletedImages, setDeletedImages] = useState([]);
    const [videos, setVideos] = useState(project?.video || []);

    useEffect(() => {
        if (file) {
            setImages(file);
        }
    }, [file]);

    const methods = useForm({
        defaultValues: {
            name: project?.name || '',
            clientId: project?.clientId || '',
            description: project?.description || '',
            status: project?.status || '',
            dateStart: project?.dateStart ? dayjs(project.dateStart) : null,
            dateEnd: project?.dateEnd ? dayjs(project.dateEnd) : null,
            budget: project?.budget || '',
            location: project?.location || '',
            projectType: project?.projectType || '',
            state: project?.address?.city_district || '',
            city: project?.address?.
                city_district || '',
            lat: project?.lat || '',
            lon: project?.lon || '',
            phases: project?.phases || []
        }
    })

    const { handleSubmit, control, reset, setValue, watch } = methods
    const { clients, isLoading } = useClients({ search: '', status: '' }, { current: 1, pageSize: 10 })
    const { modifyProject, updatedProject, isMutating } = useModifyProject()

    // Watch the phases field
    const phases = watch('phases') || [];

    // Transform phases data for dropdown
    const phaseOptions = React.useMemo(() => {
        if (!phasesData) return [];
        return phasesData.map(phase => ({
            value: phase.name,
            label: phase.name
        }));
    }, [phasesData]);

    useEffect(() => {
        const newStates = data.map(s => ({ value: s.Value, label: s.Name }))
        setStates(newStates)
    }, [])

    useEffect(() => {
        if (project) {
            console.log('Project data when modifying:', project);
            console.log('Project photos:', project.photos);
            console.log('Project images:', project.images);
            
            // Format phases with proper dayjs dates
            const formattedPhases = project.phases?.map(phase => ({
                name: phase.name || '',
                status: phase.status || 'en attente',
                pourcentage: phase.pourcentage || 0,
                startDate: phase.startDate ? dayjs(phase.startDate) : null,
                finishDate: phase.finishDate ? dayjs(phase.finishDate) : null
            })) || [];

            reset({
                name: project.name || '',
                clientId: project.clientId?._id || project.clientId || '',
                description: project.description || '',
                status: project.status || '',
                dateStart: project.dateStart ? dayjs(project.dateStart) : null,
                dateEnd: project.dateEnd ? dayjs(project.dateEnd) : null,
                budget: project.budget || '',
                location: project.location || '',
                projectType: project.projectType || '',
                state: project.address?.
                    city_district || '',
                city: project.address?.city || '',
                lat: project.lat || '',
                lon: project.lon || '',
                phases: formattedPhases
            });
            setAddress(project?.address || {});
            setState(project?.address?.state || '');
        }
    }, [project, reset]);

    useEffect(() => {
        if (!isLoading) {
            const newClients = clients.map(c => ({
                value: c._id,
                label: `${c.name} ${c.lastName}`
            }))
            setClientsData(newClients)
        }
    }, [clients, isLoading])

    useEffect(() => {
        if (project?.address?.state) {
            setState(project.address.state)
        }
    }, [project])

    useEffect(() => {
        const stateData = data.find(s => s.Value === state)
        const formattedCities = stateData?.Delegations?.map(d => ({
            value: d.Value,
            label: d.Name
        })) || []
        setCities(formattedCities)
    }, [state])

    const onChangeState = (v) => {
        setState(v)
        setValue('city', undefined) // Reset city when state changes
    }

    const onSearchClient = (v) => {
        setFilter({ search: v, status: "" })
    }

    const getCurrentPosition = async () => {
        try {
            const position = await new Promise((resolve, reject) =>
                navigator.geolocation.getCurrentPosition(resolve, reject)
            )
            const { latitude: lat, longitude: lon } = position.coords
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=fr`)
            setValue('state', res?.data?.address?.state)
            setValue('city', res?.data?.address?.city_district)
            setValue('location', res?.data?.display_name)
            setAddress({ ...res?.data?.address, lat, lon })
        } catch (e) {
            console.error(e)
        }
    }

    // Update the file handling
    useEffect(() => {
        console.log('Project photos:', project?.photos);
        console.log('File data:', file?.data);
        
        if (file?.data) {
            // Map all files to their IDs for easy lookup
            const fileMap = file.data.reduce((acc, fileData) => {
                acc[fileData._id] = fileData;
                return acc;
            }, {});

            // Get files that are in project.photos
            const validFiles = project?.photos
                ?.map(photo => {
                    // If photo is an object with _id, use that, otherwise use the photo directly
                    const photoId = photo._id || photo;
                    return fileMap[photoId];
                })
                .filter(Boolean) || [];

            console.log('Valid files:', validFiles);

            if (validFiles.length > 0) {
                const initialFiles = validFiles.map((fileData, index) => {
                    const imageUrl = `http://localhost:5000/${fileData.FilePath}`;
                    console.log('Creating file entry for:', imageUrl);
                    return {
                        uid: fileData._id,
                        name: fileData.originalName || `image-${index}`,
                        status: 'done',
                        url: imageUrl,
                        type: fileData.fileType || 'image/jpeg'
                    };
                });
                console.log('Setting fileList to:', initialFiles);
                setFileList(initialFiles);
            } else {
                console.log('No valid files found, resetting fileList');
                setFileList([]);
            }
        } else {
            console.log('No file data available, resetting fileList');
            setFileList([]);
        }
    }, [file?.data, project?.photos]);

    const handlePreviewCancel = () => setPreviewOpen(false);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList, file: currentFile }) => {
        // Handle file removal
        if (currentFile.status === 'removed') {
            // If it's an existing file (has uid starting with a letter/number), add to deletedImages
            if (currentFile.uid && !currentFile.uid.startsWith('-')) {
                setDeletedImages(prev => [...prev, currentFile.uid]);
            }
            const remainingFiles = fileList.filter(f => f.uid !== currentFile.uid);
            setFileList(remainingFiles);
            return;
        }

        // Filter out non-image files
        const imageFiles = newFileList.filter(file => {
            // For existing files, check the type property we added
            if (file.type) {
                return file.type.startsWith('image/');
            }
            // For new files, check the originFileObj
            const isImage = file.originFileObj?.type?.startsWith('image/');
            if (!isImage) {
                message.error(`${file.name} is not an image file`);
            }
            return isImage;
        });
        setFileList(imageFiles);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    // Add video handling functions
    const handleAddVideo = () => {
        setVideos([...videos, { name: '', description: '', link: '' }]);
    };

    const handleRemoveVideo = (index) => {
        const newVideos = [...videos];
        newVideos.splice(index, 1);
        setVideos(newVideos);
    };

    const handleVideoChange = (index, field, value) => {
        const newVideos = [...videos];
        newVideos[index] = { ...newVideos[index], [field]: value };
        setVideos(newVideos);
    };

    const onSubmit = async (data) => {
        try {
            const daytoStart = dayjs(data.dateStart).format("YYYY-MM-DD HH:mm");
            const daytoEnd = dayjs(data.dateEnd).format("YYYY-MM-DD HH:mm");

            // Format phases data
            const formattedPhases = data.phases?.map(phase => ({
                name: phase.name,
                status: phase.status,
                pourcentage: phase.pourcentage,
                startDate: phase.startDate ? dayjs(phase.startDate).format("YYYY-MM-DD HH:mm") : null,
                finishDate: phase.finishDate ? dayjs(phase.finishDate).format("YYYY-MM-DD HH:mm") : null
            })) || [];

            // Get the selected state and city data
            const selectedState = states.find(s => s.value === data.city);
            const selectedCity = cities.find(c => c.value === data.state);

            // Handle image uploads
            const newImages = fileList.filter(file => file.originFileObj);
            const existingImages = fileList
                .filter(file => !file.originFileObj)
                .map(file => {
                    const url = file.url;
                    return url.replace('http://localhost:5000/', '');
                });

            console.log('New images to upload:', newImages);
            console.log('Existing images:', existingImages);

            // First update the project with the current image list
            const projectData = {
                name: data.name,
                clientId: data.clientId,
                description: data.description,
                status: data.status,
                dateStart: daytoStart,
                dateEnd: daytoEnd,
                budget: data.budget,
                location: data.location,
                projectType: data.projectType,
                address: {
                    ...address,
                    state: selectedState?.label || data.city || '',
                    city: selectedState?.label || data.city || '',
                    city_district: selectedCity?.label || data.state || ''
                },
                lat: address?.lat || "",
                lon: address?.lon || "",
                phases: formattedPhases,
                images: existingImages,
                photos: fileList
                    .filter(file => !file.originFileObj)
                    .map(file => file.uid),
                video: videos // Add videos to project data
            };

            console.log('Project Data being sent:', projectData);

            // First update the project with current data
            const result = await modifyProject({ id: project._id, data: projectData });
            
            if (result?.data) {
                // Handle new image uploads
                if (newImages.length > 0) {
                    try {
                        const uploadedPhotos = await Promise.all(
                            newImages.map((file) =>
                                uploadFile({
                                    file: file.originFileObj,
                                    modelType: 'Project',
                                    refId: project._id
                                })
                            )
                        );
                        
                        const photoIds = uploadedPhotos.map(res => res.data._id);
                        console.log('New photo IDs:', photoIds);
                        
                        if (photoIds.length > 0) {
                            // Update project with new photo IDs
                            await modifyProject({
                                id: project._id,
                                data: { 
                                    photos: [...projectData.photos, ...photoIds],
                                    images: [...existingImages, ...photoIds.map(id => `uploads/Uploads_files/${id}`)]
                                },
                            });
                        }
                    } catch (uploadError) {
                        console.error("Error uploading images:", uploadError);
                        toast.error("Erreur lors du téléchargement des images.");
                    }
                }

                toast.success("Projet modifié avec succès");
                await refreshProjects();
                handleCancel();
            }
        } catch (error) {
            console.error('Error modifying project:', error);
            toast.error("Erreur lors de la modification du projet");
        }
    };

    const projstatus = [
        { value: 'Planification ', label: 'Planification ' },
        { value: 'En Cours', label: 'En Cours' },
        { value: 'Terminé ', label: 'Terminé ' },
        { value: 'En Pause', label: 'En Pause ' },
        { value: 'Annulé ', label: 'Annulé ' }
    ]

    const phaseStatus = [
        { value: 'en attente', label: 'En attente' },
        { value: 'en cours', label: 'En cours' },
        { value: 'terminé', label: 'Terminé' }
    ]

    const projTypes = [
        { value: 'Résidentiel', label: 'Résidentiel' },
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Industriel', label: 'Industriel' },
        { value: 'Rénovation', label: 'Rénovation ' },
        { value: 'Infrastructure ', label: 'Infrastructure ' }
    ]

    // Add this function at the top level of your component
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    return (
        <div className='h-full max-h-[43rem] overflow-y-auto'>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <InputField name="name" label="Nom du projet" required className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4" />
                            </div>
                            <div className="w-1/2 mt-6">
                                <Controller 
                                    name="clientId" 
                                    control={control} 
                                    render={({ field }) => (
                                        <>
                                            <label className='font-bold text-[#3A3541]'>Client</label>
                                            <Select 
                                                {...field} 
                                                options={clientsData} 
                                                showSearch 
                                                optionFilterProp="label" 
                                                placeholder="Client" 
                                                loading={isLoading} 
                                                className='h-12 w-full'
                                                onSearch={onSearchClient}
                                            />
                                        </>
                                    )} 
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <InputField name="description" label="Description" required className="h-12 w-full bg-[#F4F5F9] p-4" />
                            </div>
                            <div className="w-1/2 pt-6">
                                <Controller name="status" control={control} render={({ field }) => (
                                    <>
                                        <label className='font-bold text-[#3A3541]'>Status</label>
                                        <Select {...field} options={projstatus} className='h-12 w-full' />
                                    </>
                                )} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className='font-bold text-[#3A3541]'>Date de début</label>
                                <Controller name="dateStart" control={control} render={({ field }) => (
                                    <DatePicker {...field} format="YYYY-MM-DD" className='h-12 w-full' />
                                )} />
                            </div>
                            <div className="w-1/2">
                                <label className='font-bold text-[#3A3541]'>Date de fin</label>
                                <Controller name="dateEnd" control={control} render={({ field }) => (
                                    <DatePicker {...field} format="YYYY-MM-DD" className='h-12 w-full' />
                                )} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <label className='font-bold text-[#3A3541]'>Budget</label>
                                <Controller name="budget" control={control} render={({ field }) => (
                                    <Input {...field} suffix="TND" className='h-12 w-full' type="number" />
                                )} />
                            </div>
                            <div className="w-1/2">
                                <label className='font-bold text-[#3A3541]'>Type de projet</label>
                                <Controller name="projectType" control={control} render={({ field }) => (
                                    <Select {...field} options={projTypes} className='h-12 w-full' />
                                )} />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <div className='flex flex-col gap-1 px-2'>
                                    <label className='font-jakarta font-bold'>Ville</label>
                                    <Controller name='city' control={control} render={({ field }) => (
                                        <Select 
                                            {...field} 
                                            showSearch 
                                            optionFilterProp='label' 
                                            options={states} 
                                            className='h-12' 
                                            placeholder="Ville" 
                                            onChange={(value) => {
                                                field.onChange(value);
                                                onChangeState(value);
                                            }} 
                                        />
                                    )} />
                                </div>
                            </div>
                            <div className="w-1/2">
                                <div className='flex flex-col gap-2 px-2'>
                                    <Controller
                                        name='state'
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                showSearch
                                                optionFilterProp='label'
                                                options={cities}
                                                className='h-12 mt-10'
                                                placeholder="Délégation"
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Phases Section */}
                        <div className='mt-6'>
                            <Divider orientation="left">Phases du projet</Divider>
                            <div className='space-y-4'>
                                {phases.map((_, index) => (
                                    <div key={index} className='flex flex-col gap-4 p-4 border rounded-lg'>
                                        <div className='flex justify-between items-center'>
                                            <h3 className='font-semibold'>Phase {index + 1}</h3>
                                            {phases.length > 1 && (
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<MinusCircleOutlined />}
                                                    onClick={() => {
                                                        const currentPhases = [...phases];
                                                        currentPhases.splice(index, 1);
                                                        setValue('phases', currentPhases);
                                                    }}
                                                />
                                            )}
                                        </div>
                                        <div className='grid grid-cols-2 gap-4'>
                                            <div>
                                                <label className='font-jakarta font-bold'>Nom de la phase</label>
                                                <Controller
                                                    name={`phases.${index}.name`}
                                                    control={control}
                                                    rules={{ required: 'Le nom de la phase est requis' }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={phaseOptions}
                                                            className='h-12 w-full'
                                                            placeholder="Sélectionner une phase"
                                                            showSearch
                                                            optionFilterProp="label"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label className='font-jakarta font-bold'>Status</label>
                                                <Controller
                                                    name={`phases.${index}.status`}
                                                    control={control}
                                                    rules={{ required: 'Le status est requis' }}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            options={phaseStatus}
                                                            className='h-12 w-full'
                                                            placeholder="Status de la phase"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label className='font-jakarta font-bold'>Pourcentage</label>
                                                <Controller
                                                    name={`phases.${index}.pourcentage`}
                                                    control={control}
                                                    rules={{ required: 'Le pourcentage est requis' }}
                                                    render={({ field }) => (
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            min={0}
                                                            max={100}
                                                            suffix="%"
                                                            className='h-12'
                                                            placeholder="Pourcentage de complétion"
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label className='font-jakarta font-bold'>Date de début</label>
                                                <Controller
                                                    name={`phases.${index}.startDate`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <DatePicker
                                                            {...field}
                                                            value={field.value ? dayjs(field.value) : null}
                                                            showTime={false}
                                                            format="YYYY-MM-DD"
                                                            onChange={(date) => field.onChange(date)}
                                                            className='h-12 w-full'
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div>
                                                <label className='font-jakarta font-bold'>Date de fin</label>
                                                <Controller
                                                    name={`phases.${index}.finishDate`}
                                                    control={control}
                                                    render={({ field }) => (
                                                        <DatePicker
                                                            {...field}
                                                            value={field.value ? dayjs(field.value) : null}
                                                            showTime={false}
                                                            format="YYYY-MM-DD"
                                                            onChange={(date) => field.onChange(date)}
                                                            className='h-12 w-full'
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    type="dashed"
                                    onClick={() => {
                                        const currentPhases = [...phases];
                                        currentPhases.push({
                                            name: '',
                                            status: 'en attente',
                                            pourcentage: 0,
                                            startDate: null,
                                            finishDate: null
                                        });
                                        setValue('phases', currentPhases);
                                    }}
                                    icon={<PlusOutlined />}
                                    className='w-full'
                                >
                                    Ajouter une phase
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col mt-4 gap-2">
                            <InputField name="location" label="Adresse totale" required className="h-12 w-full bg-[#F4F5F9] p-4" />
                            <div className="flex justify-end">
                                <Button onClick={getCurrentPosition}>Obtenir l'emplacement actuel</Button>
                            </div>
                            <div className="p-3">
                                <h1 className="font-semibold text-md">Les images</h1>
                                <div className="flex flex-col gap-2">
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                        beforeUpload={() => false}
                                        multiple
                                    >
                                        {fileList.length >= 8 ? null : uploadButton}
                                    </Upload>
                                    <Modal
                                        open={previewOpen}
                                        title={previewTitle}
                                        footer={null}
                                        onCancel={handlePreviewCancel}
                                    >
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </div>

                            {/* Add Video Section */}
                            <div className="p-3">
                                <h1 className="font-semibold text-md">Les vidéos</h1>
                                <div className="flex flex-col gap-4">
                                    {videos.map((video, index) => (
                                        <div key={index} className="flex flex-col gap-2 p-4 border rounded-lg">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-semibold">Vidéo {index + 1}</h3>
                                                <Button
                                                    type="text"
                                                    danger
                                                    icon={<MinusCircleOutlined />}
                                                    onClick={() => handleRemoveVideo(index)}
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                <div>
                                                    <label className="font-jakarta font-bold">Nom de la vidéo</label>
                                                    <Input
                                                        value={video.name}
                                                        onChange={(e) => handleVideoChange(index, 'name', e.target.value)}
                                                        placeholder="Nom de la vidéo"
                                                        className="h-12"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="font-jakarta font-bold">Description</label>
                                                    <Input.TextArea
                                                        value={video.description}
                                                        onChange={(e) => handleVideoChange(index, 'description', e.target.value)}
                                                        placeholder="Description de la vidéo"
                                                        rows={3}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="font-jakarta font-bold">Lien YouTube</label>
                                                    <Input
                                                        value={video.link}
                                                        onChange={(e) => handleVideoChange(index, 'link', e.target.value)}
                                                        placeholder="https://www.youtube.com/watch?v=..."
                                                        className="h-12"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <Button
                                        type="dashed"
                                        onClick={handleAddVideo}
                                        icon={<PlusOutlined />}
                                        className="w-full"
                                    >
                                        Ajouter une vidéo
                                    </Button>
                                </div>
                            </div>

                            <div className='flex flex-row justify-end gap-4'>
                                <button type='button' onClick={handleCancel} className='group hover:text-red-500 mt-4'>
                                    <span className='font-jakarta font-medium size-3 group-hover:text-red-600'>Annuler</span>
                                </button>
                                <button type='submit' className='group h-12 w-32 mt-4 bg-Golden rounded-lg hover:bg-transparent hover:border-2 hover:border-yellow-300'>
                                    <span className='font-bold text-[#3A3541] group-hover:text-black'>Modifier</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default ModifyProjectForm
