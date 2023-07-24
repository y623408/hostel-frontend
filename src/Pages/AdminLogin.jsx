import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { HiUserGroup } from "react-icons/hi";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserAuth } from "../Context/UserContext";
// import img1 from "../assets/Image2.jpeg";
import img1 from "../assets/adminimage.png";
import logo from "../assets/bitlogo.png";
import "./LoginPage.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { state, AdminLogin } = useContext(UserAuth);
  const [admin, setAdmin] = useState({ user_name: "", user_password: "" });
  const changehandler = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    AdminLogin({ admin });
  };
  useEffect(() => {
    if (state.isAdminLogin) {
      toast.success(state.isMessage);
      navigate("/adminHome");
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
            // width: "50%", // Set the width to occupy half of the screen
          }}
        >
          <h4 text="center">Admin SIGN IN </h4>
          <HiUserGroup className="w-40 h-20" />

          <TextField
            sx={{ width: 300, paddingY: 2, color: "black 900" }}
            placeholder="Enter Username"
            name="user_name"
            autoFocus
            value={admin.user_name}
            onChange={changehandler}
          />
          <TextField
            sx={{ width: 300, paddingY: 1, color: "black 900" }}
            placeholder="Enter Password"
            name="user_password"
            value={admin.user_password}
            onChange={changehandler}
          />
          <Button
            variant="outline"
            style={{
              backgroundImage: "linear-gradient(to right,red,white)",
              margin: 8,
            }}
            onClick={handleSubmit}
          >
            Login
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

export default AdminLogin;
