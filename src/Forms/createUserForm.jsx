import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import InputField from '../Components/InputForm/InputField';
import { DatePicker, Input, Select } from 'antd';
import dayjs from 'dayjs';
import Password from 'antd/es/input/Password';

const CreateUserForm = () => {
    const methods= useForm();
    const{handleSubmit,reset,control}=methods
    const roles=[{value:"user",label:"User"},{value:"admin",label:"Admin"}]
    const onSubmit=(data)=>{
        
        const dateNaissance= dayjs(data.birth).toISOString()
        console.log("datenaiosnce",dateNaissance)
        console.log("from form",data)  ;  reset()}
    const onChange =(date,dateString)=>{
        console.log(date,dateString)
    }
  return (
    <div className='h-full max-h-[40rem] overflow-y-auto '>

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
        name="lasName"
        label="Prénom"
        placeholder="Prénom"
        required="email is required"
        className="h-12 w-64 rounded-lg bg-[#F4F5F9]"
        /></div>
        <div className='flex flex-row justify-between px-3'>
       <InputField
        name="name"
        label="Téléphone"
        placeholder="Nom"
        required="nom is required"
       className="h-12 w-64 rounded-lg bg-[#F4F5F9]"
      
        />
        <div className='flex flex-col gap-1'> <label >Date de naissance</label> 
        <Controller
        name='birth'
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
         <div className='px-6 flex flex-col gap-1'>  <label htmlFor="">Mot de passe</label>
       <Controller
       name='password'
       control={control}
       render={({field})=>(<Input.Password {...field} className='h-12 w-full px-3'/>)}
       
       />

         </div>
            <div className='px-6 flex flex-col gap-1'>
                <label htmlFor="">Role</label>
                <Controller
                
                name='role'
                control={control}
                render={({field})=>(<Select {...field} options={roles} className='h-12 w-full'/>)}
                />
            </div>
        <button type='submit'> submit </button></div>
        </form>
        </FormProvider>
    </div>
  )
}

export default CreateUserForm 