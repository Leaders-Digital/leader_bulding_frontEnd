import React, { useEffect, useRef, useState } from 'react'
import { useForm,Controller,FormProvider } from 'react-hook-form'
import { DatePicker, Input, InputNumber, Select } from 'antd';
import InputField from '../../Components/InputForm/InputField';
import useCreateProspect from '../../Hooks/ProspectClientHooks/useCreateProspect';
import 'react-phone-input-2/lib/style.css';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import PhoneInput from 'react-phone-input-2';

import { Icon } from '@iconify/react/dist/iconify.js';
import PersonelDetails from './personelDetails';
import DetaileProjet from './detaileProjet';
import LocationProject from './locationProject';
const CreateProspectForm = ({onSubmitForm,prospect}) => {
    const methods=useForm()
    const[forceReset,SetforceReset]=useState()
    const{handleSubmit,reset,control,formState:{isValid}}=methods
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

}, [rooms]); 

const resetFloors=()=>{
  setFloor(1)
  setRooms({1:1})
  setBien("")
}
useEffect(()=>{
if(prospect){
 
  reset({
    name:prospect?.name ||"",
    lastName:prospect?.lastName||"",
    telephone:prospect?.telephone ||"",
    email:prospect?.email ||"",
    adress:prospect?.adress,
    source:prospect?.source  ||"",
    agence:(prospect?.source==="agence")?prospect?.agence?.name:null,
    agent:(prospect?.source ==="agence")?prospect?.agence?.agent:null,
    adress:prospect?.adresse,
    platform:(prospect?.source==="rs")?prospect?.socialMedia.platform:null,
    link:(prospect?.source==='rs')?prospect?.socialMedia.link:null,
    service:prospect?.service,
    projet:prospect?.projectType,
    bien:prospect?.propertyType,
    rdcRooms: prospect?.propertyType === "RDC" ? prospect?.propertyDetails?.rooms["1"] : null,
    location:prospect?.lotissement,
    adressParticulier:(prospect?.lotissement==="Particulier")?  prospect?.adressParticulier:null,
    nomLotiss:(prospect?.lotissement==="Lotissement")?prospect?.lotissementCords?.nom:null,
    numeroLotiss:(prospect?.lotissement==="Lotissement")?prospect?.lotissementCords?.numLot:null,
    percent:prospect?.percent
  })


  setBien(prospect?.propertyType);

    if (prospect?.propertyType === "R+N") {
    
      const roomsData = prospect?.propertyDetails?.rooms || { 1: 1 };
      const floorCount = Object.keys(roomsData).length;
      
      setFloor(floorCount);
      setRooms(roomsData);
    }
}
},[prospect,reset])
    const onSubmit=async(data)=>{
      console.log("Submitted Data:", data);
  console.log("Fields with Errors:", methods.formState.errors);
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
        propertyDetails: data.bien==="R+N"? propertyDetails:{floors:[{floorNumber:1,rooms:data.rdcRooms}],rooms:{'1':data.rdcRooms}},
        projectType: data.projet,
        source: data.source,
        agence: data.source === "agence" ? { name: data.agence, agent: data.agent } : {},
        socialMedia: data.source === "rs" ? { platform: data.platform, link: data.link } : {},
        otherSourceDescription: data.source === "Other" ? data.autre : null,
        service: data.service,
        profilePicId: data.profilePicId,
        percent:data.percent,
        lotissement:data.location,
        lotissementCords:data.location ==="Lotissement"?{nom:data?.nomLotiss,numLot:data?.numeroLotiss}:{},
        adressParticulier:data.adressParticulier
      };
        console.log("the data of prospect",prospectData)
      const result =  await createProspect(prospectData)
        if(result.data){
           
            toast.success(result.message)
            console.log("isvalid",isValid)
            resetFloors()
            reset()
            SetforceReset(true)
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
      
 useEffect(()=>{
  if(onSubmitForm){
    onSubmitForm.current=handleSubmit(onSubmit)
  }
 },[onSubmitForm,handleSubmit])
  return (
    <div className='h-full max-h-[45rem] '>

    <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-row'>
          
          <div className='flex-1 flex flex-col gap-2 overflow-y-auto max-h-[45  rem]'>
        
        <PersonelDetails control={control}/>
 </div>  <div className='flex-1 flex flex-col overflow-y-auto max-h-[45rem]'>
 
         <DetaileProjet control={control} forceReset={forceReset} setForceReset={SetforceReset}/>
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
     {bien ==="RDC" && 
     <div className='flex flex-col gap-3 ml-7'>
      <label htmlFor=""  className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full '>Nombre de pieces :</label> 
      <Controller
      name='rdcRooms'
      control={control}
      render={({field})=> <InputNumber {...field} min={0} max={50}  size='large'/> }
      />
     </div>
     }
       <LocationProject control={control} forceReset={forceReset}/>
  </div>
  
  </div>
    </form>
    </FormProvider>
   
</div>
  )
}

export default CreateProspectForm