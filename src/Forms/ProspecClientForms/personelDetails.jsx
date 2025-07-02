import React from 'react'
import InputField from '../../Components/InputForm/InputField';
import {Controller, useFieldArray, useWatch} from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import {Select} from 'antd';

const PersonelDetails = ({control}) => {
    // const[source,setSource]=useState()
    const source = useWatch({control, name: "source"})
    const {fields, append, remove} = useFieldArray({control, name: "telephone"})
    const prostatus = [
        {
            value: 'agence',
            label: 'Agence',
        },
        {
            value: 'rs',
            label: 'Réseaux sociaux',
        },
        {
            value: 'Site Web',
            label: 'Site web',
        }, {
            value: 'autre',
            label: 'Autre',


        },
    ]
    const agences = [
        {
            value: 'Leaders building',
            label: 'Leaders building',
        },
        {
            value: 'Leaders business',
            label: 'Leaders business',
        }, {
            value: 'Leaders immobilier',
            label: 'Leaders immobilier',
        }, {
            value: 'Leaders digital',
            label: 'Leaders digital',
        },

    ]
    const platform = [{value: "Facebook", label: "Facebook"}, {
        value: "Instagram",
        label: "Instagram"
    }, {value: "TikTok", label: "TikTok"}]
    const status = [
        {
            value: 'Nouveau lead',
            label: 'Nouveau lead',
        },
        {
            value: 'A Qualité',
            label: 'A Qualité',
        },
        {
            value: 'Contrat effectué',
            label: 'Contrat effectué',
        },
    ]
    return (
        <div className='w-full h-full'>
            <span className='font-jakarta text-xl font-bold  text-[#3A3541] ml-3 mt-6 '>Informations personnels </span>
            <InputField
                name="name"
                label="Nom"
                placeholder="Nom"
                required="nom is required"
                className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"

            />
            <InputField
                name="lastName"
                label="Prénom"
                placeholder="Prénom"
                required="email is required"
                className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
            />

            <InputField
                name="email"
                label="Adress Email"
                placeholder="Email"
                required="nom is required"
                className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
            />

            <div className='flex flex-col gap-2 px-6'>
                <label htmlFor=""
                       className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Telephone</label>

                {fields.map((field, index) => {
                    return (

                        <div className='flex flex-col gap-2' key={field.id}>
                            <Controller
                                name={`telephone.${index}.number`}
                                control={control}
                                rules={{required: 'Phone number is required'}}
                                render={({field}) => (
                                    <PhoneInput
                                        country={'tn'}
                                        inputStyle={{width: '100%', padding: '10px', paddingLeft: '50px'}}
                                        inputRef={field.ref}
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                )}
                            />
                            {fields.length > 1 && (
                                <button type='button' onClick={() => remove(index)}>supprimer</button>)}

                        </div>)
                })}
                <button type='button' onClick={() => append({number: ''})}>Ajouter input</button>
            </div>

            <div className='px-6  flex flex-col gap-1'>
                <label htmlFor=""
                       className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Status</label>
                <Controller
                    name='status'
                    control={control}
                    render={({field}) => (<Select {...field} options={status} className='h-12 w-full'/>)}
                />

            </div>
            <div className='px-6 flex flex-col gap-1 '>
                <label htmlFor=""
                       className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Source</label>
                <Controller

                    name='source'
                    control={control}
                    render={({field}) => (<Select {...field} options={prostatus}
                                                  className='h-12 w-full' /*onChange={(value)=>{field.onChange(value);setSource(value)}}*//>)}
                />
            </div>
            {source === "agence" && <div className='flex flex-col px-6 gap-1'>
                <label htmlFor=""
                       className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Agences</label>
                <Controller
                    name='agence'
                    control={control}
                    render={({field}) => (<Select {...field} options={agences} className='h-12 w-full'/>)}

                />
                <InputField
                    name="agent"
                    label="Agent"
                    placeholder="Agent"
                    required="agent is required"
                    className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
                />
            </div>}
            {source === "rs" && <div className='flex flex-col'>
                <div className='px-6 flex flex-col gap-1 '>
                    <label htmlFor=""
                           className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Platform</label>
                    <Controller
                        name='platform'
                        control={control}
                        render={({field}) => (<Select {...field} options={platform} className='h-12 w-full'/>)}
                    />
                </div>
                <InputField
                    name="link"
                    label="Link"
                    placeholder="Link"
                    required="link is required"
                    className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
                />
            </div>}
            {source === "autre" && <InputField
                name="autre"
                label="Autre"
                placeholder="autre"
                required="link is required"
                className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
            />}
            <div className='px-3'><InputField
                name="adress"
                label="Adress"
                placeholder="Adress"
                required="nom is required"
                className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"

            /></div>
        </div>
    )
}

export default PersonelDetails