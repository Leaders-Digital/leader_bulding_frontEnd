    import { useDroppable } from '@dnd-kit/core'
    import React from 'react'
    import Prospect from './prospect'

    const ColumnContainer = ({status,prospects,isDragging}) => {
        const{setNodeRef}=useDroppable({id:status})
    return (
        <div
        id={status}
        ref={setNodeRef}
        className={`p-4 bg-gray-200 rounded-md h-[50rem] flex flex-col relative ${
            isDragging ? 'overflow-y-visible z-0' : 'overflow-y-auto'
        }`}
        >
            <h2 className="text-xl font-bold">{status.toUpperCase()}</h2>
            <div className=' flex-1  overflow-y-auto overflow-x-hidden space-y-2 '>
                {
                    prospects.map((prospect)=>(
                        <Prospect key={prospect._id} prospect={prospect}/>
                    ))
                }

            </div>
        
            
            </div>
    )
    }

    export default ColumnContainer