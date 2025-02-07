import React, { useEffect, useState } from 'react'
import { useForm,Controller,FormProvider } from 'react-hook-form'
import { DatePicker, Input, Select } from 'antd';
import InputField from '../../Components/InputForm/InputField';
import useCreateProspect from '../../Hooks/ProspectClientHooks/useCreateProspect';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import PhoneInput from 'react-phone-input-2';

import { Icon } from '@iconify/react/dist/iconify.js';
const CreateProspectForm = ({handleCancel}) => {
    const methods=useForm()
    const{handleSubmit,reset,control}=methods
    const{resposne,createProspect,error,isMutating}=useCreateProspect()
    const prostatus =[
        {
          value: 'agence',
          label: 'Agence',
        },
        {
          value: 'rs',
          label: 'Réseaux sociaux',
        },
        {
            value: 'Siteweb',
            label: 'Siteweb',
          },{
            value: 'autre',
            label: 'Autre',
          }
    
    ]
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
      const typeBien=[
        {
          value: 'RDC',
          label: 'RDC',},
          {
            value: 'R+N',
            label: 'R+N',}
            ,
            {
              value: 'Autre',
              label: 'Autre',}
      ]
    const owner=[
      {value:"Particulier",label:"Particulier"},{value:"Lotissement",label:"Lotissement"}
    ]
    const platform=[{value:"Facebook",label:"Facebook"},{value:"Instagram",label:"Instagram"},{value:"TikTok",label:"TikTok"}]
    const refreshData = (newSearch, newSelect) => {
      const key = `prospect/getAll?page=1&limit=10&search=${newSearch || ""}&select=${newSelect || ""}`;
      mutate(key);  
    };
    const[source,setSource]=useState()
    const[typeProjets,setTypeProjets]=useState()
    const[bien,setBien]=useState()
  const[floor,setFloor]=useState(1)
  const[rooms,setRooms]=useState({1:1})
  const handlebienchange=(e)=>{
    console.log("bien",e)
  setBien(e)
  }
  const handleFloorChange=(e)=>{
  
  let newFloorCount= parseInt(e.target.value,10)||1
  setFloor( newFloorCount)
  setRooms((prev)=> {
    let updatedRomms={...prev}
    for(let i=1;i<=newFloorCount;i++){
      if(!updatedRomms[i]){updatedRomms[i]=1}
    }
    return updatedRomms
  })

  }

  const handleRoomChange=(floor,change)=>{
  setRooms((prev)=>({...prev,[floor]:Math.max(1,(prev[floor]||1)+change)}))

  }
    const handelSource=(value)=>{
console.log("value",value)
setSource(value)
    }
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
          <div className='flex flex-row'>
          
            <div className='flex-1 flex flex-col gap-2 overflow-y-auto max-h-[43rem]'>
          <span className='font-jakarta text-xl font-bold  text-[#3A3541] ml-3 mt-6 '>Informations personnels </span>
            
   <InputField
    name="name"
    label="Nom"
    placeholder="Nom"
    required="nom is required"
   className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
  
    />
    <InputField
    name="lastName"
    label="Prénom"
    placeholder="Prénom"
    required="email is required"
    className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
    />
    
   <InputField
    name="email"
    label="Adress Email"
    placeholder="Email"
    required="nom is required"
   className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
    />
     
     <div className='flex flex-col gap-2 px-6'>
     <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Telephone</label>
     <Controller
     name='telephone'
    control={control}
    rules={{ required: 'Phone number is required' }}
    render={({field})=>(<PhoneInput {...field} country={'tn'} inputStyle={{ width: '100%', padding: '10px' ,paddingLeft:'50px'}} />)}

     />
     </div>
    
        <div className='px-6 flex flex-col gap-1 '>
            <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Source</label>
            <Controller
            
            name='role'
            control={control}
            render={({field})=>(<Select {...field} options={prostatus} className='h-12 w-full' onChange={(value)=>handelSource(value)}/>)}
            />
        </div>

        {source ==="agence" && <div className='flex flex-col'> <InputField
    name="Agence"
    label="Agence"
    placeholder="Agence"
    required="agence is required"
    className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
    />
    <InputField
    name="Agent"
    label="Agent"
    placeholder="Agent"
    required="agent is required"
    className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
    />
    </div>}
{source ==="rs" && <div className='flex flex-col'>
  <div className='px-6 flex flex-col gap-1 '>
            <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Platform</label>
            <Controller
            
            name='platform'
            control={control}
            render={({field})=>(<Select {...field} options={platform} className='h-12 w-full' />)}
            />
        </div>
        <InputField
    name="link"
    label="Link"
    placeholder="Link"
    required="link is required"
    className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
    />
  </div>}
    {source==="autre" && <InputField
    name="autre"
    label="Autre"
    placeholder="autre"
    required="link is required"
    className="h-12 w-full rounded-lg bg-[#F4F5F9] p-4"
    /> }
        <div className='px-3'>  <InputField
    name="adress"
    label="Adress"
    placeholder="Adress"
    required="nom is required"
    className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"
  
    /></div>

      
 </div>  <div className='flex-1 flex flex-col'>
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
            
            name='type de projet'
            control={control}
            render={({field})=>(<Select {...field} options={typeProjet} className='h-12 w-full' onChange={(value)=>setTypeProjets(value)}/>) }
            />
        </div>
        {typeProjets==="Autre"&& <InputField
    name="autre projet"
    label="Autre"
    placeholder="Autre"
    required="autre is required"
    className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"
  
    />}
        <div className='px-6 flex flex-col gap-1 mt-3 '>
            <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Type de bien</label>
            <Controller
            name='type de bien'
            control={control}
            render={({field})=>(<Select {...field} options={typeBien} className='h-12 w-full' onChange={(value)=>handlebienchange(value)}/>)}
            />
        </div>
    
     {bien==="R+N" &&  <div className='flex flex-col w-36 ml-6'> <label htmlFor=""  className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Etage</label> 
     
     <input   className="border p-2 rounded w-full" type='number' value={floor} onChange={handleFloorChange} min={1}/>
     <div className="mt-4">
        {Array.from({ length: floor }, (_, i) => i + 1).map((floor) => (
          <div key={floor} className="flex items-center justify-between bg-gray-100 p-3 mb-2 rounded w-96">
            <span className="font-semibold">Etage {floor}</span>
            <div className="flex items-center">
              <button
              type='button'
                onClick={() => handleRoomChange(floor, -1)}
                className="px-3 py-1 bg-[#F7D47A] text-white rounded"
              >
              <Icon icon="hugeicons:remove-01" width="20" height="20"  style={{color: "#fff"}} />
              </button>
              <span className="mx-3">{rooms[floor] || 1} Piéces</span>
              <button
              type='button'
                onClick={() => handleRoomChange(floor, 1)}
                className="px-3 py-1 bg-[#F7D47A] text-white rounded-full"
              >
                <Icon icon="hugeicons:add-01" width="20" height="20"  style={{color:" #fff"}}/>
              </button>
            </div>
          </div>
        ))}
      </div>
     
     </div> 
      
     }
        
        <span className='font-jakarta text-xl font-bold  text-[#3A3541] ml-6 mt-6 mb-2'>Localisation du projet</span>
        <div className='px-6 flex flex-col gap-1 mt-3 '>
            <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Localisation Terrain/Projet</label>
            <Controller
            name='location'
            control={control}
            render={({field})=>(<Select {...field} options={owner} className='h-12 w-full'/>)}
            />
        </div>
  </div></div>
    </form>
    </FormProvider>
   
</div>
  )
}

export default CreateProspectForm