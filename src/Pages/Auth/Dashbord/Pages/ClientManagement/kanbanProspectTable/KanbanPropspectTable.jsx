import React, { useEffect, useState } from 'react'
import useProspects from '../../../../../../Hooks/ProspectClientHooks/useProspects'
import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import ColumnContainer from './columnContainer'
import Prospect from './prospect'
const columns=["pas encore de résultat","À rappeler","Reporter"]

const KanbanPropspectTable = () => {
   const[filter,setFilter]=useState({status:"",search:""})
   const[pagination,setPagination]=useState({current:1,pageSize:10})
    const{ prospects,isLoading,error }=useProspects(  filter ,pagination)
 const[activeProspect,setActiveProspect]=useState(null)
   const [allprospects,setAllProspects]=useState([])
   const[isDragging,setIsDragging]=useState(false)
  useEffect(()=>{
    if(prospects && prospects.length>0){  setAllProspects(prospects)}
  
  },[prospects])
    console.log("prospects",prospects)
    const onDragStart=(event)=>{
        setActiveProspect(event.active.data.current)
        setIsDragging(true)
    }
    const onDragEnd=(event)=>{
        const{active,over}=event
        if(!over) return;
        const taskId=active.id 
        const newStatus=over.id
  console.log("the task and column",taskId,newStatus)
    
  setAllProspects((prev=[])=>prev.map((p)=>p._id ===taskId?{...p,status:newStatus}:p) )
   setActiveProspect(null)
   setIsDragging(false)
    }
    if(isLoading) return <p>loading ...</p>
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className='grid grid-cols-4 gap-4 p-4 h-full'>
            {
                columns.map((status)=>(
                <SortableContext key={status} items={allprospects.filter((p)=>p.status ===status)} strategy={verticalListSortingStrategy}>
                <ColumnContainer status={status} prospects={allprospects.filter((p)=>p.status ===status)} isDragging={isDragging}/>
                </SortableContext>

                ))
            }
            </div> 
            <DragOverlay>
                <div className='z-50'>{activeProspect?<Prospect prospect={activeProspect}/>:null}</div>
                
            </DragOverlay>

    </DndContext>
  )
}

export default KanbanPropspectTable