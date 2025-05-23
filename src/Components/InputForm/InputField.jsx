
import { useFormContext } from 'react-hook-form'

const InputField = ({name,label,type,required,...rest}) => {
  
  const {register,formState:{errors}}=useFormContext()
   const error = errors[name]?.message;
    return (
    <div className='flex flex-col gap-1 px-2'>
    <label htmlFor={name} className=' font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full ml-2'>{label}</label>
    <input type={type || 'text'} {...register(name,{required:required}) }
    {...rest}
     
    />
    {error && <p  className='text-red-500'>{error}</p>}
    </div>
  )
}

export default InputField