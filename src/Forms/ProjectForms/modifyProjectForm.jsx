import React, { useEffect, useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import InputField from '../../Components/InputForm/InputField'
import { Button, DatePicker, Input, Select } from 'antd'
import data from '../../Data/state-municipality.json'
import axios from 'axios'
import useClients from '../../Hooks/ClientsHooks/useClients'
import useModifyProject from '../../Hooks/ProjectHooks/useModifyProject'
import { mutate } from 'swr'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import useProjects from "../../Hooks/ProjectHooks/useProjects.js";

const ModifyProjectForm = ({ project, handleCancel, refreshProjects }) => {
    const [states, setStates] = useState([])
    const [state, setState] = useState()
    const [clientsData, setClientsData] = useState([])
    const [cities, setCities] = useState([])
    const [address, setAddress] = useState(project?.address || {})

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
            city: project?.address?.city || '',
            lat: project?.lat || '',
            lon: project?.lon || ''
        }
    })

    const { handleSubmit, control, reset, setValue, watch } = methods
    const { clients, isLoading } = useClients({ search: '', status: '' }, { current: 1, pageSize: 10 })
    const { modifyProject, updatedProject, isMutating } = useModifyProject()

    useEffect(() => {
        const newStates = data.map(s => ({ value: s.Value, label: s.Name }))
        setStates(newStates)
    }, [])

    useEffect(() => {
        if (project) {
            console.log('Project data when modifying:', project);
            
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
                state: project.address?.city_district || '',
                city: project.address?.city || '',
                lat: project.lat || '',
                lon: project.lon || ''
            });
            setAddress(project?.address || {});
            setState(project?.address?.city_district || '');
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
            const loadingToast = toast.loading("Modification du projet en cours...");

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
                images: project?.images || [],
                photos: project?.photos || [],
                video: project?.video || []
            };

            console.log('Project Data being sent:', projectData);

            // Update the project
            const result = await modifyProject({ id: project._id, data: projectData });
            
            // Dismiss loading toast
            toast.dismiss(loadingToast);
            
            if (result?.data) {
                toast.success("Projet modifié avec succès!");
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

    const projTypes = [
        { value: 'Résidentiel', label: 'Résidentiel' },
        { value: 'Commercial', label: 'Commercial' },
        { value: 'Industriel', label: 'Industriel' },
        { value: 'Rénovation', label: 'Rénovation ' },
        { value: 'Infrastructure ', label: 'Infrastructure ' }
    ]

    return (
        <div className='h-full max-h-[48rem] overflow-y-auto'>
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
                                    <Select {...field} options={clientsData} showSearch optionFilterProp='label' className='h-12 w-full' placeholder="Client" onSearch={onSearchClient} loading={isLoading} />
                                )}/>
                            </div>
                            <div className='flex flex-col gap-1 px-2 pt-5'>
                                <label className='font-jakarta font-bold'>Status</label>
                                <Controller name='status' control={control} render={({field}) => (
                                    <Select {...field} options={projstatus} className='h-12 w-full' />
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
                                            className='h-12'
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
                                disabled={isMutating}
                            />
                            <div className='flex flex-row justify-end'>
                                <Button 
                                    type='button' 
                                    onClick={getCurrentPosition}
                                    disabled={isMutating}
                                >
                                    Obtenir l'emplacement actuel
                                </Button>
                            </div>

                            <div className='flex flex-row justify-end gap-4'>
                                <button 
                                    type='button' 
                                    onClick={handleCancel} 
                                    className='group hover:text-red-500 mt-4'
                                    disabled={isMutating}
                                >
                                    <span className='font-jakarta font-medium size-3 group-hover:text-red-600'>Annuler</span>
                                </button>
                                <button 
                                    type='submit' 
                                    className='group h-12 w-32 mt-4 bg-Golden rounded-lg hover:bg-transparent hover:border-2 hover:border-yellow-300'
                                    disabled={isMutating}
                                >
                                    <span className='font-bold text-[#3A3541] group-hover:text-black'>
                                        {isMutating ? 'Modification...' : 'Modifier'}
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

export default ModifyProjectForm
