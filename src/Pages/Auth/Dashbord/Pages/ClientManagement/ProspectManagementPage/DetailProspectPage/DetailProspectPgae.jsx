import React from 'react'
import PipelineHeader from './pipelineHeader'
import InfoProspect from './infoProspect'

const DetailProspectPgae = () => {
  return (
    <div className='h-full w-full flex flex-col gap-3'>
    <PipelineHeader/>

    <InfoProspect/>

    </div>
  )
}

export default DetailProspectPgae