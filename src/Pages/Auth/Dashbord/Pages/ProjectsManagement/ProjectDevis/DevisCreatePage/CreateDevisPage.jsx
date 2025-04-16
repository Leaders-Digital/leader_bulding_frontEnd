// CreateDevisPage.jsx
import React from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import DevisSection from './DevisSection';
import { Icon } from '@iconify/react/dist/iconify.js';

const CreateDevisPage = () => {
  const methods = useForm({
    defaultValues: {
      sections: [{
        title: '',
        description: '',
        items: [{
          title: '',
          description: '',
          unite: '',
          qte: 0,
          puHT: 0,
          ptHT: 0
        }]
      }]
    }
  });

  const { control, handleSubmit,reset } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sections'
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
    reset()
  };

  return (
    <div className='h-full w-full bg-white p-4 rounded-lg flex flex-col gap-4 overflow-y-auto'>
      <FormProvider {...methods}>
        <div className='sticky top-0 z-10 bg-white pb-2 flex flex-row gap-2'>
          <button 
            type='button' 
            onClick={() => append({
              title: '',
              description: '',
              items: [{}]
            })}
            className='h-9 w-52 bg-black rounded-lg my-3'
          >
            <div className='flex flex-row gap-1 p-1 items-center justify-center'>
              <Icon icon="hugeicons:add-square" width="24" height="24" style={{color:" #fdfbf5"}} />
              <span className='font-jakarta font-bold text-white'>Ajouter une section</span>
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

          <div className='flex flex-row justify-end items-end w-full'>
            <button 
              type='button' 
              onClick={handleSubmit(onSubmit)}
              className='h-12 w-52 bg-Golden rounded-lg my-3 flex items-center justify-center'
            >
              <span className='font-jakarta font-bold text-black'>Sauvegarder</span>
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-6 pb-4'>
          {fields.map((section, sectionIndex) => (
            <DevisSection 
              key={section.id}
              sectionIndex={sectionIndex}
              removeSection={() => remove(sectionIndex)}
            />
          ))}
        </div>
      </FormProvider>
    </div>
  );
};

export default CreateDevisPage;