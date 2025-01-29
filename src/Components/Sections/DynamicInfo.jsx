import React from 'react'
const chunkArray=(array,size)=>{
    const result=[]
    for(let i=0;i<array.length;i+=size){
        result.push(array.slice(i,i+size))
    }
    return result
}
const DynamicInfo = ({data}) => {
    const chunks=chunkArray(Object.keys(data),3)
  return (
    <div>
        {chunks.map((chunk,index)=>(
        <div  key={index}className="flex flex-row gap-8 mt-3"> {chunk.map((key,index)=>(
      <div key={index}  className="flex flex-col  w-1/3 items-start">

        <span  className="font-jakarta text-xl font-bold size-6 text-[#3A3541] w-full">
     {key.charAt(0).toUpperCase()+key.slice(1)}

        </span>
        <span className="font-jakarta text-xl text-[#3A3541] w-full">
            {data[key]}
        </span>
      </div>

        ))}</div>
     ))}
    </div>
  )
}

export default DynamicInfo