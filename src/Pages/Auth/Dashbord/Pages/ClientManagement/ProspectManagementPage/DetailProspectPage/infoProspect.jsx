import React from 'react'
import DynamicInfo from '../../../../../../../Components/Sections/DynamicInfo'

const InfoProspect = ({prospect}) => {

    const prospectInfo = {
        name: prospect?.data?.name,
        lastName: prospect?.data?.lastName,
        email: prospect?.data?.email,
        telephone: prospect?.data?.telephone,
        adresse:prospect?.data?.adresse,
        CIN:prospect?.data?.cin
      };
    
  return (
    <div className='flex-1 w-full flex flex-col '>
    <div className=' flex flex-row items-center justify-center border-b-2 mb-3 border-[#BC983E] '>
      <span className=' font-jakarta text-l w-32  font-bold size-6  text-[#BC983E]'>Détails du client </span>
    </div>
    <div className='flex felex-row gap-3 pl-40'>
   <div className='w-[40rem] h-[21.4rem] bg-white flex flex-col rouned' >
    <div className='w-full h-[3.5rem] border-b-2 border-gray p-3'>
        <span className='font-jakarta text-lg font-bold text-[#3A3541]'>Informations Personnels</span>
    </div>
     <DynamicInfo data={prospectInfo}/>
   </div>
   <div className='w-[35rem] h-[21.4rem] bg-white flex flex-col rouned'  >
   <div className='w-full h-[3.5rem] border-b-2 border-gray p-3'>
        <span className='font-jakarta text-lg font-bold text-[#3A3541]'>Evolution Prospect</span>
    </div>
   </div>
   <div></div>

    </div>
    <div className='flex flex-col w-full h-[21rem] bg-white rounded mt-3 '>
    <div className='w-full h-[3.5rem] border-b-2 border-gray p-3'>
        <span className='font-jakarta text-lg font-bold text-[#3A3541]'>Détails du Projet</span>
    </div>
    <div className='flex flex-col gap-12 p-10 '>
     <div className='flex flex-row gap-96'>
        <div className='flex flex-col'>
        <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] w-full">Service proposé</span>
        <span>{prospect?.service}</span>
        </div>
        <div className='flex flex-col'>
        <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] w-full">Type de projet</span>
        <span>{prospect?.projet}</span>
        </div>
       
     </div>
     <div className='flex flex-row gap-96'>
        <div className='flex flex-col'>
        <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] w-full">Type de bien</span>
        <span>{prospect?.service}</span>
        </div>
        <div className='flex flex-col ml-6'>
        <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] w-full">Nombre de piéces</span>
        <span>{prospect?.projet}</span>
        </div>
       
     </div>

     <div className='flex flex-col gap-3'>
     <span  className="font-jakarta text-sm font-bold size-6 text-[#3A3541] w-full">Description de bien</span>
     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem obcaecati aspernatur asperiores, ipsum in nemo cumque quibusdam adipisci quasi consequatur sit molestias corrupti corporis recusandae necessitatibus veniam molestiae natus non!
   Accusantium nihil omnis nam. Cum iusto sed ipsum impedit? Quis porro soluta corporis consequatur rem delectus quod, ducimus reprehenderit voluptatum? Fugit earum magni voluptatem eius eaque aperiam neque similique tempora?</p>
     </div>
    </div>
      
    </div>


    </div>
  )
}

export default InfoProspect