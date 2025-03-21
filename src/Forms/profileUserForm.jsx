import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import InputField from '../Components/InputForm/InputField'

const ProfileUserForm = () => {
    const methods=useForm()
    const{control,handleSubmit,reset}=methods
const onSubmit=async(data)=>{

  console.log("data",data)
}
//7 input for the form 
  return (
    <div className='h-full w-full'>

      <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex flex-row gap-3 w-full'>
        <div className='w-full'> <InputField
      name="name"
       label="Nom"
       placeholder="Nom"
       required="name is required "
       className="h-24 w-full rounded-lg bg-[#F4F5F9] p-4"
      /></div>
     <div className='w-full'>   <InputField
      name="name"
       label="Prénom"
       placeholder="Prénom"
       required="prénom is required "
       className="h-24 w-full rounded-lg bg-[#F4F5F9] p-4"
      /></div>
        </div>
      <div className='flex flex-row gap-3 w-full'>
        <div className='w-full'> <InputField
      name="telephone"
       label="Telephone"
       placeholder="Telephone"
       required="telephone is required "
       className="h-24 w-full rounded-lg bg-[#F4F5F9] p-4"
      /></div>
     <div className='w-full'>   <InputField
      name="password"
       label="Mot de passe"
       placeholder="Mot de passe"
       required="prénom is required "
       className="h-24 w-full rounded-lg bg-[#F4F5F9] p-4"
      /></div>
  
      </div>
      <div className='flex flex-row gap-3 w-full'>
        <div className='w-full'> <InputField
      name="adresse"
       label="Adresse"
       placeholder="Adresse"
       required="adresse is required "
       className="h-24 w-full rounded-lg bg-[#F4F5F9] p-4"
      /></div>
     <div className='w-full'>    </div>
    

      </div>
<div className=' mt-20 w-full flex flex-row justify-end'>
 <button className='w-36 h-16 bg-Golden rounded-lg text-[#3A3541]  font-jakarta font-semibold mr-8'>Sauvegarder</button>
</div>
      </form>


      </FormProvider>
    </div>
  )
}

export default ProfileUserForm