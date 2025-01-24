
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'

const archivedUsersColumns = ({onActionClick}) => {
return [
  {
    title: "Nom",
    dataIndex: "name",
    sorter: true,
    render: (name, record) => `${record.name} `,
    width: "20%",
  },
  {
    title: "Prénom",
    dataIndex: "lastName",
  },
  {
    title: "Email",
    dataIndex: "email",
    className: "text-center",
  },
  {
    title: "Role",
    dataIndex: "role",
  },

  {
    title: "Phone",
    dataIndex: "telephone",
  },
  {
      title: "Action",
      key: "action",
      render: (_, record) => ( <div className="w-full h-full flex flex-row gap-4 justify-center">  <button onClick={()=>onActionClick(record)}><Icon icon="hugeicons:delete-put-back" width="24" height="24"  style={{color:"#76d525"}} /></button>  </div>),
    },
  
];
}

export default archivedUsersColumns