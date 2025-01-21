import React from 'react'
import { useFormContext } from 'react-hook-form'
//className={`${inputClassName}`}
const InputField = ({name,label,type,required,...rest}) => {
  
  const {register,formState:{errors}}=useFormContext()
   const error = errors[name]?.message;
    return (
    <div className='flex flex-col gap-1 px-3'>
    <label htmlFor={name}>{label}</label>
    <input type={type || 'text'} {...register(name,{required:required})}
    {...rest}
     
    />
    {error && <p  className='text-red-500'>{error}</p>}
    </div>
  )
}

export default InputField