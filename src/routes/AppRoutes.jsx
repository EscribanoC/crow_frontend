import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import HomePage from "../pages/HomePage";
import CreateCrow from "../pages/CreateCrow";
import ScrollToTop from "../components/ScrollToTop";
import DiscoverPage from "../pages/DiscoverPage";
import Crow from "../pages/Crow";
import Profile from "../pages/Profile";

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
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
