import React, { useEffect } from 'react'
import useModifyUser from '../Hooks/useModifyUser'
import { Controller, FormProvider, useForm } from 'react-hook-form'

import { toast, ToastContainer } from 'react-toastify'
import InputField from '../Components/InputForm/InputField'
import { Select } from 'antd'
import { mutate } from 'swr'

const ModifyUserForm = ({user}) => {
    const roles=[{value:"user",label:"User"},{value:"admin",label:"Admin"}]
    const{modifyUser,updatedUser,error,isMutating}=useModifyUser()
    const methods=useForm({
        defaultValues: {
          name: '',
          lastName: '',
          telephone: '',
          email: '',
          role: 'user',
        },
      })
    const{handleSubmit,reset,control}=methods
   
    const onSumbit= async(data)=>{
        await modifyUser({id :user._id, data:data})
        if(updatedUser){
           
            toast.success(updatedUser.message)
            mutate()
            reset()
        }      
    }
     useEffect(() => {
            if (user) {
              reset({
                name: user.name || '',
                lastName: user.lastName || '',
                telephone: user.telephone || '',
                email: user.email || '',
                role: user.role || 'user', 
              });
            }
          }, [user, reset]);
        
         useEffect(() => {
        if (error) {
          toast.error(error.message);
        }
      }, [error]);
  return (
    <div className='h-full max-h-[40rem] overflow-y-auto '>
   <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSumbit)}>
       <div className='flex flex-col gap-3'>
       <div className='flex flex-row justify-between px-3'>
       <InputField
        name="name"
        label="Nom"
        placeholder="Nom"
        required="nom is required"
       className="h-12 w-64 rounded-lg bg-[#F4F5F9]"
       
     
      
        />
        <InputField
        name="lastName"
        label="Prénom"
        placeholder="Prénom"
        required="email is required"
        className="h-12 w-64 rounded-lg bg-[#F4F5F9]"
    
        /></div>
        <div className='px-3'><InputField
        name="telephone"
        label="Téléphone"
        placeholder="Nom"
        required="nom is required"
       className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"
       
      
        /></div>
        <div className='px-3'>  <InputField
        name="email"
        label="Adresse Email"
        placeholder="Email"
        required="nom is required"
        className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"
        
      
        /></div>
         <div className='px-6 flex flex-col gap-1'>
                <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Role</label>
                <Controller
                defaultValue={user.role}
                name='role'
                control={control}
                render={({field})=>(<Select {...field} options={roles} className='h-12 w-full' value={field.value || user.role}  />)}
                />
            </div>
            <div className=' flex flex-row justify-end gap-4 mt-32'>
          <button className='group hover:text-red-500' > <span className='font-jakarta font-medium size-3 group-hover:text-red-600'>Annuler</span> </button>
          <button  type='submit' className='group h-12 w-32 bg-Golden rounded-lg hover:bg-transparent  hover:border-2  hover:border-yellow-300'> <span className='font-jakarta font-bold size-3 text-[#3A3541] group-hover:text-yellow-400'>Sauvgarder</span> </button>
            </div>
       </div>
</form>
   </FormProvider>
  <ToastContainer/>
    </div>
  )
}

export default ModifyUserForm