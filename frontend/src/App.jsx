import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Dasboard from "./pages/Dasboard";
import TaskList from "./pages/TaskList";
import ProtectRoute from "./components/ProtectRoute";
import Headers from "./components/Headers";

const App = () => {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <ProtectRoute>
      {pathname !== '/auth' && <Headers/>}
      <Routes>
        <Route path="/auth" element={<Authentication />} />
        <Route path="/dashboard" element={<Dasboard />} />
        <Route path="/task-list" element={<TaskList />} />
      </Routes>
    </ProtectRoute>
  );
};

export default App;
