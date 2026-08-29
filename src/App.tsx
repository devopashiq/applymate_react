import { Route, Routes } from "react-router";
import "./App.css";
import Login from "./pages/Login";
import PublicRoute from "./routes/PublicRoute";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path=""  element={<Login />} />
          <Route path="login"  element={<Login />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
