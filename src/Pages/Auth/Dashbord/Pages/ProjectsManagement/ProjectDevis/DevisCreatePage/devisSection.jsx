import React, { useState, useEffect } from 'react'
import DevisSectionForm from '../../../../../../../Forms/DevisForms/devisSectionForm'
import DevisItemForm from '../../../../../../../Forms/DevisForms/DevisItemForm'
import { Icon } from '@iconify/react/dist/iconify.js'

const DevisSection = ({ sectionIndex, onSuccess }) => {
    const [items, setItems] = useState([0]) // Start with one item

    const addItem = () => {
        setItems(prev => [...prev, prev.length])
    }

    const removeItem = () => {
        if (items.length > 1) {
            setItems(prev => prev.slice(0, -1))
        }
    }
    
    useEffect(() => {
        if (onSuccess) {
            console.log(`Section ${sectionIndex} received onSuccess=true`)
        }
    }, [onSuccess, sectionIndex])

    return (
        <div className='w-full p-4 border border-solid border-[#E5E7EB] rounded-lg'>
            <div className='flex flex-col gap-3'>
                <DevisSectionForm sectionIndex={sectionIndex} onSuccess={onSuccess} />
                <div className='flex flex-row gap-2 justify-start'>
                    <button 
                        type='button' 
                        onClick={addItem}
                        className='h-9 w-40 bg-black rounded-lg my-3'
                    >
                        <div className='flex flex-row gap-1 p-1 items-center justify-center'>
                            <Icon icon="hugeicons:add-square" width="24" height="24" style={{color:" #fdfbf5"}} />
                            <span className='font-jakarta font-bold text-white'>Ajouter un article</span>
                        </div>
                    </button>
                    <button 
                        type='button' 
                        onClick={removeItem}
                        className='h-9 w-9 bg-black rounded-lg my-3 flex items-center justify-center'
                        disabled={items.length <= 1}
                    >
                        <Icon icon="hugeicons:minus-sign-square" width="24" height="24" style={{color: "#fdfbf5"}} />
                    </button>
                </div>
                
                <div className='flex flex-col gap-4 max-h-[30rem] overflow-y-auto'>
                    {items.map((itemIndex) => (
                        <DevisItemForm 
                            key={`section-${sectionIndex}-item-${itemIndex}`} 
                            section={sectionIndex}
                            index={itemIndex}
                            onSuccess={onSuccess}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DevisSection
