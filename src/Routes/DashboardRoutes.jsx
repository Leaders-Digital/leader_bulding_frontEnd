import { Icon } from "@iconify/react/dist/iconify.js";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Auth/Dashbord/Home";
import clientManagementRoutes from "./clientsManagement";

const dashboardRoutes = [
  {   
    path: "/",
    element: <MainLayout />,
    //protected:true,
    children: [
      {
        path: "users",
        name:"Gestion Utilisateurs",
        element: <Home />,
        protected: true,
        icon: <Icon icon="hugeicons:edit-user-02" width="24" height="24"  />,
        
      },
      {
        path: "archive",
        name:"Archivé",
        element: <Home />,
        protected: true,
        icon: <Icon icon="hugeicons:archive-01" width="24" height="24"   />,
        
      },
      {
        path: "Dashboard",
        name:"Dashboard",
        element: <Home />,
        protected: true,
        icon: <Icon icon="hugeicons:dashboard-square-02" width="24" height="24"   />,
        
      },
      {
        path: "gestionClient",
        name:"Gestion Client et RDV",
        element: <Home />,
        protected: true,
        icon: <Icon icon="hugeicons:user-square" width="24" height="24"  style="color: #000" />,
        children:[{
          path:"prospectManagement",
          name:"Gestion Prospect",
          element:<Home/>
      }]
        
      },

    ],
  },
];

export default dashboardRoutes;
