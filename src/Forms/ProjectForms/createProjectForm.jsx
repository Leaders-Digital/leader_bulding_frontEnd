import React, {useEffect, useState} from 'react'
import {Controller, FormProvider, useForm} from 'react-hook-form'
import InputField from '../../Components/InputForm/InputField'
import {Button, DatePicker, Input, Select} from 'antd'
import data from '../../Data/state-municipality.json'
import axios from 'axios'
import useClients from '../../Hooks/ClientsHooks/useClients'
import dayjs from 'dayjs'
import useCreateProject from '../../Hooks/ProjectHooks/useCreateProject'
import {toast} from 'react-toastify'
import useProjects from "../../Hooks/ProjectHooks/useProjects.js";

const CreateProjectForm = ({handleCancel, project}) => {
    const [states, setStates] = useState([])
    const [state, setState] = useState()
    const [clientsData, setClientsData] = useState([])
    const methods = useForm()
    const {handleSubmit, control, reset, setValue, watch} = methods
    const [cities, setCities] = useState([])
    const {projects, mutate: refreshProjects} = useProjects()
    const [address, setAddress] = useState()
    const [pagination, setPagination] = useState({current: 1, pageSize: 10})
    const [filter, setFilter] = useState({search: "", status: ""})
    const {clients, isLoading} = useClients(filter, pagination)
    const {createProject, error, isMutating} = useCreateProject()

    useEffect(() => {
        const getStates = () => {
            const newStates = data.map((s) => ({value: s.Value, label: s.Name}))
            setStates(newStates)
        }
        getStates()
    }, [])

    useEffect(() => {
        const getClientsList = () => {
            const newClients = clients?.map((c) => ({value: c._id, label: `${c.name} ${c.lastName}`}))
            setClientsData(newClients)
        }
        if (!isLoading) {
            getClientsList()
        }
    }, [clients, isLoading])

    const onSearchClient = (v) => {
        setFilter({search: v, status: ""})
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
            setAddress({...res?.data?.address, lat: lat, lon: lon})
        } catch (e) {
            console.log(e)
        }
    }

    const onSubmit = async (data) => {
        try {
            const daytoStart = dayjs(data.dateStart).format("YYYY-MM-DD HH:mm");
            const daytoEnd = dayjs(data.dateEnd).format("YYYY-MM-DD HH:mm");

            // Validate that end date is not before start date
            if (dayjs(data.dateEnd).isBefore(dayjs(data.dateStart))) {
                toast.error("La date de fin ne peut pas être antérieure à la date de début");
                return;
            }

            // Show loading toast
            const loadingToast = toast.loading("Création du projet en cours...");

            // Get the selected state and city data
            const selectedState = states.find(s => s.value === data.state);
            const selectedCity = cities.find(c => c.value === data.city);

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
                    state: selectedState?.label || data.state || '',
                    city: selectedCity?.label || data.city || '',
                    city_district: selectedState?.label || data.state || ''
                },
                lat: address?.lat || "",
                lon: address?.lon || "",
                images: [],
                photos: [],
                video: []
            };

            // Create the project
            const result = await createProject(projectData);

            // Dismiss loading toast
            toast.dismiss(loadingToast);

            if (result?.data) {
                toast.success("Projet créé avec succès!");
                await refreshProjects();
                handleCancel();
                reset();
            }
        } catch (error) {
            console.error("Error saving project:", error);
            toast.error("Erreur lors de la création du projet");
        }
    };

    const projstatus = [
        {value: 'Planification ', label: 'Planification '},
        {value: 'En Cours', label: 'En Cours'},
        {value: 'Terminé ', label: 'Terminé '},
        {value: 'En Pause', label: 'En Pause '},
        {value: 'Annulé ', label: 'Annulé '}
    ]

    const projTypes = [
        {value: 'Résidentiel', label: 'Résidentiel'},
        {value: 'Commercial', label: 'Commercial'},
        {value: 'Industriel', label: 'Industriel'},
        {value: 'Rénovation', label: 'Rénovation '},
        {value: 'Infrastructure ', label: 'Infrastructure '}
    ]

    return (
        <div className='h-full max-h-[46rem] overflow-y-auto'>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-row gap-2'>
                        <div className='flex flex-col gap-2 w-full'>
                            <InputField name="name" label="Nom du projet" placeholder="Nom"
                                        required="Nom propjet et obligatoire"
                                        className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"/>
                            <InputField name="description" label="Description" placeholder="Description"
                                        required="Description propjet et obligatoire"
                                        className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"/>
                            <div className='flex flex-col gap-2 px-2 '>
                                <label className='font-jakarta font-bold'>Date de début</label>
                                <Controller name='dateStart' control={control} render={({field}) => (
                                    <DatePicker {...field} showTime={false} format="YYYY-MM-DD"
                                                onChange={(date) => field.onChange(date)} className='h-12 w-full'/>
                                )}/>
                            </div>
                            <div className='flex flex-col gap-1 px-2'>
                                <label className='font-jakarta font-bold'>Budget</label>
                                <Controller name='budget' control={control} render={({field}) => (
                                    <Input {...field} suffix="TND" className='h-12 w-full' type='Number'/>
                                )}/>
                            </div>

                            <div className='flex flex-col gap-1 px-2'>
                                <label className='font-jakarta font-bold'>Ville</label>
                                <Controller name='state' control={control} render={({field}) => (
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
                                )}/>
                            </div>

                        </div>

                        <div className='flex flex-col gap-2 w-full'>
                            <div className='flex flex-col gap-2 pt-5'>
                                <label className='font-jakarta font-bold'>Client</label>
                                <Controller name='clientId' control={control} render={({field}) => (
                                    <Select {...field} options={clientsData} showSearch optionFilterProp='label'
                                            className='h-12 w-full' placeholder="Client" onSearch={onSearchClient}
                                            loading={isLoading}/>
                                )}/>
                            </div>
                            <div className='flex flex-col gap-1 px-2 pt-5'>
                                <label className='font-jakarta font-bold'>Status</label>
                                <Controller name='status' control={control} render={({field}) => (
                                    <Select {...field} options={projstatus} className='h-12 w-full'/>
                                )}/>
                            </div>
                            <div className='flex flex-col gap-2 px-2'>
                                <label className='font-jakarta font-bold'>Date de fin</label>
                                <Controller name='dateEnd' control={control} render={({field}) => (
                                    <DatePicker
                                        {...field}
                                        showTime={false}
                                        format="YYYY-MM-DD"
                                        onChange={(date) => field.onChange(date)}
                                        className='h-12 w-full'
                                        disabledDate={(current) => {
                                            const startDate = watch('dateStart');
                                            return startDate && current && current.isBefore(dayjs(startDate), 'day');
                                        }}
                                    />
                                )}/>
                            </div>

                            <div className='flex flex-col gap-1 px-2'>
                                <label className='font-jakarta font-bold'>Type de projet</label>
                                <Controller name='projectType' control={control} render={({field}) => (
                                    <Select
                                        {...field}
                                        options={projTypes}
                                        className='h-12 w-full'
                                    />
                                )}/>
                            </div>
                            <div className='flex flex-col gap-1 px-2'>
                                <label className='font-jakarta font-bold'>Délégation</label>
                                <Controller
                                    name='city'
                                    control={control}
                                    render={({field}) => (
                                        <Select
                                            {...field}
                                            showSearch
                                            optionFilterProp='label'
                                            options={cities}
                                            className='h-12 '
                                            placeholder="Délégation"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
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