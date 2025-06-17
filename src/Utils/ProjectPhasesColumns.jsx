import React from 'react';
import { Icon } from "@iconify/react/dist/iconify.js";

const ProjectPhasesColumns = ({ onActionClick }) => [
    {
        title: "Nom",
        dataIndex: "name",
        sorter: true,
        width: "20%",
    },
    {
        title: "Description",
        dataIndex: "description",
        className: "text-center",
        sorter: true,
    },
    {
        title: "Action",
        key: "action",
        align: "center",
        width: "10%",
        render: (_, record) => (
            <div className="w-full h-full flex flex-row gap-4 justify-center items-center">
                <button onClick={() => onActionClick("edit", record)}>
                    <Icon 
                        icon="hugeicons:pencil-edit-02" 
                        className="h-6 w-6" 
                    />
                </button>
                <button onClick={() => onActionClick("delete", record)}>
                    <Icon 
                        icon="hugeicons:delete-01" 
                        width="24" 
                        height="24" 
                        style={{ color: "#ec1919" }} 
                    />
                </button>
            </div>
        ),
    },
];

export default ProjectPhasesColumns;


