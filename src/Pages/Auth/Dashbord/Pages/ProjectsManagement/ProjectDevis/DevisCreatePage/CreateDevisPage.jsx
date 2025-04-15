import React, { useState } from 'react'
import DevisSection from './devisSection'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useCreationStore } from '../../../../../../../store/useCreationStore'

const CreateDevisPage = () => {
  const [sections, setSections] = useState([0]) // Start with one section
  const [onSuccess, setOnSuccess] = useState(false)
  const {isCreating,setIsCreating}=useCreationStore()
    console.log("isCreating",isCreating)
  const addSection = () => {
    setSections(prev => [...prev, prev.length])
  }

  const removeSection = () => {
    if (sections.length > 1) {
      setSections(prev => prev.slice(0, -1))
    }
  }
  
  const handleSaveDevis = () => {
    setOnSuccess(true)
    console.log("Save button clicked, onSuccess set to true")
  }

  return (
    <div className='h-full w-full bg-white p-4 rounded-lg flex flex-col gap-4 overflow-y-auto'>
      <div className='sticky top-0 z-10 bg-white pb-2 flex flex-row gap-2'>
        <button 
          type='button' 
          onClick={addSection}
          className='h-9 w-52 bg-black rounded-lg my-3'
        >
          <div className='flex flex-row gap-1 p-1 items-center justify-center'>
            <Icon icon="hugeicons:add-square" width="24" height="24" style={{color:" #fdfbf5"}} />
            <span className='font-jakarta font-bold text-white'>Ajouter une section</span>
          </div>
        </button>
        <button 
          type='button' 
          onClick={removeSection}
          className='h-9 w-9 bg-black rounded-lg my-3 flex items-center justify-center'
          disabled={sections.length <= 1}
        >
          <Icon icon="hugeicons:minus-sign-square" width="24" height="24" style={{color: "#fdfbf5"}} />
        </button>
        <div className='flex flex-row justify-end items-end w-full'>
          <button 
            type='button' 
            onClick={()=>setIsCreating(true)} 
            className='h-12 w-52 bg-Golden rounded-lg my-3 flex items-center justify-center'
          >
            <span className='font-jakarta font-bold text-black'>Sauvegader</span>
          </button>
        </div>
      </div>

      <div className='flex flex-col gap-6 pb-4'>
        {sections.map((sectionIndex) => (
          <DevisSection 
            key={sectionIndex} 
            sectionIndex={sectionIndex} 
            onSuccess={onSuccess} 
          />
        ))}
      </div>
    </div>
  )
}

export default CreateDevisPage
