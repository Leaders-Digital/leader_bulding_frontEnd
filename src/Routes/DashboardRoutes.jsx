import {Icon} from "@iconify/react/dist/iconify.js";
import MainLayout from "../Layout/MainLayout";
import clientManagementRoutes from "./clientsManagement";
import UserManagementPage from "../Pages/Auth/Dashbord/Pages/UserManagementPage/userManagementPage";
import ArchivedUserPage from "../Pages/Auth/Dashbord/Pages/ArchivedUsers/ArchivedUserPage";
import UserProfilePage from "../Pages/Auth/Dashbord/Pages/UserManagementPage/userProfile/UserProfilePage";

import ProjectManagement from "./ProjectManagement";
import Home from "../Pages/Auth/Dashbord/Home";


const dashboardRoutes = [
    {
        path: "/",
        element: <MainLayout/>,
        protected: true,
        roles: ['user', "admin"],
        children: [
            {
                path: "Dashboard",
                name: "Dashboard",
                element: <Home/>,
                protected: true,
                icon: <Icon icon="hugeicons:dashboard-square-02" width="24" height="24"/>,

            },
            {
                path: "users",
                name: "Gestion Utilisateurs",
                element: <UserManagementPage/>,
                protected: true,
                icon: <Icon icon="hugeicons:edit-user-02" width="24" height="24"/>,
            },
            {
                path: "profil",
                element: <UserProfilePage/>,
                protected: true
            }
            ,
            {
                path: "archive",
                name: "Archivé",
                element: <ArchivedUserPage/>,
                protected: true,
                icon: <Icon icon="hugeicons:archive-01" width="24" height="24"/>,

            },
            {
                path: "gestionClient",
                name: "Gestion Client et RDV",
                // element: <Home />,
                protected: true,
                icon: <Icon icon="hugeicons:user-square" width="24" height="24" style={{color: "#000"}}/>,
                children: [...clientManagementRoutes]

            }, {
                path: "gestionProject",
                name: "Gestion des projets",
                icon: <Icon icon="hugeicons:building-03" width="24" height="24" style={{color: "#000"}}/>,
                children: [...ProjectManagement]
            }

        ],
    },
];

export default dashboardRoutes;
