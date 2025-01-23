import React, { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import InputField from '../Components/InputForm/InputField';
import { DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import Password from 'antd/es/input/Password';
import UseCreateUser from '../Hooks/UseCreateUser';
import { ToastContainer, toast } from 'react-toastify';
const CreateUserForm = ({handelCancel}) => {
    const methods= useForm();
    const{handleSubmit,reset,control}=methods
    const roles=[{value:"user",label:"User"},{value:"admin",label:"Admin"}]
    const{createUser,error,data,isMutating}=UseCreateUser()
    const onSubmit= async(user)=>{
        
        const dateNaissance= dayjs(user.birth).toISOString()
        
      await createUser(user)
    if(data){
      reset()
    }
      }
      if(isMutating){
        console.log("IsMutating")
      }
      useEffect(() => {
        if (error) {
          toast.error(error.message);
        }
      }, [error]);
   
  return (
    <div className='h-full max-h-[43rem] overflow-y-auto '>

        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
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
        <div className='flex flex-row justify-between px-3'>
       <InputField
        name="telephone"
        label="Téléphone"
        placeholder="Nom"
        required="nom is required"
       className="h-12 w-64 rounded-lg bg-[#F4F5F9]"
      
        />
        <div className='flex flex-col gap-1'> <label className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Date de naissance</label> 
        <Controller
        name='dateDeNaissance'
        control={control}
        render={({field})=>(<DatePicker {...field}  className='h-12 w-64 rounded-lg bg-[#F4F5F9]  mr-3'  placeholder='Date de naissance' allowClear={true} inputReadOnly={true}/>)}
        />
        
        </div>
     
        </div>
        <div className='px-3'>  <InputField
        name="email"
        label="Adresse Email"
        placeholder="Email"
        required="nom is required"
        className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"
      
        /></div>
         <div className='px-6 flex flex-col gap-1'>  <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Mot de passe</label>
       <Controller
       name='password'
       control={control}
       render={({field})=>(<Input.Password {...field} className='h-12 w-full px-3'/>)}
       
       />

         </div>
            <div className='px-6 flex flex-col gap-1'>
                <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Role</label>
                <Controller
                
                name='role'
                control={control}
                render={({field})=>(<Select {...field} options={roles} className='h-12 w-full'/>)}
                />
            </div>

            <div className=' flex flex-row justify-end gap-4 mt-6'>
          <button className='group hover:text-red-500' onClick={handelCancel}> <span className='font-jakarta font-medium size-3 group-hover:text-red-600'>Annuler</span> </button>
          <button  type='submit' className='group h-12 w-32 bg-Golden rounded-lg hover:bg-transparent  hover:border-2  hover:border-yellow-300'> <span className='font-jakarta font-bold size-3 text-[#3A3541] group-hover:text-yellow-400'>Sauvgarder</span> </button>
            </div>
     </div>
        </form>
        </FormProvider>
        <ToastContainer/>
    </div>
  )
}

export default CreateUserForm 