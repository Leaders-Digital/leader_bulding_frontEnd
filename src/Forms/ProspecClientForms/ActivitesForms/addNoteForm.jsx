import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import useAddNote from '../../../Hooks/ActivitiesHooks/useAddNote'
import { toast } from 'react-toastify'


const AddNoteForm = ({id,openModal}) => {
    const methods=useForm()
    const{handleSubmit,reset,control} =methods
  
    const{addNote,error,isMutating}=useAddNote()
    const onSubmit=async(data)=>{
        try{  
       
console.log("id",id)
data={...data,id:id}
const res= await addNote(data)
console.log("res",res)
if(res.data){
    toast.success("Note added")
    openModal(false)
}
        }catch(e){}
    }
  return (
    <div className='h-full max-h-[43rem]'>

        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
               

                <div className='flex flex-col gap-6'>
             <div className='flex flex-col gap-2'>
            <label className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full' >Note </label>
            <Controller
            name='note'
            control={control}
            render={({field})=><TextArea {...field} autoSize={null} style={{resize:'none',height:"10rem"}} />}

            />
             </div>

             <div className='flex flex-row gap-5 justify-end'>

                <button className='font-jakarta text-[#3A3541] font-semibold'>Annuler</button>
                <button className=' bg-[#F7D47A] rounded-lg font-jakarta text-[#3A3541] w-28 h-12 font-bold ' type='submit'>Ajouter</button>
             </div>
                </div>

            </form>

        </FormProvider>
    </div>
  )
}

export default AddNoteForm