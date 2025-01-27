import Home from "../Pages/Auth/Dashbord/Home";
import ProspectPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/ProspectManagementPage/ProspectPage";

const clientManagementRoutes=[

    {
        path:"/gestionClient/prospect",
        name:"Gestion Prospect",
        element:<ProspectPage/>
    },
    {
        path:"/gestionClient/client",
        name:"Gestion Client",
        element:<Home/>
    },{
        path:"/gestionClient/rdv",
        name:"Gestion RDV Client",
        element:<Home/>
    }
]
export default clientManagementRoutes