import React, { useState } from 'react'
import ProjectPageHeader from './projectPageHeader'
import ProjectsTbale from './ProjectsTbale'

const ProjectsPage = () => {
    const [filter,setFilter]=useState()
    const handleChangeFilter=(newFilter)=>{
        setFilter(newFilter)
      }
   
  return (
    <div className='w-full h-full flex flex-col ' >
        <div className='h-32 w-full'>
        <ProjectPageHeader onFilterChange={handleChangeFilter}/>
        </div>

        <div className='h-14 w-full  mr-7  bg-white rounded-t-2xl  pt-3 mb-1 '> <span className=' font-jakarta text-xl  font-bold size-6 ml-7 my-8 text-[#3A3541]'>Liste des projets Building</span></div>
<div>
    <ProjectsTbale filter={filter}/>
</div>
    </div>
  )
}

export default ProjectsPage