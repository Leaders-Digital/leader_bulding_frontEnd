import { Select } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useCreationStore } from '../../store/useCreationStore'
import useSectionsStore from '../../store/useSectionsStore'

const DevisSectionForm = ({sectionIndex,onSuccess}) => {
    const{isCreating,setIsCreating}=useCreationStore()
    const{addSection,removeSection,sections}=useSectionsStore()
    const methods= useForm()
    const {handleSubmit,control,reset}=methods


    console.log("the creation value from the form ",isCreating)
    const onSubmit=async(data)=>{
  console.log("the data",data)
  addSection(data)
reset()
setIsCreating(false)

    }

    useEffect(()=>{
        console.log("the sections",sections)
    },[sections])

    useEffect(()=>{
        if(isCreating){
            handleSubmit(onSubmit)()

        }
    },[isCreating],handleSubmit,onSubmit)
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
                            Nom du Section:{sectionIndex+1}
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
                       <TextArea {...field} rows={3} className='h-9' />
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