import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import InputField from '../../Components/InputForm/InputField'
import TextArea from 'antd/es/input/TextArea'
import { InputNumber, Select } from 'antd'

const DevisItemForm = ({section,openModal,index}) => {
    const methods=useForm()
    const{handleSubmit,control,reset}=methods

    const onSubmit=(data)=>{
    }
    const unites = [
        { value: "M²", label: "M²" },
        { value: "M³", label: "M³" }
    ]
  return (
    <div className=' w-full  border border-solid border-[#E5E7EB] rounded-lg p-3'>
  <FormProvider {...methods}>
<form onSubmit={handleSubmit(onSubmit)}>
<div className='flex flex-col gap-1'>
 <InputField
 name="title"
 label={`Nom de l’article ${index+1}`}
 placeholder="Nom"
 required="Nom de l'article est obligatoir"
  className="h-9 w-full rounded-lg bg-[#F4F5F9] p-2"
 />
<div className='flex flex-col gap-1'>
<label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
Description de l’article
                        </label>
                        <Controller
                        name='description'
                        control={control}
                        render={({field})=>(
                            <TextArea {...field} 
                            rows={3}
                              className='h-9 w-full'
                            />
                        )}
                        />

</div>

<div className='flex flex-row justify-between gap-1'>
 <div className='flex flex-col gap-1'>
 <label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
 Unité
                        </label>
                        <Controller
                        name='unite'
                        control={control}
                        render={({field})=>(
                            <Select {...field} options={unites} className='w-60 h-9' />
                        )}
                        />
 </div>
<div className='flex flex-col gap-1'>
<label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
Quantité
                        </label>
                        <Controller
                        name='qte'
                        control={control}
                        render={({field})=>(
                            <InputNumber {...field} min={0} className='w-60 h-10'/>
                        )}
                        />
</div>
<div className='flex flex-col gap-1'>
<label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
Prix Unité Hors Taxe
                        </label>
                        <Controller
                        name='puHT'
                        control={control}
                        render={({field})=>(
                            <InputNumber {...field} min={0}  className='w-60 h-10'/>
                        )}
                        />
</div>
<div className='flex flex-col gap-1'>
<label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
Prix Total Hors Taxe
                        </label>
                        <Controller
                        name='ptHT'
                        control={control}
                        render={({field})=>(
                            <InputNumber {...field} min={0}  className='w-60 h-10'/>
                        )}
                        disabled={true}
                        />
</div>
</div>
</div>


</form>
  </FormProvider>

    </div>
  )
}

export default DevisItemForm