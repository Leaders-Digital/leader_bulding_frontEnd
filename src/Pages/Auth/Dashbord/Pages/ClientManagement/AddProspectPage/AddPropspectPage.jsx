import React from 'react'
import CreateProspectForm from '../../../../../../Forms/ProspecClientForms/createProspectForm'

const AddPropspectPage = () => {
  return (
   
        <div className='min-h-screen flex flex-col gap-3 rounded-lg  '>
        <div className='w-full h-20 bg-[#F7D47A] rounded-lg  bg-opacity-50 flex flex-row justify-between items-center'>

        <span className=' ml-4 mb-2 font-jakarta text-3xl font-semibold size-6  text-[#3A3541] w-80'>Ajouter prospect </span>
         <button className='w-44 h-12 bg-[#F7D47A] font-jakarta text-[#3A3541] rounded-lg mr-5 font-bold'>Sauvegarder</button>
        </div>
        <div className=' h-screen w-full bg-white'> <CreateProspectForm  /></div>
 
        </div>
       
        
  
  )
}

export default AddPropspectPage