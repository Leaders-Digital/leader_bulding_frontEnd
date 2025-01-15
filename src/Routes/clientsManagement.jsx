import Home from "../Pages/Auth/Dashbord/Home";

const clientManagementRoutes=[

    {
        path:"/gestionClient/prospect",
        name:"Gestion Prospect",
        element:<Home/>
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