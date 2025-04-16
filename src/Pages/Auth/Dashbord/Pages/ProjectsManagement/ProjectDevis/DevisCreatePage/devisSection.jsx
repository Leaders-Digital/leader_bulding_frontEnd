// DevisSection.jsx
import React, { useEffect } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Icon } from '@iconify/react/dist/iconify.js';
import DevisSectionForm from '../../../../../../../Forms/DevisForms/devisSectionForm';
import DevisItemForm from '../../../../../../../Forms/DevisForms/DevisItemForm';
import { InputNumber } from 'antd';

const DevisSection = ({ sectionIndex, removeSection }) => {
  const { control,setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `sections.${sectionIndex}.items`
  });
useEffect(()=>{
const total=fields.reduce((acc, item) => acc + item.ptHT, 0);
setValue(`sections.${sectionIndex}.ptHT`, total);

},[fields,sectionIndex,setValue])
  return (
    <div className='w-full p-4 border border-solid border-[#E5E7EB] rounded-lg'>
      <DevisSectionForm sectionIndex={sectionIndex} />
      
      <div className='flex flex-row gap-2 justify-start'>
        <button 
          type='button' 
          onClick={() => append({})}
          className='h-9 w-40 bg-black rounded-lg my-3'
        >
          <div className='flex flex-row gap-1 p-1 items-center justify-center'>
            <Icon icon="hugeicons:add-square" width="24" height="24" style={{color:" #fdfbf5"}} />
            <span className='font-jakarta font-bold text-white'>Ajouter un article</span>
          </div>
        </button>
        
        <button 
          type='button' 
          onClick={() => remove(fields.length - 1)}
          className='h-9 w-9 bg-black rounded-lg my-3 flex items-center justify-center'
          disabled={fields.length <= 1}
        >
          <Icon icon="hugeicons:minus-sign-square" width="24" height="24" style={{color: "#fdfbf5"}} />
        </button>
      </div>

      <div className='flex flex-col gap-4 max-h-[30rem] overflow-y-auto'>
        {fields.map((item, itemIndex) => (
          <DevisItemForm
            key={item.id}
            sectionIndex={sectionIndex}
            itemIndex={itemIndex}
            removeItem={() => remove(itemIndex)}
          />
        ))}
        <div className='flex flex-col gap-1'>
        <label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
              Prix Total Hors Taxe
            </label>
            <Controller
              name={`sections.${sectionIndex}.ptHT`}
              control={control}
              render={({field}) => (
                <InputNumber 
                  {...field} 
                  disabled={true}
                  className='w-60 h-10'
                   />
              )}
            />
        </div>
      </div>
    </div>
  );
};

export default DevisSection;
