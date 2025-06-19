import AddPropspectPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/AddProspectPage/AddPropspectPage";
import ClientPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/ClientManagementPage/ClientPage";
import EditProspectPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/EditProspectPage/EditProspectPage";
import KanbanPropspectTable from "../Pages/Auth/Dashbord/Pages/ClientManagement/kanbanProspectTable/KanbanPropspectTable";
import DetailProspectPgae from "../Pages/Auth/Dashbord/Pages/ClientManagement/ProspectManagementPage/DetailProspectPage/DetailProspectPgae";
import ProspectPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/ProspectManagementPage/ProspectPage";
import AddClientPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/AddClientPage/AddClientPage.jsx";

const clientManagementRoutes=[

    {
        path:"/gestionClient/prospect",
        name:"Gestion Prospect",
        element:<ProspectPage/>
    },
    {
    path:"/gestionClient/prospect/:id",
     element:<DetailProspectPgae/>
}
,
{
    path:"/gestionClient/editProspect/:id",
     element:<EditProspectPage/>
}
,{
        path:"/gestionClient/client/ajouter",
        element:<AddClientPage/>
    }

,
{
     path:"/gestionClient/prospect/ajouter",
     element:<AddPropspectPage/>
}
    ,

    {
        path:"/gestionClient/prospects",
        name:"Tableau des prospects",
        element:<KanbanPropspectTable/>
    } ,  {
        path:"/gestionClient/client",
        name:"Gestion Client",
        element:<ClientPage/>
    },
]
export default clientManagementRoutes