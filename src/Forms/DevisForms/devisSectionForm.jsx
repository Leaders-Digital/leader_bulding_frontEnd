// DevisSectionForm.jsx
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Select, Input } from 'antd';
const { TextArea } = Input;

const DevisSectionForm = ({ sectionIndex }) => {
  const { control } = useFormContext();
  const nomSections = [
    { value: "Terrassement", label: "Terrassement" },
    { value: "Fondation-Structure", label: "Fondation-Structure" },
    { value: "Maçonnerie", label: "Maçonnerie" },
    { value: "Enduit", label: "Enduit" }
  ];

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-1'>
        <label className='font-jakarta font-bold size-1 my-4 text-[#3A3541] w-full'>
          Nom du Section: {sectionIndex + 1}
        </label>
        <Controller
          name={`sections.${sectionIndex}.title`}
          control={control}
          render={({ field }) => (
            <Select {...field} options={nomSections} className='h-9 w-full' />
          )}
        />
      </div>
      
      <div className='flex flex-col gap-1'>
        <label className='font-jakarta font-bold size-1 my-4 text-[#3A3541] w-full'>
          Description
        </label>
        <Controller
          name={`sections.${sectionIndex}.description`}
          control={control}
          render={({ field }) => (
            <TextArea {...field} rows={3} className='h-9 w-full' />
          )}
        />
      </div>
    </div>
  );
};

export default DevisSectionForm;