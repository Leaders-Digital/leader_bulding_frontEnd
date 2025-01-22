import { Pagination, Table } from 'antd'
import React from 'react'
import "../../Styles/Table.css"
const CostumTable = ({
    columns,
    data,
    loading,
    pagination,
    onChange,
  }) => {
    const styledColumns = columns.map((column) => ({
      ...column,
      className:'text-center'
      ,
      onHeaderCell: () => ({
        style: { textAlign: 'center' }, 
      }),
    }));
   console.log("from costum table",pagination)
   const handlePaginationTable=(page,pageSize)=>{
   onChange({current:page,pageSize: pageSize}) 
   
   }
  return (
    <div className='w-full h-full flex flex-col '  >
<div className='flex-1 overflow-y-auto flex-grow min-h-[34rem] '><Table
      columns={styledColumns} 
      dataSource={data}
      pagination={false} 
      loading={loading} 
      onChange={onChange} 
      rowClassName={()=>'custom-table-row'}
      className='w-full '
      size='middle'
      
    /></div>

    <div className='flex items-center justify-center   pt-4  bg-white   w-full justify-items-center rounded-xl '>
       <Pagination
    showQuickJumper
    current={pagination.current}
    pageSize={pagination.pageSize}
    total={pagination.total}
    onChange={handlePaginationTable}
    responsive={false}
    className='mb-4'
    
    
    
    /></div>
   
    </div>
  )
}

export default CostumTable