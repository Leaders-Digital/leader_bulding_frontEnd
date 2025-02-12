import React, { useEffect, useRef, useState } from 'react'
import { useForm,Controller,FormProvider } from 'react-hook-form'
import { DatePicker, Input, Select } from 'antd';
import InputField from '../../Components/InputForm/InputField';
import useCreateProspect from '../../Hooks/ProspectClientHooks/useCreateProspect';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import PhoneInput from 'react-phone-input-2';

import { Icon } from '@iconify/react/dist/iconify.js';
import PersonelDetails from './personelDetails';
import DetaileProjet from './detaileProjet';
const CreateProspectForm = ({onSubmitForm}) => {
    const methods=useForm()
    const{handleSubmit,reset,control}=methods
    const{resposne,createProspect,error,isMutating}=useCreateProspect()
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
    
    const refreshData = (newSearch, newSelect) => {
      const key = `prospect/getAll?page=1&limit=10&search=${newSearch || ""}&select=${newSelect || ""}`;
      mutate(key);  
    };
   
  const[bien,setBien]=useState()
  const[floor,setFloor]=useState(1)
  const[rooms,setRooms]=useState({1:1})
  const roomsRef= useRef(rooms)
  
  const handleFloorChange = (e) => {
    let newFloorCount = parseInt(e.target.value, 10) || 1;
    setFloor(newFloorCount);
  
    setRooms((prev) => {
      let updatedRooms = { ...prev };  
      for (let i = 1; i <= newFloorCount; i++) {
        if (updatedRooms[i] === undefined) {
          updatedRooms[i] = 1; 
        }
      }
      for (let i = newFloorCount + 1; i <= Object.keys(updatedRooms).length; i++) {
        delete updatedRooms[i];
      }
      return updatedRooms;
    });
  };
  const handleRoomChange=(floor,change)=>{
  setRooms((prev)=>({...prev,[floor]:Math.max(1,(prev[floor]||1)+change)}))
  }
useEffect(() => {
  roomsRef.current=rooms
  console.log("Updated rooms state:", rooms);
}, [rooms]); 

    const onSubmit=async(data)=>{
      const propertyDetails = {
        rooms: roomsRef.current,  
        floors: Array.from({ length: floor }, (_, i) => ({
          floorNumber: i + 1,
          rooms: roomsRef.current[i + 1] || 1, 
        })),
      };
      const prospectData = {
        name: data.name,
        lastName: data.lastName,
        telephone: data.telephone,
        email: data.email,
        adress: data.adress,
        status: "prospection",
        propertyType: data.bien,
        propertyDetails: propertyDetails,
        projectType: data.projet,
        source: data.source,
        agence: data.source === "agence" ? { name: data.agence, agent: data.agent } : {},
        socialMedia: data.source === "Social Media" ? { platform: data.platform, link: data.link } : {},
        otherSourceDescription: data.source === "Other" ? data.autre : null,
        service: data.service,
        profilePicId: data.profilePicId,
      };
        console.log("prospect",prospectData)
      const result =  await createProspect(prospectData)
        if(result.data){
           
            toast.success(result.message)
            reset()
            refreshData("","")
           
        }
       console.log("dataaa",data)
       console.log("rooms",roomsRef.current)
    }
    if(isMutating){
        console.log("IsMutating")
      }
    useEffect(()=>{
        if(error){
           
            toast.error(error.message)
        }
    },[error])
      
 useEffect(()=>{
  if(onSubmitForm){
    onSubmitForm.current=handleSubmit(onSubmit)
  }
 },[onSubmitForm,handleSubmit])
  return (
    <div className='h-full max-h-[43rem] '>

    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-row'>
          
          <div className='flex-1 flex flex-col gap-2 overflow-y-auto max-h-[43rem]'>
        
        <PersonelDetails control={control}/>
 </div>  <div className='flex-1 flex flex-col overflow-y-auto max-h-[43rem]'>
 
         <DetaileProjet control={control}/>
        <div className='px-6 flex flex-col gap-1 mt-3 '>
            <label htmlFor="" className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Type de bien</label>
            <Controller
            name='bien'
            control={control}
            render={({field})=>(<Select {...field} options={typeBien} className='h-12 w-full' onChange={(value)=>{field.onChange(value);setBien(value)}}/>)}
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