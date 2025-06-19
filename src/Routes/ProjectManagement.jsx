import ProjectDetailPage from "../Pages/Auth/Dashbord/Pages/ProjectsManagement/ProjectDetailPage/ProjectDetailPage";
import CreateDevisPage from "../Pages/Auth/Dashbord/Pages/ProjectsManagement/ProjectDevis/DevisCreatePage/CreateDevisPage";
import ProjectsPage from "../Pages/Auth/Dashbord/Pages/ProjectsManagement/ProjectsTable/ProjectsPage";
import ProjectPhasesPage from "../Pages/Auth/Dashbord/Pages/ProjectsManagement/ProjectPhasesPage/ProjectPhasesPage.jsx";



const ProjectManagement= [
    {
        path:"/gestionProject/projets",
        name:"Gestion Projet",
        element:<ProjectsPage/>
    },
    {
        path:"/gestionProject/devis",

        element:<CreateDevisPage />
    },
    {
        path:"/gestionProject/project/:id",

        element:<ProjectDetailPage />
    },

    {
        path:"/gestionProject/projectPhases",
        name:"Phases Management",
        element:<ProjectPhasesPage />
    },

]
export default ProjectManagement