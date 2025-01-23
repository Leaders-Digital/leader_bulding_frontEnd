import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const DeleteUser = ({handleCancel}) => {
  return (
    <div className='w-full h-full flex flex-col gap-6   ' >
    <div className='flex flex-row justify-center mt-7'>
    <Icon icon="hugeicons:alert-circle" width="60" height="60"  style={{color:"#ec1919"}} />
    </div>
    <div className='text-center'>
        <span className=' font-jakarta text-3xl  font-bold size-9 ml-10 my-8 text-[#3A3541] '>
        Voulez vous Supprimer <br/>
        cet utilisateur ?
        </span>
    </div>
   <div className='flex flex-row justify-end gap-3 mt-11'> 
   <button className='text-black font-jakarta text-l  hover:text-red-600' onClick={handleCancel}>Annuler</button>
  <button className='h-12 w-28 bg-[#FF2E2E] rounded-lg text-white font-jakarta text-l  font-bold hover:bg-red-600' >Supprimer </button>
  

   </div>
    </div>
  )
}

export default DeleteUser