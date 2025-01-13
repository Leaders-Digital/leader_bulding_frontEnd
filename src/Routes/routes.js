import authRoutes from "./AuthRoutes";
import dashboardRoutes from "./DashboardRoutes";

const routes = [...authRoutes, ...dashboardRoutes];
export default routes;
