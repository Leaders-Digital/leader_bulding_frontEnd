import React, { useState, useEffect } from 'react';
import useDevis from '../../../../../../Hooks/DevisHooks/UseDevis'
import PDFGenerator from '../../../../../../Components/PDFGenerator '
import { Collapse } from 'antd'

const ListeDevis = ({filter}) => {
    const [pagination, setPagination] = useState({current:1, pageSize:100});
    const { devis, isLoading, totalItems, totalPages } = useDevis(filter, pagination);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (devis) {
            setItems(devis.map((d, i) => ({
                key: d._id,
                label: `${d?.name}     - Date du saisie: ${new Date(d?.createdAt).toLocaleDateString('fr-FR')}`,
                
                children: <PDFGenerator formData={d}/>
            })));
        }
    }, [devis]);

    if(devis) console.log("devis",devis);

    return (
        <div className='h-full w-full'>
            <Collapse items={items} defaultActiveKey={[items[0]?.key]} className='bg-[rgba(247,212,122,0.2)]'/>
        </div>
    )
}

export default ListeDevis;