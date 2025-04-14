import React from 'react'
import DevisSectionForm from '../../../../../../../Forms/DevisForms/devisSectionForm'
import DevisItemForm from '../../../../../../../Forms/DevisForms/DevisItemForm'
import { Icon } from '@iconify/react/dist/iconify.js'

const DevisSection = ({count}) => {
    count=1
  return (
    <div className=' w-full max-h-[35rem] p-4 border border-solid border-[#E5E7EB] rounded-lg'>

        <div className='flex flex-col gap-1'>
            <DevisSectionForm/>
        <div className='flex flex-row justify-start'>
            <button type='submit' 
            className='h-9 w-40 bg-black rounded-lg my-3'
            >
                <div className='flex flex-row gap-1  p-1'>
                <Icon icon="hugeicons:add-square" width="24" height="24"  style={{color:" #fdfbf5"}} />
                <span className='font-jakarta font-bold  text-white '> Ajouter un article</span>
                </div>
            </button>
        </div>
         
       {[...Array(count)].map((_,index)=>(

        <DevisItemForm index={index}/>

       ))}
        </div>
    </div>
  )
}

export default DevisSection