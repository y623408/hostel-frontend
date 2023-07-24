import {
  Box,
  Button,
  TextField,
} from "@mui/material";
import { HiUserGroup } from "react-icons/hi";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserAuth } from "../Context/UserContext";
import img1 from "../assets/Image2.jpeg";
import logo from "../assets/bitlogo.png";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const { state, UserLogin } = useContext(UserAuth);
  const [user, setUser] = useState({ rollNo: "", password: "" });
  const changehandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    UserLogin({ user });
  };

  useEffect(() => {
    if (state.isLogin) {
      toast.success(state.isMessage);
      navigate("/home");
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
          <h4 text="center">SIGN IN </h4>
          <HiUserGroup className="w-40 h-20" />

          <TextField
            sx={{ width: 300, paddingY: 2, color: "black 900" }}
            placeholder="Enter RollNo"
            name="rollNo"
            value={user.rollNo}
            onChange={changehandler}
          />
          <TextField
            sx={{ width: 300, paddingY: 1, color: "black 900" }}
            placeholder="Enter the Password"
            name="password"
            value={user.password}
            onChange={changehandler}
          />
          <Button
            variant="outline"
            style={{
              backgroundImage: "linear-gradient(to right,red,white)",
              margin: 4,
            }}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <p sx={{ paddingY: 2 }}>create new account?</p>
          <Box display="flex" flexDirection={"row"}>
            <Button
              variant="outline"
              style={{
                backgroundImage: "linear-gradient(to right,red,white)",
                marginRight: "20px",
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
            <Button
              variant="outline"
              style={{
                backgroundImage: "linear-gradient(to right,red,white)",
                marginLeft: "20px",
              }}
              onClick={() => navigate("/admin")}
            >
              Admin Login
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default LoginPage;
