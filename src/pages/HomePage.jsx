import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/general.css';
import '../styles/HomePage.css';

const HomePage = () => {
    return (
        <div className="body home-page">
            <Header />
            <main></main>
            <Footer />
        </div>
    );
};

export default HomePage;