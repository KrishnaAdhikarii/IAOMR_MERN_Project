// src/pages/ComingSoon.jsx
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ScientificPage = () => {
    return (
        <>
            <Navbar />

            <div style={{
                minHeight: "80vh",
                display: "flex",
                flexDirection:'column',
                justifyContent: "center",
                alignItems: "center", fontFamily:'Kumbh Sans, sans serrif'}}>
            <h1 style={{fontFamily:'Kumbh Sans, sans serrif'}}>Scientific</h1>
            <br />
            <h2 style={{ fontFamily: 'Kumbh Sans, sans serrif' }}>Content Will Be Updated Soon
            </h2>
            <p style={{fontFamily:'Kumbh Sans, sans serrif'}}>We are working on this page and will update the content shortly. Thank you for your patience.</p>
        </div >

            <Footer />
        </>
    );
};

const styles = {
    container: {
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    text: {
        fontSize: "2rem",
        color: "#000000",
    },
};

export default ScientificPage;