import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import InputField from '../../Components/InputForm/InputField'
import { Button, DatePicker, Input, Select, Space, Divider, Upload, Modal, message } from 'antd'
import data from '../../Data/state-municipality.json'
import axios from 'axios'
import useClients from '../../Hooks/ClientsHooks/useClients'
import dayjs from 'dayjs'
import useCreateProject from '../../Hooks/ProjectHooks/useCreateProject'
import { toast } from 'react-toastify'
import useProjects from "../../Hooks/ProjectHooks/useProjects.js";
import ImageUploader from "./ImageUploader.jsx";
import uploadFile from "../../Hooks/FileHooks/useUploadFile.js";
import useModifyProject from "../../Hooks/ProjectHooks/useModifyProject.js";
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import useProjectPhases from '../../Hooks/ProjectPhases/useProjectPhases';
import { useNavigate } from 'react-router-dom'

const CreateProjectForm = ({ handleCancel, project }) => {
    const [states, setStates] = useState([])
    const [state, setState] = useState()
    const [images, setImages] = useState([])
    const [deleteImage, setDeleteImage] = useState(false)
    const [clientsData, setClientsData] = useState([])
    const methods = useForm()
    const { handleSubmit, control, reset, setValue, watch } = methods
    const [cities, setCities] = useState([])
    const { projects, mutate: refreshProjects } = useProjects()
    const { data: phasesData } = useProjectPhases();

    const [address, setAddress] = useState()
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 })
    const [filter, setFilter] = useState({ search: "", status: "" })
    const { clients, isLoading } = useClients(filter, pagination)
    const { createProject, error, isMutating } = useCreateProject()
    const { modifyProject } = useModifyProject();

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

    // Add this function at the top level of your component
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    // Update the image handling in the form
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    // Add allowed file types constant
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const ALLOWED_FILE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf', '.xlsx'];

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const handleChange = ({ fileList: newFileList }) => {
        // Filter out non-image files
        const imageFiles = newFileList.filter(file => {
            // Check if it's a new file being uploaded
            if (file.originFileObj) {
                const fileType = file.originFileObj.type;
                const fileName = file.originFileObj.name.toLowerCase();
                const isValidType = ALLOWED_FILE_TYPES.includes(fileType);
                const isValidExtension = ALLOWED_FILE_EXTENSIONS.some(ext => fileName.endsWith(ext));

                if (!isValidType || !isValidExtension) {
                    message.error(`${file.name} is not a valid file type. Allowed types are: jpg, png, jpeg, pdf, xlsx`);
                    return false;
                }
            }
            return true;
        }).map((file, index) => ({
            ...file,
            uid: file.uid || `file-${index}-${Date.now()}`
        }));
        setFileList(imageFiles);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    // Add video state
    const [videos, setVideos] = useState([]);

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

    // Initialize form with project data if editing
    useEffect(() => {
        if (project) {
            setValue('name', project.name);
            setValue('description', project.description);
            setValue('status', project.status);
            setValue('dateStart', project.dateStart ? dayjs(project.dateStart) : null);
            setValue('dateEnd', project.dateEnd ? dayjs(project.dateEnd) : null);
            setValue('clientId', project.clientId);
            setValue('location', project.location);
            setValue('projectType', project.projectType);
            setValue('budget', project.budget);
            setValue('state', project.adress?.state);
            setValue('city', project.adress?.city);
            
            // Set address state
            if (project.adress) {
                setAddress(project.adress);
            }

            // Initialize phases
            if (project.phases && project.phases.length > 0) {
                const formattedPhases = project.phases.map(phase => ({
                    name: phase.name,
                    status: phase.status,
                    pourcentage: phase.pourcentage,
                    startDate: phase.startDate ? dayjs(phase.startDate) : null,
                    finishDate: phase.finishDate ? dayjs(phase.finishDate) : null
                }));
                setValue('phases', formattedPhases);
            }

            // Set images if they exist
            if (project.photos && project.photos.length > 0) {
                setImages(project.photos);
            }
        }
    }, [project, setValue]);

    useEffect(() => {
        const subscription = watch((_, { type }) => {
            if (type === 'reset') {
                setImages([]);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        return () => {
            setImages([]);
        };
    }, []);

    useEffect(() => {
        const getStates = () => {
            const newStates = data.map((s) => ({ value: s.Value, label: s.Name }))
            setStates(newStates)
        }
        getStates()
    }, [])

    useEffect(() => {
        const getClientsList = () => {
            const newClients = clients?.map((c) => ({ value: c._id, label: `${c.name} ${c.lastName}` }))
            setClientsData(newClients)
        }
        if (!isLoading) {
            getClientsList()
        }
    }, [clients, isLoading])

    const onSearchClient = (v) => {
        setFilter({ search: v, status: "" })
    }

    useEffect(() => {
        const getCities = () => {
            const stateData = data.find((s) => s.Value === state)
            const formattedCities = stateData?.Delegations?.map(d => ({
                value: d.Value,
                label: d.Name
            })) || []
            setCities(formattedCities)
        }
        getCities()
    }, [state])

    const onChangeState = (v) => {
        setState(v)
        setValue('city', undefined) // Reset city when state changes
    }

    const getCurrentPosition = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject)
            })
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&accept-language=fr`)
            setValue('state', res?.data?.address?.state)
            setValue('city', res?.data?.address?.city_district)
            setValue('location', res?.data?.display_name)
            setAddress({ ...res?.data?.address, lat: lat, lon: lon })
        } catch (e) {
            console.log(e)
        }
    }

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
                images: [],
                photos: [],
                video: videos // Add videos to project data
            };

            // First create the project
            const result = await createProject(projectData);
            const newProject = result?.data;

            if (!newProject || !newProject._id) {
                toast.error("Échec de la création du projet.");
                return;
            }

            // Then handle image uploads if there are any
            if (fileList.length > 0) {
                try {
                    const uploadedPhotos = await Promise.all(
                        fileList.map((file) =>
                            uploadFile({
                                file: file.originFileObj,
                                modelType: 'Project',
                                refId: newProject._id
                            })
                        )
                    );
                    
                    const photoIds = uploadedPhotos.map(res => res.data._id);
                    const imageUrls = uploadedPhotos.map(res => `uploads/Uploads_files/${res.data._id}`);
                    
                    if (photoIds.length > 0) {
                        // Update project with photo IDs and image URLs
                        await modifyProject({
                            id: newProject._id,
                            data: { 
                                photos: photoIds,
                                images: imageUrls
                            },
                        });
                    }
                } catch (uploadError) {
                    console.error("Error uploading images:", uploadError);
                    toast.error("Erreur lors du téléchargement des images.");
                }
            }

            toast.success("Projet créé avec succès");
            await refreshProjects();
            handleCancel();
            reset();
            setFileList([]);
            setVideos([]); // Reset videos
        } catch (error) {
            console.error("Error saving project:", error);
            toast.error("Erreur lors de la sauvegarde du projet.");
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

    return (
        <div className='h-full max-h-[43rem] overflow-y-auto'>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-row gap-2'>
                        <div className='flex flex-col gap-2 w-full'>
                            <InputField name="name" label="Nom du projet" placeholder="Nom" required="Nom propjet et obligatoire" className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4" />
                            <InputField name="description" label="Description" placeholder="Description" required="Description propjet et obligatoire" className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4" />
                            <div className='flex flex-col gap-2 px-2 '>
                                <label className='font-jakarta font-bold'>Date de début</label>
                                <Controller name='dateStart' control={control} render={({ field }) => (
                                    <DatePicker {...field} showTime={false} format="YYYY-MM-DD" onChange={(date) => field.onChange(date)} className='h-12 w-full' />
                                )} />
                            </div>
                            <div className='flex flex-col gap-1 px-2'>
                                <label className='font-jakarta font-bold'>Budget</label>
                                <Controller name='budget' control={control} render={({ field }) => (
                                    <Input {...field} suffix="TND" className='h-12 w-full' type='Number' />
                                )} />
                            </div>
                            <div className='flex flex-col gap-1 px-2'>
                                <label className='font-jakarta font-bold'>Adresse</label>
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
                                <div className='flex flex-col gap-1 px-2'>
                                    <label className='font-jakarta font-bold'>Délégation</label>
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

                        <div className='flex flex-col gap-2 w-full'>
                            <div className='flex flex-col gap-2 pt-5'>
                                <label className='font-jakarta font-bold'>Client</label>
                                <Controller name='clientId' control={control} render={({ field }) => (
                                    <Select {...field} options={clientsData} showSearch optionFilterProp='label' className='h-12 w-full' placeholder="Client" onSearch={onSearchClient} loading={isLoading} />
                                )} />
                            </div>
                            <div className='flex flex-col gap-1 px-2 pt-5'>
                                <label className='font-jakarta font-bold'>Status</label>
                                <Controller name='status' control={control} render={({ field }) => (
                                    <Select {...field} options={projstatus} className='h-12 w-full' />
                                )} />
                            </div>
                            <div className='flex flex-col gap-2 px-2'>
                                <label className='font-jakarta font-bold'>Date de fin</label>
                                <Controller name='dateEnd' control={control} render={({ field }) => (
                                    <DatePicker
                                        {...field}
                                        showTime={false}
                                        format="YYYY-MM-DD"
                                        onChange={(date) => field.onChange(date)}
                                        className='h-12 w-full'
                                    />
                                )} />
                            </div>

                            <div className='flex flex-col gap-1 px-2'>
                                <label className='font-jakarta font-bold'>Type de projet</label>
                                <Controller name='projectType' control={control} render={({ field }) => (
                                    <Select
                                        {...field}
                                        options={projTypes}
                                        className='h-12 w-full'
                                    />
                                )} />
                            </div>
                        </div>
                    </div>

                    {/* Phases Section */}
                    <div className='mt-6'>
                        <Divider orientation="left">Phases du projet</Divider>
                        <div className='space-y-4'>
                            {phases.map((_, index) => (
                                <div key={`phase-${index}-${Date.now()}`} className='flex flex-col gap-4 p-4 border rounded-lg'>
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

                    {/* Footer: Address and Image Upload */}
                    <div className='flex flex-col gap-2 mt-6'>
                        <div className='flex flex-col gap-3'>
                            <InputField
                                name="location"
                                label="Adresse complète"
                                placeholder="Adresse complète"
                                required="Adresse complète est obligatoire"
                                className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
                            />
                            <div className='flex flex-row justify-end'>
                                <Button type='button' onClick={getCurrentPosition}>
                                    Obtenir l'emplacement actuel
                                </Button>
                            </div>

                            <div className="p-3">
                                <h1 className="font-semibold text-md">Les images</h1>
                                <div className="flex flex-col gap-2">
                                    <label className='font-jakarta font-bold'>Images</label>
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                        beforeUpload={(file) => {
                                            const isValidType = ALLOWED_FILE_TYPES.includes(file.type);
                                            const fileName = file.name.toLowerCase();
                                            const isValidExtension = ALLOWED_FILE_EXTENSIONS.some(ext => fileName.endsWith(ext));

                                            if (!isValidType || !isValidExtension) {
                                                message.error(`${file.name} is not a valid file type. Allowed types are: jpg, png, jpeg, pdf, xlsx`);
                                                return Upload.LIST_IGNORE;
                                            }
                                            return false; // Prevent auto upload
                                        }}
                                        multiple
                                    >
                                        {fileList.length >= 8 ? null : uploadButton}
                                    </Upload>
                                    <Modal
                                        open={previewOpen}
                                        title={previewTitle}
                                        footer={null}
                                        onCancel={handleCancel}
                                    >
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </div>

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

                            <div className='flex flex-row justify-end'>
                                <button
                                    type='submit'
                                    className='group h-12 w-32 mt-4 bg-Golden rounded-lg hover:bg-transparent hover:border-2 hover:border-yellow-300'
                                >
                                    <span className='font-jakarta font-bold text-[#3A3541] group-hover:text-black'>
                                        Créer
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default CreateProjectForm