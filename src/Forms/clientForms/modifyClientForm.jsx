import React, { useEffect, useState } from 'react'
import useModifyUser from '../../Hooks/useModifyUser'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import InputField from "../../Components/InputForm/InputField.jsx";

const ModifyClientForm = ({ client, clientsMutation, handleCancel }) => {
    const { modifyUser, updatedUser, error } = useModifyUser()
    const [isLoading, setIsLoading] = useState(false)

    const methods = useForm({
        defaultValues: {
            name: '',
            lastName: '',
            telephone: '',
            email: '',
        },
    })
    const { handleSubmit, reset } = methods

    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
             await modifyUser({ id: client._id, data })
            clientsMutation()
                toast.success('Client modifié avec succès')
            reset()
            handleCancel()
        } catch (err) {
            console.error('Modification error:', err)
            toast.error('Une erreur est survenue lors de la modification')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (client) {
            reset({
                name: client.name || '',
                lastName: client.lastName || '',
                telephone: client.telephone || '',
                email: client.email || '',
            })
        }
    }, [client, reset])

    // Only show error toast if we have an error and we're not in a successful state
    useEffect(() => {
        if (error && !updatedUser) {
            console.error('Error in form:', error)
            toast.error(error.message || 'Une erreur est survenue')
        }
    }, [error, updatedUser])

    return (
        <div className='h-full max-h-[40rem] overflow-y-auto'>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-3'>
                        <div className='flex flex-row justify-between px-3'>
                            <InputField
                                name='name'
                                label='Nom'
                                placeholder='Nom'
                                required='Nom is required'
                                className='h-12 w-64 rounded-lg px-3 bg-[#F4F5F9]'
                            />
                            <InputField
                                name='lastName'
                                label='Prénom'
                                placeholder='Prénom'
                                required='Prénom is required'
                                className='h-12 w-64 rounded-lg px-3 bg-[#F4F5F9]'
                            />
                        </div>

                        <div className='px-3'>
                            <InputField
                                name='telephone'
                                label='Téléphone'
                                placeholder='Téléphone'
                                required='Téléphone is required'
                                className='h-12 w-full rounded-lg bg-[#F4F5F9] px-3'
                            />
                        </div>

                        <div className='px-3'>
                            <InputField
                                name='email'
                                label='Adresse Email'
                                placeholder='Email'
                                required='Email is required'
                                className='h-12 w-full rounded-lg bg-[#F4F5F9] px-3'
                            />
                        </div>

                        <div className='flex flex-row justify-end gap-4 mt-32'>
                            <button 
                                type='button'
                                onClick={handleCancel}
                                disabled={isLoading}
                                className='group hover:text-red-500 disabled:opacity-50'
                            >
                                <span className='font-jakarta font-medium group-hover:text-red-600'>
                                    Annuler
                                </span>
                            </button>
                            <button
                                type='submit'
                                disabled={isLoading}
                                className='group h-12 w-32 bg-Golden rounded-lg hover:bg-transparent hover:border-2 hover:border-yellow-300 disabled:opacity-50'
                            >
                                <span className='font-jakarta font-bold text-[#3A3541] group-hover:text-yellow-400'>
                                    {isLoading ? 'Chargement...' : 'Sauvegarder'}
                                </span>
                            </button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default ModifyClientForm
