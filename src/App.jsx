import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./Routes/routes";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import { AuthProvider } from "./Contexts/AuthContext";

function App() {
  
  
  const routing = useRoutes(
    routes.map((route) => {
     
      if (route.protected) {
        return {
          ...route,
          element: (
            <ProtectedRoutes roles={route.roles} >
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
