import { Button, Progress, Select } from 'antd'
import React, { useState, useCallback, useEffect } from 'react'
import { Controller, useWatch } from 'react-hook-form'
import InputField from '../../Components/InputForm/InputField'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

const LocationProject = ({ control,forceReset ,setForceReset}) => {
  //const [location, setLocation] = useState()
  const location=useWatch({control,name:"location"})
 // const [percent, setPercent] = useState(0)
 const percent = useWatch({ control, name: "percent" })

  const owner = [
    { value: "Particulier", label: "Particulier" },
    { value: "Lotissement", label: "Lotissement" }
  ]

  /*const handleLocationChange = useCallback((val, field) => {
    field.onChange(val)
    //setLocation(val)
  }, [])
*/
  const handlePercentChange = useCallback((newValue, field) => {
    field.onChange(newValue)
    //setPercent(newValue)
  }, [])

  const increase = useCallback((field) => {
    const currentPercent = control.getValues('percent') || 0 // Get current value from form
    const newPercent = Math.min(currentPercent + 10, 100)
    handlePercentChange(newPercent, field)
  }, [control, handlePercentChange])

  const decline = useCallback((field) => {
    const currentPercent = control.getValues('percent') || 0 // Get current value from form
    const newPercent = Math.max(currentPercent - 10, 0)
    handlePercentChange(newPercent, field)
  }, [control, handlePercentChange])
 /*useEffect(()=>{
if(forceReset){
  setPercent(0)
  //setLocation("")
 
}

 },[forceReset])*/
  return (
    <div className="h-full w-full mt-2">
      <span className="font-jakarta text-xl font-bold  text-[#3A3541] ml-6 mt-6 mb-2">
        Détails du projet
      </span>
      <div className="px-6 flex flex-col gap-1 mt-3">
        <label
          htmlFor=""
          className=" font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full "
        >
          Localisation Terrain/Projet
        </label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={owner}
              className="h-12 w-full"
              value={location}
           
            />
          )}
        />
      </div>
      {(location === "Lotissement") && (
        <div className="flex flex-col gap-2 px-4">
          <InputField
            name="nomLotiss"
            label="Nom de lotissement"
            placeholder="Nom lotissement"
            className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"
          />
          <InputField
            name="numeroLotiss"
            label="Num Lot:"
            placeholder="Num lotissement"
            className="h-12 w-full rounded-lg bg-[#F4F5F9] px-3"
          />
        </div>
      )}

      {(location ==="Particulier")&&
       <div className='px-4'>   <InputField
      name="adressParticulier"
      label="Adress"
      placeholder="Adresse"
      className="h-12 w-full rounded-lg bg-[#F4F5F9] px-2 "
      /></div>
   
      }
      <div className="flex flex-col gap-2 mt-3 ml-8">
        <label
          htmlFor=""
          className=" font-jakarta   font-bold size-1  my-5 text-[#3A3541] w-full "
        >
          Pourcentage
        </label>
        <Controller
          name="percent"
          control={control}
          render={({ field }) => (
            <>
              <Progress {...field} percent={percent} type="circle" />
              <div className="flex flex-row  ml-6">
                <Button onClick={() => decline(field)} icon={<MinusOutlined />} />
                <Button onClick={() => increase(field)} icon={<PlusOutlined />} />
              </div>
            </>
          )}
        />
      </div>
    </div>
  )
}

export default LocationProject