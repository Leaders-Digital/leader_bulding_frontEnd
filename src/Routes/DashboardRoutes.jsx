import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Auth/Dashbord/Home";

const dashboardRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
        protected: true,
      },
    ],
  },
];

export default dashboardRoutes;
