import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import InputField from '../../../Components/InputForm/InputField'

const CreateActivitie = () => {
    const methods =useForm()
    const{handleSubmit,reset,control}=methods
    const onSubmit=(data)=>{
    console.log("data",data)
    }
  return (
    <div className='h-full max-h-[43rem] '>
   <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <InputField
    name="name"
    label="Name"
    placeholder="Name"
    required="nom is required"
   className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
    />
    </form>
    <button  type='submit' className='group h-12 w-32 bg-Golden rounded-lg hover:bg-transparent  hover:border-2  hover:border-yellow-300'> <span className='font-jakarta font-bold size-3 text-[#3A3541] group-hover:text-yellow-400'>Sauvgarder</span> </button>
   </FormProvider>

    </div>
  )
}

export default CreateActivitie