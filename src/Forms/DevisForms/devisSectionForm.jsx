import { Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'

const DevisSectionForm = () => {
    const methods= useForm()
    const {handleSubmit,control,reset}=methods

    const onSubmit=async()=>{

    }

    const nomSections = [
        { value: "Terrassement", label: "Terrassement" },
        { value: " Fondation-Structure", label: " Fondation-Structure" },
        { value: " Maçonnerie", label: " Maçonnerie" },
        { value: "Enduit", label: "Enduit" }
      
    ]
  return (
    <div className='w-full ' > 
    <FormProvider {...methods}>
<form onSubmit={handleSubmit(onSubmit)}>
<div className='flex flex-col gap-1'>
    <div className='flex flex-col gap-1'>
    <label htmlFor="" className='font-jakarta font-bold size-1 my-4 text-[#3A3541] w-full'>
                            Nom du Section
                        </label>
                        <Controller
                        name='title'
                        control={control}
                        render={({field})=>(
                            <Select {...field} options={nomSections} className='h-9 w-full'/>
                        )}
                        />
    </div>
    <div className='flex flex-col gap-1'>
    <label htmlFor="" className='font-jakarta font-bold size-1 my-4 text-[#3A3541] w-full'>
                            Description
                        </label>

                        <Controller
                        name='description'
                        control={control}
                        render={({field})=>(
                       <TextArea {...field} rows={4} />
                        )}
                        />

    </div>
</div>

</form>

    </FormProvider>
    </div>
  )
}

export default DevisSectionForm