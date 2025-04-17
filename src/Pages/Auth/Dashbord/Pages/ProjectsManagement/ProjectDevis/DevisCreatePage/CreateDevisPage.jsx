// CreateDevisPage.jsx
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import DevisSection from './DevisSection';
import { Icon } from '@iconify/react/dist/iconify.js';
import { InputNumber } from 'antd';
import PDFGenerator from '../../../../../../../Components/PDFGenerator ';

const CreateDevisPage = () => {
  const [grandTotal, setGrandTotal] = useState(0);
const[pdfData,setPdfData]=useState()
  const methods = useForm({
    defaultValues: {
      sections: [{
        title: '',
        description: '',
        ptHT: 0,
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

  const { control, handleSubmit, reset, watch } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sections'
  });
  
  // Watch all sections to calculate the grand total
  const sections = watch('sections') || [];
  
  // Calculate grand total whenever sections change
  useEffect(() => {
    if (sections && sections.length > 0) {
      const total = sections.reduce((acc, section) => {
        return acc + (Number(section.ptHT) || 0);
      }, 0);
      setGrandTotal(total);
    } else {
      setGrandTotal(0);
    }
  }, [sections]);

  const onSubmit = (data) => {
  
    const processedData = {
      ...data,
      sections: data.sections.map(section => ({
        ...section,
        ptHT: Number(section.ptHT) || 0,
        items: section.items.map(item => ({
          ...item,
          qte: Number(item.qte) || 0,
          puHT: Number(item.puHT) || 0,
          ptHT: Number(item.ptHT) || 0
        }))
      }))
    };
    setPdfData(processedData);
    console.log('Form data:', processedData);
    console.log('Grand Total:', grandTotal);
    reset();
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
              ptHT: 0,
              items: [{
                title: '',
                description: '',
                unite: '',
                qte: 0,
                puHT: 0,
                ptHT: 0
              }]
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
        
        <div className='flex flex-col gap-1 mt-4 border-t pt-4'>
          <label className='font-jakarta font-bold text-lg text-[#3A3541] w-full'>
            Prix Total Hors Taxe (Toutes Sections)
          </label>
          <InputNumber 
            value={grandTotal}
            disabled={true}
            className='w-60 h-10 text-lg'
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </div>
      </FormProvider>
   <PDFGenerator formData={pdfData} />
    </div>
  );
};

export default CreateDevisPage;
