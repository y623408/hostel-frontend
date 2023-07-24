// BackgroundImage.js
import React from "react";
import img1 from "../assets/Image1.jpg";

const BackgroundImage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${img1})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        paddingTop: 64,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        textTransform: "uppercase",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "3rem", fontWeight: "bold", textDecoration: "underline" }}>Welcome To BIT MESRA</h1>
      <h3 style={{ fontSize: "2rem", fontWeight: "bold", fontStyle: "italic" }}>Hostel Utility Portal</h3>
    </div>
  );
};

export default BackgroundImage;