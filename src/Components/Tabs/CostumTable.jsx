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
  return (
    <div className='w-full h-full' >

<Table
      columns={styledColumns} 
      dataSource={data}
      pagination={pagination} 
      loading={loading} 
      onChange={onChange} 
      rowClassName={()=>'custom-table-row'}
      className='w-full '
    />
    <Pagination
    showQuickJumper
    current={pagination.current}
    pageSize={pagination.pageSize}
    total={pagination.total}
    onChange={onchange}
    
    />
    </div>
  )
}

export default CostumTable