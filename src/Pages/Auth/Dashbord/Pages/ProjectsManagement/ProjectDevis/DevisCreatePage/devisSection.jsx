// DevisSection.jsx
import React, {useEffect} from 'react';
import {Controller, useFieldArray, useFormContext, useWatch} from 'react-hook-form';
import {Icon} from '@iconify/react/dist/iconify.js';
import DevisSectionForm from '../../../../../../../Forms/DevisForms/devisSectionForm.jsx';
import DevisItemForm from '../../../../../../../Forms/DevisForms/DevisItemForm.jsx';
import {InputNumber} from 'antd';

const DevisSection = ({sectionIndex, removeSection}) => {
    const {control, setValue, register, watch, getValues} = useFormContext();
    const {fields, append, remove} = useFieldArray({
        control,
        name: `sections.${sectionIndex}.items`
    });


    useEffect(() => {


        register(`sections.${sectionIndex}.ptHT`);


        setValue(`sections.${sectionIndex}.ptHT`, 0);

        // Clean up function

    }, [register, setValue, sectionIndex]);

    // Use useWatch for more granular reactivity
    const items = useWatch({control, name: `sections.${sectionIndex}.items`}) || [];

    // Calculate section total whenever items change
    useEffect(() => {
        const total = items.reduce((acc, item) => {
            const qte = Number(item.qte) || 0;
            const puHT = Number(item.puHT) || 0;
            return acc + (qte * puHT);
        }, 0);

        setValue(`sections.${sectionIndex}.ptHT`, total);

        // Clean up function
        return () => {
            // Reset to avoid memory leaks
            console.log(`Cleanup total calculation for section ${sectionIndex}`);
        };
    }, [items, setValue, sectionIndex]);

    const handleAddItem = () => {
        append({
            title: '',
            description: '',
            unite: '',
            qte: 0,
            puHT: 0,
            ptHT: 0
        });
    };

    return (
        <div className='w-full p-4 border border-solid border-[#E5E7EB] rounded-lg'>
            <DevisSectionForm sectionIndex={sectionIndex}/>

            <div className='flex flex-row gap-2 justify-start'>
                <button
                    type='button'
                    onClick={handleAddItem}
                    className='h-9 w-40 bg-black rounded-lg my-3'
                >
                    <div className='flex flex-row gap-1 p-1 items-center justify-center'>
                        <Icon icon="hugeicons:add-square" width="24" height="24" style={{color: " #fdfbf5"}}/>
                        <span className='font-jakarta font-bold text-white'>Ajouter un article</span>
                    </div>
                </button>

                <button
                    type='button'
                    onClick={() => remove(fields.length - 1)}
                    className='h-9 w-9 bg-black rounded-lg my-3 flex items-center justify-center'
                    disabled={fields.length <= 1}
                >
                    <Icon icon="hugeicons:minus-sign-square" width="24" height="24" style={{color: "#fdfbf5"}}/>
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
                        Prix Total Hors Taxe (Section)
                    </label>
                    <Controller
                        name={`sections.${sectionIndex}.ptHT`}
                        control={control}
                        defaultValue={0}
                        render={({field}) => (
                            <InputNumber
                                {...field}
                                disabled={true}
                                className='w-60 h-10'
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/,/g, '')}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default DevisSection;
