import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./Routes/routes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import { AuthProvider } from "./Contexts/AuthContext";

function App() {
  // Create routes with protection for authenticated routes
  const routing = useRoutes(
    routes.map((route) => {
      // If the route is protected, wrap it with ProtectedRoutes
      if (route.protected) {
        return {
          ...route,
          element: (
            <ProtectedRoutes roles={route.roles}>
              {route.element}
            </ProtectedRoutes>
          )
        };
      }
      return route;
    })
  );

  return <AuthProvider>{routing}</AuthProvider>;
}

export default App;
