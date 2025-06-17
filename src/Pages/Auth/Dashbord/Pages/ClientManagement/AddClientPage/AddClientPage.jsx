import React, { useRef } from 'react'
import CreateProspectForm from '../../../../../../Forms/ProspecClientForms/createProspectForm'
import BecomeClientForm from "../../../../../../Forms/ProspecClientForms/becomeClientForm.jsx";

const AddClientPage = () => {
    const handleAdd = (data) => {
        console.log("Client data received:", data); // ✅ check here
    };


    return (

        <div className='min-h-screen flex flex-col gap-3 rounded-lg  '>
            <div className='w-full h-20 bg-[#F7D47A] rounded-lg  bg-opacity-50 flex flex-row justify-between items-center'>

                <span className=' ml-4 mb-2 font-jakarta text-3xl font-semibold size-6  text-[#3A3541] w-80'>Ajouter un client </span>
            </div>
            <div className=' h-screen w-full bg-white'> <BecomeClientForm handleAdd={handleAdd} /></div>

        </div>



    )
}

export default AddClientPage