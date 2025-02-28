import Home from "../Pages/Auth/Dashbord/Home";
import AddPropspectPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/AddProspectPage/AddPropspectPage";
import ClientPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/ClientManagementPage/ClientPage";
import EditProspectPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/EditProspectPage/EditProspectPage";
import KanbanPropspectTable from "../Pages/Auth/Dashbord/Pages/ClientManagement/kanbanProspectTable/KanbanPropspectTable";
import ProspectDeatilsPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/ProspectDeatilsPage/ProspectDeatilsPage";
import DetailProspectPgae from "../Pages/Auth/Dashbord/Pages/ClientManagement/ProspectManagementPage/DetailProspectPage/DetailProspectPgae";
import ProspectPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/ProspectManagementPage/ProspectPage";

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

,
{
     path:"/gestionClient/prospect/ajouter",
     element:<AddPropspectPage/>
}
    ,
    {
        path:"/gestionClient/client",
        name:"Gestion Client",
        element:<ClientPage/>
    },
    {
        path:"/gestionClient/prospects",
        name:"Tableau des prospects",
        element:<KanbanPropspectTable/>
    }
    ,
    {
        path:"/gestionClient/rdv",
        name:"Gestion RDV Client",
        element:<Home/>
    }
]
export default clientManagementRoutes