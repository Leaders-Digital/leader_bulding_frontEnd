import { Select } from 'antd';

import React, { useState } from 'react'
import { Controller } from 'react-hook-form';

const DetaileProjet = ({control}) => {
    const[typeProjets,setTypeProjets]=useState()
    const serviceprop=[{
        value: 'Etude de projet',
        label: 'Etude de projet',},{
          value: 'Construction',
          label: 'Construction',},{
            value: 'Reamingement-Renovation-Extention',
            label: 'Reamingement-Renovation-Extention',},
            {
              value: 'Clotue',
              label: 'Clotue',},
              {
                value: 'Autre',
                label: 'Autre',}
      ]
      const typeProjet=[   {
        value: 'Résidentiel',
        label: 'Résidentiel',},
        {
          value: 'Commercial',
          label: 'Commercial',},
          {
            value: 'Bureau',
            label: 'Bureau',}
            ,    {
              value: 'Autre',
              label: 'Autre',}
        ]
  return (
    <div className='w-full '> 
     <span className='font-jakarta text-xl font-bold  text-[#3A3541] ml-6 mt-6 mb-2'>Détails du projet</span>
 <div className='px-6 flex flex-col gap-1  '>
            <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Service demandé</label>
            <Controller
            
            name='service'
            control={control}
            render={({field})=>(<Select {...field} options={serviceprop} className='h-12 w-full'/>)}
            />
        </div>
        <div className='px-6 flex flex-col gap-1 mt-3 '>
            <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Type de projet</label>
            <Controller
            name='projet'
            control={control}
            render={({field})=>(<Select {...field} options={typeProjet} className='h-12 w-full' onChange={(value)=>{field.onChange(value);setTypeProjets(value)}}/>) }
            />
        </div>
        {typeProjets==="Autre"&& <InputField
    name="autre projet"
    label="Autre"
    placeholder="Autre"
    required="autre is required"
    className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"
  
    />}
  

    </div>
  )
}

export default DetaileProjet