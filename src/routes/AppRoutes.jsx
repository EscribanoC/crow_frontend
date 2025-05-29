import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import HomePage from "../pages/HomePage";
import CreateCrow from "../pages/CreateCrow";
import ScrollToTop from "../components/ScrollToTop";
import DiscoverPage from "../pages/DiscoverPage";
import Crow from "../pages/Crow";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />{" "}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />ç
        <Route path="/create-crow" element={<CreateCrow />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/crow/:crowId" element={<Crow />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route
          path="/admin/*"
          element={
            <PrivateRoute requiredRole="ROLE_ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
