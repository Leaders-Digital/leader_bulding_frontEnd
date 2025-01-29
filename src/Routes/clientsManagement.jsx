import Home from "../Pages/Auth/Dashbord/Home";
import ClientPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/ClientManagementPage/ClientPage";
import ProspectDeatilsPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/ProspectDeatilsPage/ProspectDeatilsPage";
import ProspectPage from "../Pages/Auth/Dashbord/Pages/ClientManagement/ProspectManagementPage/ProspectPage";

const clientManagementRoutes=[

    {
        path:"/gestionClient/prospect",
        name:"Gestion Prospect",
        element:<ProspectPage/>
    },
      {
    path:"/gestionClient/prospect/:id",
     element:<ProspectDeatilsPage/>

}
    ,
    {
        path:"/gestionClient/client",
        name:"Gestion Client",
        element:<ClientPage/>
    },{
        path:"/gestionClient/rdv",
        name:"Gestion RDV Client",
        element:<Home/>
    }
]
export default clientManagementRoutes