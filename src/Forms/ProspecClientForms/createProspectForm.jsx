import React, { useEffect } from 'react'
import { useForm,Controller,FormProvider } from 'react-hook-form'
import { DatePicker, Input, Select } from 'antd';
import InputField from '../../Components/InputForm/InputField';
import useCreateProspect from '../../Hooks/ProspectClientHooks/useCreateProspect';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
const CreateProspectForm = ({handleCancel}) => {
    const methods=useForm()
    const{handleSubmit,reset,control}=methods
    const{resposne,createProspect,error,isMutating}=useCreateProspect()
    const prostatus =[
        {
          value: 'pas encore de résultat',
          label: 'Pas encore de résultat',
        },
        {
          value: 'À rappeler',
          label: 'À rappeler',
        },
        {
            value: 'RDV',
            label: 'RDV',
          },{
            value: 'Pas intéressé',
            label: 'Pas intéressé',
          },{
            value: 'Injoignable',
            label: 'Injoignable',
          },{
            value: 'Reporter',
            label: 'Reporter',
          },
          {
            value: 'RDV annulé',
            label: 'RDV annulé',
          },
    
    ]
    const refreshData = (newSearch, newSelect) => {
      const key = `prospect/getAll?page=1&limit=10&search=${newSearch || ""}&select=${newSelect || ""}`;
      mutate(key);  
    };
    
    const onSubmit=async(data)=>{
        
      const result =  await createProspect(data)
        if(result.data){
           
            toast.success(result.message)
            reset()
            refreshData("","")
        }
    }
    if(isMutating){
        console.log("IsMutating")
      }
 
    
    useEffect(()=>{
        if(error){
           
            toast.error(error.message)
        }
    },[error])
    
  return (
    <div className='h-full max-h-[43rem] '>

    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-3'>
            <div className='px-3'>  <InputField
    name="projet"
    label="Projet"
    placeholder="Projet"
    required="nom is required"
    className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"
  
    /></div>
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
    name="email"
    label="Adress Email"
    placeholder="Email"
    required="nom is required"
   className="h-12 w-64 rounded-lg bg-[#F4F5F9]"
    />
    <InputField
    name="telephone"
    label="Téléphone"
    placeholder="Nom"
    required="nom is required"
    className="h-12 w-64 rounded-lg bg-[#F4F5F9]"
    />
    </div>
        <div className='px-6 flex flex-col gap-1'>
            <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Status</label>
            <Controller
            
            name='role'
            control={control}
            render={({field})=>(<Select {...field} options={prostatus} className='h-12 w-full'/>)}
            />
        </div>
        <div className='px-3'>  <InputField
    name="adress"
    label="Adress"
    placeholder="Adress"
    required="nom is required"
    className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"
  
    /></div>

        <div className=' flex flex-row justify-end gap-4 mt-6'>
      <button className='group hover:text-red-500' > <span className='font-jakarta font-medium size-3 group-hover:text-red-600' onClick={handleCancel}>Annuler</span> </button>
      <button  type='submit' className='group h-12 w-32 bg-Golden rounded-lg hover:bg-transparent  hover:border-2  hover:border-yellow-300'> <span className='font-jakarta font-bold size-3 text-[#3A3541] group-hover:text-yellow-400'>Sauvgarder</span> </button>
        </div>
 </div>
    </form>
    </FormProvider>
   
</div>
  )
}

export default CreateProspectForm