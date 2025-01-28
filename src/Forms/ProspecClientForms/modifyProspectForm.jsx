import React, { useEffect } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import UseModifyProspect from '../../Hooks/ProspectClientHooks/useModifyProspect'
import { toast } from 'react-toastify'
import InputField from '../../Components/InputForm/InputField'
import { Select } from 'antd'

const ModifyProspectForm = ({prospect,prospectMutation,handelCancel}) => {
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
    const{modifyProspect,error,isMutating,updatedProspect}=UseModifyProspect()
    const methods =useForm({
        defaultValues:{
            name:"",
            lastName: '',
            telephone: '',
            email: '',
            status: 'Pas encore de résultat',
        }
    })
    const{handleSubmit,control,reset}=methods
const onSubmit=async(data)=>{
    console.log("data from form",data)
   const result=  await modifyProspect({id:prospect._id,data:data})
 if(result ){
    console.log(result)
    toast.success(result?.message)
    prospectMutation()
    reset()
    handelCancel()
 }
}

useEffect(()=>{
    if(prospect){
        reset({
            name:prospect.name ||'',
            lastName:prospect.lastName || '',
            telephone:prospect.telephone || '',
            email:prospect.email || '',
            status:prospect.status || ''
        })
    }
},[prospect,reset])
useEffect(()=>{
    if(error){
        toast.error(error.message)
    }
},[error])

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
                 <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>status</label>
                 <Controller
                 defaultValue={prospect.status}
                 name='status'
                 control={control}
                 render={({field})=>(<Select {...field} options={prostatus} className='h-12 w-full' value={prospect.status }  />)}
                 />
             </div>
             <div className=' flex flex-row justify-end gap-4 mt-32'>
           <button className='group hover:text-red-500' > <span className='font-jakarta font-medium size-3 group-hover:text-red-600'>Annuler</span> </button>
           <button  type='submit' className='group h-12 w-32 bg-Golden rounded-lg hover:bg-transparent  hover:border-2  hover:border-yellow-300'> <span className='font-jakarta font-bold size-3 text-[#3A3541] group-hover:text-yellow-400'>Sauvgarder</span> </button>
             </div>
        </div>
 </form>
    </FormProvider>

     </div>
  )
}

export default ModifyProspectForm