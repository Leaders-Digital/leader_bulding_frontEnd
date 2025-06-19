import React from 'react';
import {Icon} from "@iconify/react/dist/iconify.js";

const ProjectPhasesColumns = ({onActionClick, projects = []}) => [
    {
        title: "Projet",
        dataIndex: "projectId",
        key: "projectId",
        width: "20%",
        render: (projectId, record) => {
            return projectId.name;
        },
        sorter: (a, b) => {
            // Handle populated projectId objects
            let projectAName = '';
            if (a.projectId && typeof a.projectId === 'object' && a.projectId.name) {
                projectAName = a.projectId.name;
            } else if (a.projectId && typeof a.projectId === 'string') {
                const projectA = projects.find(p => p._id === a.projectId);
                projectAName = projectA?.name || '';
            }

            let projectBName = '';
            if (b.projectId && typeof b.projectId === 'object' && b.projectId.name) {
                projectBName = b.projectId.name;
            } else if (b.projectId && typeof b.projectId === 'string') {
                const projectB = projects.find(p => p._id === b.projectId);
                projectBName = projectB?.name || '';
            }

            return projectAName.localeCompare(projectBName);
        }
    },
    {
        title: "Nom de la phase",
        dataIndex: "name",
        key: "name",
        width: "20%",
        sorter: true,
    },
    {
        title: "Statut",
        dataIndex: "status",
        key: "status",
        width: "15%",
        render: (status) => {
            const statusColors = {
                'En cours': '#1890ff',
                'Terminé': '#52c41a',
                'En attente': '#faad14',
                'Annulé': '#ff4d4f'
            };
            return (
                <span style={{color: statusColors[status] || '#666'}}>
                    {status}
                </span>
            );
        },
        sorter: true,
    },
    {
        title: "Progression",
        dataIndex: "pourcentage",
        key: "pourcentage",
        width: "15%",
        render: (pourcentage) => `${pourcentage}%`,
        sorter: true,
    },
    {
        title: "Date de début",
        dataIndex: "startDate",
        key: "startDate",
        width: "15%",
        render: (date) => date ? new Date(date).toLocaleDateString('fr-FR') : '-',
        sorter: true,
    },
    {
        title: "Date de fin",
        dataIndex: "finishDate",
        key: "finishDate",
        width: "15%",
        render: (date) => date ? new Date(date).toLocaleDateString('fr-FR') : '-',
        sorter: true,
    },
    {
        title: "Action",
        key: "action",
        align: "center",
        width: "10%",
        render: (_, record) => (
            <div className="w-full h-full flex flex-row gap-4 justify-center items-center">
                <button
                    onClick={() => onActionClick("edit", record)}
                    className="hover:bg-gray-100 p-1 rounded"
                >
                    <Icon
                        icon="hugeicons:pencil-edit-02"
                        className="h-6 w-6"
                    />
                </button>
                <button
                    onClick={() => onActionClick("delete", record)}
                    className="hover:bg-gray-100 p-1 rounded"
                >
                    <Icon
                        icon="hugeicons:delete-01"
                        width="24"
                        height="24"
                        style={{color: "#ec1919"}}
                    />
                </button>
            </div>
        ),
    },
];

export default ProjectPhasesColumns;


