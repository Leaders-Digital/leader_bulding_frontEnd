import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import InputField from '../../Components/InputForm/InputField'
import { Input } from 'antd'
import useBecomeClient from '../../Hooks/ProspectClientHooks/useBecomeClient'
import { toast } from 'react-toastify'

const BecomClientForm = ({prospectId,handleCancel,mutate}) => {

    const{validerClient,data,error,isMutating }=useBecomeClient()
    const methods=useForm()
    const{handleSubmit,control,reset}=methods
    const onSubmit=async(data)=>{
  
   const res= await validerClient({id:prospectId ,data:data})
   if(res.data){
     toast.success(res.message)
     reset()
     handleCancel(false)
     mutate()
   }
    }
    if(error){
        toast.error(error.message)
    }
  return (
    <div className=' h-full w-full'>
     <FormProvider {...methods} >
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col'>
                <div className='px-3'> <InputField
        name="cin"
        label="CIN"
        placeholder="CIN"
        required="CIN is required"
         className="h-12 w-full px-4 rounded-lg bg-[#F4F5F9]"
        />
           </div>
       
           <div className='px-6 flex flex-col gap-1'>
           <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Mot de passe</label>
     <Controller
     name='password'
     control={control}
     render={({field})=>(<Input.Password {...field}  className='h-12 w-full px-3' />)}
     
     />
        <div className=' flex flex-row justify-end gap-4 mt-6'>
          <button className='group hover:text-red-500' > <span className='font-jakarta font-medium size-3 group-hover:text-red-600'>Annuler</span> </button>
          <button  type='submit' className='group h-12 w-32 bg-Golden rounded-lg hover:bg-transparent  hover:border-2  hover:border-yellow-300'> <span className='font-jakarta font-bold size-3 text-[#3A3541] group-hover:text-yellow-400'>Sauvgarder</span> </button>
            </div>

         </div></div>
        </form>
        
        </FormProvider>        
    </div>
  )
}

export default BecomClientForm