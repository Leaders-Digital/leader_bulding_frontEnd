import { Select } from 'antd'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import useChangeStageProspect from '../../../../../../Hooks/ProspectClientHooks/useChangeStageProspect'
import { toast } from 'react-toastify'

const StageModalForm = ({statusConfig,onConfirm,prospect,targetStage}) => {
    const{ changeStage,error,isMutating}=useChangeStageProspect()
    const options=[]
    if(statusConfig){ statusConfig.statuses.map((status)=>(options.push({value:status,label:status})))}

    const methods=useForm()
    const {handleSubmit,control,reset}=methods
    const onSubmit=async(data)=>{
      try{   
        data={...data,id:prospect._id,stage:targetStage}
      const res=await changeStage(data)
      if(res.data){
             onConfirm(data.status)
             toast.success("prospect a changé le stage")
        reset()
      }
   }catch(e){toast.error(e)}
    
    }
  return (
    <div>

        <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
         <div className='flex flex-col gap-2'>

         <label className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full' >Status </label>
         <Controller
         name='status'
         control={control}
         render={({field})=><Select {...field} options={options} className='h-12 w-full' />}
         />
         <div className='flex flex-row gap-5 justify-end'>

<button className='font-jakarta text-[#3A3541] font-semibold'>Annuler</button>
<button className=' bg-[#F7D47A] rounded-lg font-jakarta text-[#3A3541] w-28 h-12 font-bold ' type='submit' disabled={isMutating}>Ajouter</button>
</div>
         </div>

        </form>
        </FormProvider>
    </div>
  )
}

export default StageModalForm