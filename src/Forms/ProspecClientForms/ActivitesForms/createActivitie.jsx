import React, { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import InputField from '../../../Components/InputForm/InputField'
import { DatePicker, Select } from 'antd'
import dayjs from 'dayjs'
import useCreateActivity from '../../../Hooks/ActivitiesHooks/useCreateActivity'
import { toast } from 'react-toastify'

const CreateActivitie = ({ prospect, openModal, onSuccess }) => {
    const methods = useForm()
    const { createActivity, error, isMutating } = useCreateActivity()
    const { handleSubmit, reset, control } = methods
    
    const activities = [
        { value: "Appel téléphonique", label: "Appel téléphonique" },
        { value: "Rendez-vous physique", label: "Rendez-vous physique" },
        { value: "Relance", label: "Relance" },
        { value: "Envoi documents", label: "Envoi documents" },
        { value: "Evénement", label: "Evénement" },
        { value: "Envoi Mail", label: "Envoi Mail" }
    ]

    const onSubmit = async (data) => {
        try {
            const newdate = dayjs(data.date).format("YYYY-MM-DD HH:mm");
            data = { ...data, date: newdate, propspectId: prospect }
            
            const result = await createActivity(data)
            if (result.data) {
                toast.success("activity created")
                reset()
                onSuccess?.()
                openModal(false)
            }
        } catch (err) {
            console.error("Error creating activity:", err)
            toast.error("Failed to create activity")
        }
    }

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])

    return (
        <div className='h-full max-h-[43rem]'>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-2 mt-3 px-3'>
                        <label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
                            Type d'activité
                        </label>
                        <Controller
                            name='activity'
                            control={control}
                            render={({ field }) => (
                                <Select {...field} options={activities} className='h-12 w-full' />
                            )}
                        />
                    </div>
                    <InputField
                        name="description"
                        label="Description"
                        placeholder="Description"
                        required="description is required"
                        className="h-24 w-full rounded-lg bg-[#F4F5F9] p-4"
                    />
                    <div className='flex flex-col gap-2 mt-3 px-3'>
                        <label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
                            Date du Rendez-Vous
                        </label>
                        <Controller
                            name='date'
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...field}
                                    showTime
                                    format="YYYY-MM-DD HH:mm"
                                    onChange={(date, ds) => {
                                        field.onChange(date);
                                    }}
                                    className='h-12 w-full'
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-row justify-end'>
                        <button
                            type='submit'
                            className='group h-12 w-32 mt-4 bg-Golden rounded-lg hover:bg-transparent hover:border-2 hover:border-yellow-300'
                        >
                            <span className='font-jakarta font-bold size-3 text-[#3A3541] group-hover:text-yellow-400'>
                                Sauvgarder
                            </span>
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default CreateActivitie