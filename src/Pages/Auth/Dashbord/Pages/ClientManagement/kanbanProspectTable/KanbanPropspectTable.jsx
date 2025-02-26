  import React, { useEffect, useState } from 'react'
  import useProspects from '../../../../../../Hooks/ProspectClientHooks/useProspects'
  import { closestCenter, DndContext, DragOverlay } from '@dnd-kit/core'
  import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
  import ColumnContainer from './columnContainer'
  import Prospect from './prospect'
import { Modal } from 'antd'
import StageModalForm from './stageModalForm'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useNavigate } from 'react-router-dom'

  
  //const columns=["pas encore de résultat","À rappeler","Reporter"]
const columns=[{name:"Prospection",value:"prospection"},{name:"Suivi et Relance",value:"suivi"},{name:"Factorisation et Negociation",value:"factorisation"},{name:"Conversion",value:"conversion"},{name:"Abondon",value:"abondon"}]
const stageForms = {
  prospection: {
    statuses: ["Nouveau lead", "A qualifie", "Contact Effectué"],
  },
  suivi: {
    statuses: ["En discussion", "Relance",],
  },
  factorisation: {
    statuses: ["Proposition envoyeé", "En discussion", "Négociation en cours","En attente de validation"],
  },
  conversion: {
    statuses: ["Deal approuvé", "Contract signé","Paiement reçu"],
  },
  abondon: {
    statuses: ["Perdu","Sans Réponse","changement de projet"],
  },
};
  const KanbanPropspectTable = () => {
    const[filter,setFilter]=useState({status:"",search:""})
    const[pagination,setPagination]=useState({current:1,pageSize:100})
      const{ prospects,isLoading,error,mutate }=useProspects(  filter ,pagination)
  const[activeProspect,setActiveProspect]=useState(null)
    const [allprospects,setAllProspects]=useState([])
    const[isDragging,setIsDragging]=useState(false)
    const[targetStage,setTargetStage]=useState()
    const [selectedProspect,setSelectedProspect]=useState()
    const[openModal,setOpenModal]=useState()
    const navigate=useNavigate()
    useEffect(()=>{
      if(prospects && prospects.length>0){  setAllProspects(prospects)}
    
    },[prospects])
      //console.log("prospects",prospects)
      const onDragStart=(event)=>{
       // console.log("the prospect clicked",event.active)
          setActiveProspect(event.active.data.current)
          setIsDragging(true)         
      }
      const onDragEnd=(event)=>{
          const{active,over}=event
          if(!over) return;
          const  prospect=active.data.current
          const targetColumn=columns.find((col)=>col.value ===over.id)
    console.log("the task and column",prospect,targetColumn)
    console.log(targetColumn && prospect.stage!==targetColumn.value)
      if(targetColumn && prospect.stage!==targetColumn.value){
        setSelectedProspect(prospect)
        setTargetStage(targetColumn.value)
        setOpenModal(true)
      }
    
    setActiveProspect(null)
    setIsDragging(false)
      }

      const handleStatusChange=(selectedStatus)=>{
        setAllProspects((prev=[])=>prev.map((p)=>p._id ===selectedProspect._id?{...p,stage:targetStage,status:selectedStatus}:p) )
        setOpenModal(false)
        mutate()
      }
      if(isLoading) return <p>loading ...</p>
      const navigateAddPage=()=>{
        navigate("/gestionClient/prospect/ajouter")
      }
    return (
    
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <div className='h-10 w-full mb-3 flex flex-row justify-end '  > <button className='h-12 w-58 bg-black rounded-lg border-2 border-black px-4 hover:bg-transparent hover:text-black group' onClick={()=>navigateAddPage()}>
  <div className='flex flex-row gap-1 justify-center'>
    <Icon 
      icon="hugeicons:add-square" 
      width="24" 
      height="24" 
      className="text-white group-hover:text-black" 
    />
    <span className='font-jakarta font-bold text-base text-white group-hover:text-black'>
      Ajouter un prospect
    </span>
  </div>
</button>

 </div>
          <div className='grid grid-cols-5 gap-4 p- h-full'>
              {
                  columns.map((status)=>(
                  <SortableContext key={status.value} items={allprospects.filter((p)=>p.stage ===status.value)} strategy={verticalListSortingStrategy}>
                  <ColumnContainer status={status} prospects={allprospects.filter((p)=>p.stage ===status.value)}  isDragging={isDragging} mutate={mutate}/>
                  </SortableContext>
                  ))
              }
              </div> 
              <DragOverlay  adjustScale={false} zIndex={100} >
                  {activeProspect?<Prospect prospect={activeProspect} isOverlay={true}/>:null}
                  
              </DragOverlay>

      <Modal
      title={<span className='font-jakarta text-xl font-bold size-6 ml-3 my-8 text-[#3A3541]'>Changer stage</span>}
      centered={true}
      width={"45rem"}
      open={openModal}
      footer={null}
      onCancel={()=>setOpenModal(false)}
      className="h-[50rem] w-[42rem] px-3 py-3 mt-20"
      >
        <StageModalForm statusConfig={stageForms[targetStage]} 
        onConfirm={handleStatusChange}
        prospect={selectedProspect}
        targetStage={targetStage}
        />

      </Modal>

      </DndContext>
      
    )
  }

  export default KanbanPropspectTable