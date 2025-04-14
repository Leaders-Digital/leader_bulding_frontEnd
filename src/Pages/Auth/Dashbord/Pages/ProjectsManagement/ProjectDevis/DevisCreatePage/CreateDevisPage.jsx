import React from 'react'
import DevisSection from './devisSection'
import { Icon } from '@iconify/react/dist/iconify.js'


const CreateDevisPage = () => {
  return (
    <div className='h-full w-full bg-white p-4 rounded-lg flex flex-col gap-2'>
             <button type='submit' 
            className='h-9 w-40 bg-black rounded-lg my-3'
            >
                <div className='flex flex-row gap-1  p-1'>
                <Icon icon="hugeicons:add-square" width="24" height="24"  style={{color:" #fdfbf5"}} />
                <span className='font-jakarta font-bold  text-white '> Ajouter un article</span>
                </div>
            </button>
           <DevisSection/>

    </div>
  )
}

export default CreateDevisPage