import { Icon } from "@iconify/react/dist/iconify.js";


const clientscolumns=({onActionClick}) => [
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
        title: "Project",
        dataIndex: "projects",
        render: (projects) =>
            Array.isArray(projects) && projects.length
                ? projects.join(", ")
                : "Aucun",
    },
    {
        title: "Phone",
        dataIndex: "telephone",
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => ( <div className="w-full h-full flex flex-row gap-4 justify-center"> <button onClick={()=>onActionClick("edit",record)}><Icon icon="hugeicons:pencil-edit-02" className="h-6 w-6" /></button> <button onClick={()=>onActionClick("delete",record)}><Icon icon="hugeicons:delete-01" width="24" height="24"  style={{color:"#ec1919"}} /></button></div>),
    },
];
export default clientscolumns;
