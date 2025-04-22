import ProjectDetailPage from "../Pages/Auth/Dashbord/Pages/ProjectsManagement/ProjectDetailPage/ProjectDetailPage";
import CreateDevisPage from "../Pages/Auth/Dashbord/Pages/ProjectsManagement/ProjectDevis/DevisCreatePage/CreateDevisPage";
import ProjectsPage from "../Pages/Auth/Dashbord/Pages/ProjectsManagement/ProjectsTable/ProjectsPage";



const ProjectManagement= [
    {
        path:"/gestionProject/projets",
        name:"Gestion Projet",
        element:<ProjectsPage/>
    },
    {
        path:"/gestionProject/devis",
        name:"Gestion devis",
        element:<CreateDevisPage />
    },
    {
        path:"/gestionProject/project/:id",

        element:<ProjectDetailPage />
    }
]
export default ProjectManagement