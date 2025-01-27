import React from 'react'
import useUnArchiveUser from '../../../../../Hooks/useUnArchiveUser'
import { toast } from 'react-toastify'

const ArchivesModalContent = ({user,handleCancel ,usersMutation}) => {
    const {unarchive,error,isMutating,archivedUser}=useUnArchiveUser()

    const handleUnArchiveUser= async()=>{
     try{
     const response = await toast.promise(
         unarchive({id:user._id}),{
           pending: 'Suppression en cours...',
           success: 'Utilisateur disarchivé avec succès!',
           error: 'Erreur lors de la suppression!',
         }
       )
     if(response){
       usersMutation()
       handleCancel()
     }  
       }catch(e){console.log(e)}
    }
  return (
    <div className='w-full h-full flex flex-col gap-6 ' >
        
        <div className='text-center'>
        <span className=' font-jakarta text-2xl  font-bold size-9 ml-10 my-8 text-[#3A3541] '>
        Voulez vous désarchiver <br/>
        cet utilisateur   {user.name}?
        </span>
    </div>
    <div className='flex flex-row justify-center gap-10 mt-11'> 
   <button className='text-black font-jakarta text-l  hover:text-red-600' onClick={handleCancel}>Annuler</button>
  <button className='h-12 w-28 bg-[#FF2E2E] rounded-lg text-white font-jakarta text-l  font-bold hover:bg-red-600' onClick={handleUnArchiveUser} >Désarchiver </button>
  

   </div>
       </div>
  )
}

export default ArchivesModalContent