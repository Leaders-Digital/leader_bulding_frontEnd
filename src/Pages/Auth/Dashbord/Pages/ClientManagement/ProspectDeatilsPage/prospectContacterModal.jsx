import React from 'react'

const ProspectContacterModal = ({prospect}) => {
    const sendMessage=()=>{
         const url = `https://wa.me/${prospect.data.telephone}`
         window.open(url, '_blank');
    }
  return (
    <div className='h-full w-full flex flex-col gap-6'>
        <div className=' w-full'> 
        <span className=' font-jakarta text-2xl  font-bold size-9 ml-10 my-8 text-[#3A3541] '>
        Numéro du client {prospect.data?.name}
           </span>
        </div>
        <div className='w-full  flex flex-row justify-center items-center'>
        <span className=' font-jakarta text-2xl  font-bold size-9  my-8 text-[#3A3541] w-48 '>
       {prospect.data.telephone}
           </span>
        </div>
        <div className=' flex flex-row justify-center'>
            <button className='bg-[#F7D47A] h-12 w-28 rounded-lg font-jakarta font-semibold' onClick={()=>sendMessage()}>Contacter</button>
        </div>

    </div>
  )
}

export default ProspectContacterModal