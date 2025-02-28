import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import InputField from '../../../Components/InputForm/InputField'
import useMarkasdone from '../../../Hooks/ActivitiesHooks/useMarkasdone'
import { toast } from 'react-toastify'

const DoneActivityForm = ({id,setModal,onSuccess,openAddModal}) => {
    const methods= useForm()
    const {handleSubmit,control,reset}=methods
    const{markAsdone,error,isMutating}=useMarkasdone()
    const onSubmit=async(data)=>{
        try {
            data={...data,id:id}
            const res = await markAsdone(data)
            if(res.data){
                toast.success("The activity marked as done")
                // Call onSuccess before closing modal and resetting form
                onSuccess?.()
                reset()
                setModal(false)
            }
        } catch (error) {
            toast.error("Failed to mark activity as done")
        }
    }
  return (
    <div className='h-full max-h-[43rem]'>
   
   <FormProvider {...methods}>
    <form  onSubmit={handleSubmit(onSubmit)}>
  <div className='h-[30rem] w-[27.8rem] flex flex-col  items-center'>
    <div className='flex flex-col  mt-4  ml-24 gap-3' >
      <Icon icon="hugeicons:checkmark-circle-04" width="70" height="70"  style={{color:" #17A937"}} className='ml-44'/>
      <span className=' font-jakarta text-xl  font-bold size-6 ml-10 my-2 text-[#17A937] w-full '>Marquer l’activité comme 
      terminée </span>
     <InputField
     label="Note"
     name="note"
      placeholder="Note"
      required="Note is required"
      className="h-32 w-full px-4 rounded-lg ml-5 bg-[#F4F5F9]"
     />
      <span className=' font-jakarta   size-3 ml-28 my-2 text-[#3A3541] w-full '>Marquer l’activité comme 
      terminée </span>
  <div className='flex flex-row gap-2 ml-12 m-4'>

    <button className='  border-2 border-[#3A3541] rounded-lg p-2 font-jakarta font-semibold text-[#3A3541] w-[14rem] h-12 ' type='submit' onClick={()=>{openAddModal(true)}}>Terminer et Planifier une autre</button>
    <button className=' bg-[#17A937] text-white font-jakarta font-semibold p-2 rounded-lg w-32 h-12' type='submit'>Terminer</button>
  </div>

    </div>
    
  </div>

    </form>

    
   </FormProvider>

    </div>
  )
}

export default DoneActivityForm