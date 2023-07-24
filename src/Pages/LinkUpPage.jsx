import React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../assets/Image1.jpg";
import img2 from "../assets/Image2.jpeg";
import img3 from "../assets/Image3.jpg";

const headingOptions = {
  position: "absolute",
  left: "30%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  textTransform: "uppercase",
  padding: 2,
  fontSize: "2.5rem",
  color: "white",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  sx: {
    "@media (max-width: 600px)": {
      fontSize: "0.7rem",
      top: "13%",
      left: "50%",
      transform: "translate(-50%, -40%)",
    },
  },
};

const LinkUpPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <AppBar position="fixed" sx={{"@media (max-width: 600px)": {
      width:"100%",
      height:"20vh",
      display:"flex",
      flexDirection:"row",
      paddingRight:"0",
    },}}>
        <Toolbar>
          <Typography marginRight="auto">
            <Button variant="outline" onClick={() => navigate("/home")}>
              Home
            </Button>
          </Typography>
          <Box>
            <Typography>
              <Button variant="outline" onClick={() => navigate("/admin")}>
                Sign In As Admin
              </Button>
              <Button variant="outline" onClick={() => navigate("/login")}>
                Sign In As student
              </Button>
              <Button variant="outline" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          "@media (max-width: 600px)": {
            marginTop: "145px",
            height: "25vh",
            width: "100%",
          },
        }}
      >
        <MyCarousel />
      </Box>
    </div>
  );
};

const MyCarousel = () => (
  <Carousel
    autoPlay
    infiniteLoop
    interval={1000}
    showStatus={false}
    showThumbs={false}
    showArrows={false}
    
  >
    <Box width="100%" height="100vh" position="relative" >
      <img src={img1} alt="Carousel Image 1" />
      <Typography {...headingOptions}>Welcome To BIT Mesra</Typography>
    </Box>

    <Box width="100%" height="100%" position="relative">
      <img src={img2} alt="Carousel Image 2" />
    </Box>

    <Box width="100%" height="100vh" position="relative">
      <img src={img3} alt="Carousel Image 3" />
      <Typography {...headingOptions}>Hostel Utility System</Typography>
    </Box>
  </Carousel>
);

export default LinkUpPage;
