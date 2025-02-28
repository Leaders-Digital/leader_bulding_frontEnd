import { Select } from 'antd';
import React, { useState, useEffect } from 'react'
import { Controller } from 'react-hook-form';
import InputField from '../../Components/InputForm/InputField';

const DetaileProjet = ({control,forceReset,setForceReset}) => {
    const[typeProjets,setTypeProjets]=useState()
    const[customValue, setCustomValue] = useState("")
    const[typeService,setTypeService]=useState("")
    const[customService,setCustomService]=useState("") 

useEffect(()=>{
    console.log("force set",forceReset)
 if(forceReset){
  setTypeService("")
  setCustomService("")
  setTypeProjets("")
  setCustomValue("")
  setForceReset(false)
 }

},[forceReset])

useEffect(()=>{
    if(control._formValues.service) {
        setTypeService(control._formValues.service);
    }
    if(control._formValues.projet) {
        setTypeProjets(control._formValues.projet);
    }
},[control._formValues])

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
            <span className='font-jakarta text-xl font-bold text-[#3A3541] ml-6 mt-6 mb-2'>
                Détails du projet
            </span>
            <div className='px-6 flex flex-col gap-1'>
                <label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
                    Service demandé
                </label>
                <Controller
                    name='service'
                    control={control}
                    render={({field}) => (
                        <Select {...field} options={serviceprop} className='h-12 w-full'
                        value={typeService}
                        onChange={(value)=>{

                            setTypeService(value)
                            if(value!=="Autre"){
                                field.onChange(value)
                                setCustomService("")
                            }else{
                                field.onChange(customService||"")
                            }
                        }}
                        />
                    )}
                />
            </div>
            {typeService==="Autre" && (
                <div className='px-6 mt-3'>
                <Controller
                name='serviceInput'
                control={control}
                render={({field})=>(
                    <InputField  
                    {...field}
                    label="Autre type de service"
                                placeholder="Spécifiez le type de service"
                                required="Le type de service est requis"
                                className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"
                                value={customService}
                                onChange={(e)=>{
                                    const value=e.target.value
                                    setCustomService(value)
                                    field.onChange(value)
                                }}
                    />
                )}
                />

                </div>
            )}
            <div className='px-6 flex flex-col gap-1 mt-3'>
                <label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
                    Type de projet
                </label>
                <Controller
                    name='projet'
                    control={control}
                    render={({field}) => (
                        <Select 
                            {...field} 
                            options={typeProjet} 
                            className='h-12 w-full'
                            value={typeProjets}
                            onChange={(value) => {
                                setTypeProjets(value)
                                if (value !== "Autre") {
                                    field.onChange(value)
                                    setCustomValue("")
                                } else {
                                    field.onChange(customValue || "")
                                }
                            }}
                        />
                    )}
                />
            </div>
            
            {typeProjets === "Autre" && (
                <div className='px-6 mt-3'>
                    <Controller
                        name='projet'
                        control={control}
                        render={({field}) => (
                            <InputField
                                {...field}
                                label="Autre type de projet"
                                placeholder="Spécifiez le type de projet"
                                required="Le type de projet est requis"
                                className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"
                                value={customValue}
                                onChange={(e) => {
                                    const value = e.target.value
                                    setCustomValue(value)
                                    field.onChange(value)
                                }}
                            />
                        )}
                    />
                </div>
            )}
        </div>
    )
}

export default DetaileProjet