  import React, { useEffect, useState } from 'react'
  import useProspects from '../../../../../../Hooks/ProspectClientHooks/useProspects'
  import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core'
  import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
  import ColumnContainer from './columnContainer'
  import Prospect from './prospect'

  
  //const columns=["pas encore de résultat","À rappeler","Reporter"]
const columns=[{name:"Prospection",value:"prospection"},{name:"Suivi et Relance",value:"suivi"},{name:"Factorisation et Negociation",value:"factorisation"},{name:"Conversion",value:"conversion"},{name:"Abondon",value:"abondon"}]
  const KanbanPropspectTable = () => {
    const[filter,setFilter]=useState({status:"",search:""})
    const[pagination,setPagination]=useState({current:1,pageSize:100})
      const{ prospects,isLoading,error }=useProspects(  filter ,pagination)
  const[activeProspect,setActiveProspect]=useState(null)
    const [allprospects,setAllProspects]=useState([])
    const[isDragging,setIsDragging]=useState(false)
    useEffect(()=>{
      if(prospects && prospects.length>0){  setAllProspects(prospects)}
    
    },[prospects])
      console.log("prospects",prospects)
      const onDragStart=(event)=>{
        console.log("the prospect clicked",event.active)
          setActiveProspect(event.active.data.current)
          setIsDragging(true)         
      }
      const onDragEnd=(event)=>{
          const{active,over}=event
          if(!over) return;
          const taskId=active.id 
          const newStatus=over.id
    console.log("the task and column",taskId,newStatus)
      
    setAllProspects((prev=[])=>prev.map((p)=>p._id ===taskId?{...p,stage:newStatus}:p) )
    setActiveProspect(null)
    setIsDragging(false)
      }
      if(isLoading) return <p>loading ...</p>
    return (
    
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className='h-10 w-full mb-2'  > <button className= 'bg-Golden h-full w-40 text-[#3A3541] font-jakarta font-bold rounded-lg '>Ajouter un prospect</button><button></button>  </div>
          <div className='grid grid-cols-5 gap-4 p- h-full'>
              {
                  columns.map((status)=>(
                  <SortableContext key={status.value} items={allprospects.filter((p)=>p.stage ===status.value)} strategy={verticalListSortingStrategy}>
                  <ColumnContainer status={status} prospects={allprospects.filter((p)=>p.stage ===status.value)} isDragging={isDragging}/>
                  </SortableContext>
                  ))
              }
              </div> 
              <DragOverlay  adjustScale={false} zIndex={100} >
                  {activeProspect?<Prospect prospect={activeProspect} isOverlay={true}/>:null}
                  
              </DragOverlay>

      </DndContext>
    )
  }

  export default KanbanPropspectTable