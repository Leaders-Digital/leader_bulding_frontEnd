import React, { useState, useEffect } from 'react';
import useDevis from '../../../../../../Hooks/DevisHooks/UseDevis'
import PDFGenerator from '../../../../../../Components/PDFGenerator '
import { Collapse, Spin } from 'antd'

const ListeDevis = ({filter}) => {
    const [pagination, setPagination] = useState({current:1, pageSize:100});
    const { devis, isLoading, totalItems, totalPages } = useDevis(filter, pagination);
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (isLoading) {
            setItems([]); // clear items during loading
        }
    }, [isLoading]);
    useEffect(() => {
        if (devis) {
            setItems(devis.map((d, i) => ({
                key: d._id,
                label: `${d?.title}     - Date du saisie: ${new Date(d?.createdAt).toLocaleDateString('fr-FR')}`,
                
                children: <PDFGenerator formData={d}/>
            })));
        }
    }, [devis]);

  

    return (
        
        <div className='h-full w-full overflow-y-auto mb-5'>
            {isLoading?<Spin size='large' />:<Collapse items={items} defaultActiveKey={[items[0]?.key]} className='bg-[rgba(247,212,122,0.2)]'/>}
        </div>
    )
}

export default ListeDevis;