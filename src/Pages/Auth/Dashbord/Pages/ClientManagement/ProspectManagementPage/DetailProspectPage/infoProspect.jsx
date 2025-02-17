import React from 'react'
import DynamicInfo from '../../../../../../../Components/Sections/DynamicInfo'
import { Tag } from 'antd';

const InfoProspect = ({prospect}) => {

    const prospectInfo = {
        name: prospect?.data?.name,
        lastName: prospect?.data?.lastName,
        email: prospect?.data?.email,
        telephone: prospect?.data?.telephone,
        adresse:prospect?.data?.adresse,
        CIN:prospect?.data?.cin
      };
    const sumRooms= Object.values(prospect?.data?.propertyDetails?.rooms).reduce((a,c)=>a+c,0)
    console.log("rooms",sumRooms)
    console.log("property type",prospect?.data?.propertyType)
     const f=Object.values(prospect?.data?.propertyDetails?.rooms).length
  return (
    <div className='flex-1 w-full flex flex-col '>
    <div className=' flex flex-row items-center justify-center border-b-2 mb-3 border-[#BC983E] '>
      <span className=' font-jakarta text-l w-32  font-bold size-6  text-[#BC983E]'>Détails du client </span>
    </div>
    <div className='flex flex-row gap-3 '>
   <div className='w-full h-[21.4rem] bg-white flex flex-col rounded-lg' >
    <div className='w-full h-[3.5rem] border-b-2 border-gray p-3'>
        <span className='font-jakarta text-lg font-bold text-[#3A3541]'>Informations Personnels</span>
    </div>
     <DynamicInfo data={prospectInfo}/>
   </div>
   <div className='w-full h-[21.4rem] bg-white flex flex-col rounded-lg '  >
   <div className='w-full h-[3.5rem] border-b-2 border-gray p-3'>
        <span className='font-jakarta text-lg font-bold text-[#3A3541]'>Evolution Prospect</span>
    </div>  
    <div className='flex flex-col p-4'>
        <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] ">Situation</span>
        <Tag bordered={false} color="processing" className='w-20 font-semibold text-[1rem]'>
       {prospect?.data?.stage}
      </Tag>
        </div>
        <div className='flex flex-col p-4'>
        <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] ">Statut</span>
        <Tag bordered={false} color="purple" className='w-44 font-semibold text-[1rem]'>
       {prospect?.data?.status}
      </Tag>
        </div>
   </div>
   <div></div>

    </div>
    <div className='flex flex-col w-full h-[21rem] bg-white rounded mt-3 '>
    <div className='w-full h-[3.5rem] border-b-2 border-gray p-3'>
        <span className='font-jakarta text-lg font-bold text-[#3A3541]'>Détails du Projet</span>
    </div>
    <div className='flex flex-col gap-5 p-10 '>
     <div className='flex flex-row gap-96'>
        <div className='flex flex-col'>
        <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] w-full">Service proposé</span>
        <span>{prospect?.data?.service}</span>
        </div>
        <div className='flex flex-col'>
        <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] w-full">Type de projet</span>
        <span>{prospect?.data?.projectType}</span>
        </div>
       
     </div>
     <div className='flex flex-row gap-96'>
        <div className='flex flex-col'>
        <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] w-full">Type de bien</span>
        <span>{f>1?"R+N":"RDC"} /{f}</span>
        </div>
        <div className='flex flex-col ml-6'>
        <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] w-full">Nombre de piéces</span>
        <span>{sumRooms}</span>
        </div>
       
     </div>

     <div className='flex flex-col gap-3'>
     <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] w-full">Description de bien</span>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati aspernatur asperiores, ipsum in nemo cumque quibusdam adipisci quasi consequatur sit molestias corrupti corporis recusandae necessitatibus veniam molestiae natus non!
   cimus reprehenderit voluptatum? Fugit earum magni voluptatem eius eaque aperiam neque similique tempora?</p>
     </div>
    </div>
      
    </div>


    </div>
  )
}

export default InfoProspect