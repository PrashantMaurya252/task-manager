import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Context from "./Context/context";
import ProtectedRoutes from "./Context/protectedroute";
import { Toaster } from "./components/ui/sonner";
import ProtectRoute from "./components/ProtectRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
      {/* <ProtectedRoutes> */}
      
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      

      {/* </ProtectedRoutes> */}
    </Context>
  </StrictMode>
);
