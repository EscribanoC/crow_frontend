import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "../pages/WelcomePage";
import HomePage from "../pages/HomePage";
import CreateCrow from "../pages/CreateCrow";
import ScrollToTop from "../components/ScrollToTop";

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />{" "}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />ç
        <Route path="/create-crow" element={<CreateCrow />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
