import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";

import "../styles/general.css";

const Profile = () => {
  const { userId } = useParams();
  return (
    <div className="main-template">
      <div className="main-template-content">
        <Header />
        <main className="main-container"></main>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
