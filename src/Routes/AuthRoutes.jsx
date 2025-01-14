import LoginPage from "../Pages/Auth/LoginPage";

const authRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
    protected: false,
  },
];
export default authRoutes;

