import React from "react";
import { Route, Routes } from "react-router-dom";
import Authentication from "./pages/Authentication";
import Dasboard from "./pages/Dasboard";
import TaskList from "./pages/TaskList";
import ProtectRoute from "./components/ProtectRoute";

const App = () => {
  return (
    <ProtectRoute>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/dashboard" element={<Dasboard />} />
        <Route path="/task-list" element={<TaskList />} />
      </Routes>
    </ProtectRoute>
  );
};

export default App;
