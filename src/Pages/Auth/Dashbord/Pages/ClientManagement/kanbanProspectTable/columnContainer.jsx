    import { useDroppable } from '@dnd-kit/core'
    import React from 'react'
    import Prospect from './prospect'

    const ColumnContainer = ({status,prospects,isDragging,mutate}) => {
        const{setNodeRef}=useDroppable({id:status.value})
        console.log('the prospects from the column container',prospects)
    return (
        <div
        id={status.value}
        ref={setNodeRef}
        className={`p-4 bg-slate-300 rounded-md h-[50rem] flex flex-col relative ${
            isDragging ? 'overflow-y-visible z-0' : 'overflow-y-auto'
        }`}
        >
            <h2 className=" font-semibold font-jakarta text-lg  border-b-4 border-[#F7D47A] mb-1">{status.name} 

                <span className='bg-white rounded-lg text-sm px-2  ml-3'>{prospects.length} </span>
            </h2>
            <div className=' flex-1  overflow-y-auto overflow-x-hidden space-y-2 '>
                {
                    prospects.map((prospect)=>(
                        <Prospect key={prospect._id} prospect={prospect} mutate={mutate}/>
                    ))
                }

            </div>
        
            
            </div>
    )
    }

    export default ColumnContainer