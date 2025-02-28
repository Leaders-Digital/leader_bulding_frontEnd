import React, { useRef } from 'react'
import CreateProspectForm from '../../../../../../Forms/ProspecClientForms/createProspectForm'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '../../../../../../Config/SwrConfig'

const EditProspectPage = () => {
    const formSubmit= useRef()
    const handelAdd=()=>{
        if(formSubmit.current){
            formSubmit.current()
        }
    }
    const{id}=useParams()
  
    const { data: prospect, error, isLoading } = useSWR(
      id ? `prospect/getById/${id}` : null, 
      fetcher
    )
    if (isLoading) {
      return <div>Loading...</div>
    }
  
    if (error) {
      return <div>Error: {error.message}</div>
    }
    console.log("prospect from the adit ",prospect?.data)
  return (
    <div className='min-h-screen flex flex-col gap-3 rounded-lg  '>
    <div className='w-full h-20 bg-[#F7D47A] rounded-lg  bg-opacity-50 flex flex-row justify-between items-center'>
    <span className=' ml-4 mb-2 font-jakarta text-3xl font-semibold size-6  text-[#3A3541] w-80'>Modifier prospect </span>
     <button className='w-44 h-12 bg-[#F7D47A] font-jakarta text-[#3A3541] rounded-lg mr-5 font-bold ' onClick={handelAdd} type='submit'>Sauvegarder</button>
    </div>
    <div className=' h-screen w-full bg-white'> <CreateProspectForm onSubmitForm={formSubmit} prospect={prospect?.data} /></div>

    </div>
  )
}

export default EditProspectPage