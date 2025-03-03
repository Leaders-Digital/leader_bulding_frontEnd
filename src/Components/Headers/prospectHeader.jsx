
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const ProspectHeader = () => {
  return (
    <div className='w-[94rem] h-16 bg-white rounded-2xl mr-3 justify-between flex flex-row'>
        <div className='flex flex-row h-full justify-center items-center ml-3 gap-3'>
            <button>
                <div className='flex flex-row gap-1 '>
                <Icon icon="hugeicons:user" width="24" height="24" />
                <span className='font-jakarta font-bold text-base text-[#3A3541]'>Prospect</span>
                </div>
            </button>
            <button>
                <div className='flex flex-row gap-1 '>
                <Icon icon="hugeicons:save-money-dollar" width="24" height="24" />
                <span className='font-jakarta font-bold text-base text-[#3A3541]'>Devis</span>
                </div>
            </button> <button>
                <div className='flex flex-row gap-1 '>
                <Icon icon="hugeicons:building-02" width="24" height="24" />
                <span className='font-jakarta font-bold text-base text-[#3A3541]'>Control</span>
                </div>
            </button> <button>
                <div className='flex flex-row gap-1 '>
                <Icon icon="hugeicons:muslim" width="24" height="24" />
                <span className='font-jakarta font-bold text-base text-[#3A3541]'>Equipe</span>
                </div>
            </button>
        </div>
<div className=' w-[20rem] flex flex-row h-full  justify-end items-center gap-3 mr-4'>

        <button>  <Icon icon="hugeicons:notification-02" width="30" height="30"  style={{color: '#F7D47A'}} /></button>
        <button> <Icon icon="hugeicons:logout-square-02" width="30" height="30"  style={{color:' #ff3434'}} /></button>
      
       

        </div>
    </div>
  )
}

export default ProspectHeader 