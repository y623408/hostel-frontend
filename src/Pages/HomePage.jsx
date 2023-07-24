import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Routes, Route, useNavigate,useLocation,Link } from "react-router-dom";
import StudentInfo from "../Components/StudentInfo";
import Dashboard from "../Components/Dashboard";

import { Carousel } from "react-material-ui-carousel";
import img1 from "../assets/Image1.jpg";
import img2 from "../assets/Image2.jpeg";
import img3 from "../assets/Image3.jpg";
import { UserAuth } from "../Context/UserContext";
import BackgroundImage from "./BackgroundImage";


const HomePage = () => {
  const navigate = useNavigate();
  const {state} =useContext(UserAuth);
  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  return state.isLogin ? (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography marginRight="auto">HOME</Typography>
          <Box>
            <Typography>
              <Button
                variant="outline"
                onClick={() => navigate("/home/student")}
              >
                Student-Information
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/home/dashboard")}
              >
                Dashboard
              </Button>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
            
      {isHomePage && <BackgroundImage />}

      <Box sx={{ my: 9 }}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student" element={<StudentInfo />} />
        </Routes>
      </Box>
    </div>
  ):(
    <div>
      You aren't Logged In
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-30">
        <Link to="/" className="text-white">
          Login first 
        </Link>
      </button>
    </div>
  );
};

export default HomePage;
