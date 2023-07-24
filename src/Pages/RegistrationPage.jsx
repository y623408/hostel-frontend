import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { UserAuth } from "../Context/UserContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { HiUserGroup } from "react-icons/hi";
import img1 from "../assets/Image2.jpeg";
import logo from "../assets/bitlogo.png";
import "./LoginPage.css";

const RegistrationPage = () => {
  const { UserRegister, state } = useContext(UserAuth);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    rollNo: "",
    password: "",
  });
  
  const changehandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const RegisterHandle = (e) => {
    UserRegister({ user });
  };
  

  useEffect(() => {
    if (state.isReg) {
      toast.success(state.isMessage);
      navigate("/");
    }
    if (state.isError) {
      toast.error(state.isMessage);
    }
  }, [state]);

  return (
    <div>
      <Box
        justifyContent="center"
        alignItems="center"
        display="flex"
        height="100vh"
        sx={{
          backgroundImage: `url(${img1})`,
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      >
        <div className="logo-heading-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <div className="navbar-content">
            <h1 className="navbar-heading">BIRLA INSTITUTE OF TECHNOLOGY</h1>
            <p className="navbar-subheading">Mesra, Ranchi (India) - 835215</p>
          </div>
        </div>
        <Box
          className="transparent-box"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "40%", // Set the width to occupy half of the screen
            height: "90%",
            marginTop: "150px",
            paddingTop: "15px",
            "@media (max-width: 600px)": {
              width: "90%", // Set the width to occupy 80% of the screen
              height: "70%", // Set the height to occupy 70% of the screen height
              marginTop: "240px",
              paddingTop :"10px",
            },
          }}
        >
          <h1 text="center">SIGN UP</h1>
          <HiUserGroup className="w-40 h-20" />
          <TextField
            sx={{ width: 300, paddingY: 2 }}
            placeholder="Enter FirstName"
            name="firstName"
            value={user.firstName}
            onChange={changehandler}
          />
          <TextField
            sx={{ width: 300, paddingY: 2 }}
            placeholder="Enter LastName"
            name="lastName"
            value={user.lastName}
            onChange={changehandler}
          />
          <TextField
            sx={{ width: 300, paddingY: 2 }}
            placeholder="Enter RollNo"
            name="rollNo"
            value={user.rollNo}
            onChange={changehandler}
          />
          <TextField
            sx={{ width: 300, paddingY: 1 }}
            placeholder="Enter the Password"
            name="password"
            value={user.password}
            onChange={changehandler}
          />
          <Button
            variant="outline"
            style={{
              backgroundImage: "linear-gradient(to right,red,white)",
              margin: 5,
              padding: 7,
            }}
            onClick={RegisterHandle}
          >
            Register
          </Button>
          <Button
            style={{
              backgroundImage: "linear-gradient(to right,red,white)",
            }}
            variant="outline"
            onClick={() => navigate("/")}
          >
            Back to Home Page
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default RegistrationPage;
