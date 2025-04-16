// DevisItemForm.jsx
import React, { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Input, Select, InputNumber } from 'antd';
import InputField from '../../Components/InputForm/InputField';

const DevisItemForm = ({ sectionIndex, itemIndex, removeItem }) => {
  const { control, watch, setValue, register } = useFormContext();
  
  const unites = [
    { value: "M²", label: "M²" },
    { value: "M³", label: "M³" }
  ];

  const qteFieldName = `sections.${sectionIndex}.items.${itemIndex}.qte`;
  const puHTFieldName = `sections.${sectionIndex}.items.${itemIndex}.puHT`;
  const ptHTFieldName = `sections.${sectionIndex}.items.${itemIndex}.ptHT`;
  
  // Register the ptHT field with react-hook-form
  useEffect(() => {
    register(ptHTFieldName);
  }, [register, ptHTFieldName]);
  
  // Watch for changes in quantity and price
  const qteValue = watch(qteFieldName) || 0;
  const puHTValue = watch(puHTFieldName) || 0;
  
  // Calculate total price whenever quantity or unit price changes
  useEffect(() => {
    const calculatedTotal = Number(qteValue) * Number(puHTValue);
    setValue(ptHTFieldName, calculatedTotal);
  }, [qteValue, puHTValue, setValue, ptHTFieldName]);

  return (
    <div className='w-full border border-solid border-[#E5E7EB] rounded-lg p-3'>
      <div className='flex flex-col gap-1'>
        <InputField
          name={`sections.${sectionIndex}.items.${itemIndex}.title`}
          label={`Nom de l'article ${itemIndex + 1}`}
          placeholder="Nom"
          required="Nom de l'article est obligatoire"
          className="h-9 w-full rounded-lg bg-[#F4F5F9] p-2"
        />
        
        <div className='flex flex-col gap-1'>
          <label className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
            Description de l'article
          </label>
          <Controller
            name={`sections.${sectionIndex}.items.${itemIndex}.description`}
            control={control}
            render={({ field }) => (
              <Input.TextArea {...field} rows={3} className='h-9 w-full' />
            )}
          />
        </div>

        <div className='flex flex-row justify-between gap-1'>
          <div className='flex flex-col gap-1'>
            <label className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
              Unité
            </label>
            <Controller
              name={`sections.${sectionIndex}.items.${itemIndex}.unite`}
              control={control}
              render={({ field }) => (
                <Select {...field} options={unites} className='w-60 h-9' />
              )}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
              Quantité
            </label>
            <Controller
              name={qteFieldName}
              control={control}
              defaultValue={0}
              render={({field}) => (
                <InputNumber 
                  {...field} 
                  min={0} 
                  className='w-60 h-10'
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
              Prix Unité Hors Taxe
            </label>
            <Controller
              name={puHTFieldName}
              control={control}
              defaultValue={0}
              render={({field}) => (
                <InputNumber 
                  {...field} 
                  min={0} 
                  className='w-60 h-10'
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                />
              )}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="" className='font-jakarta font-bold size-1 my-5 text-[#3A3541] w-full'>
              Prix Total Hors Taxe
            </label>
            <Controller
              name={ptHTFieldName}
              control={control}
              render={({field}) => (
                <InputNumber 
                  {...field} 
                  disabled={true}
                  className='w-60 h-10'
                  value={Number(qteValue) * Number(puHTValue)}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevisItemForm;
