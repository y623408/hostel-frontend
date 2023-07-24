import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { UserAuth } from "../Context/UserContext";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const { v4: uuidv4 } = require("uuid");

const Dashboard = () => {
  const { state, user_insertIssue } = useContext(UserAuth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    rollNo: "",
    department: "",
    detail: "",
    issueDate: "",
    preferredDate: "",
    preferredTimeFrom: "", // Set initial value to an empty string
    preferredTimeTo: "",
    issueResolved: "",
    token: "",
    //expireAt: "",
  });

  const changehandler = (e) => {
    // Check if the input type is date or time and convert the value to string accordingly
    const value =
      e.target.type === "date" || e.target.type === "time"
        ? e.target.value.toString()
        : e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const ComplaintHandler = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      toast.info("Complaint registration is already in progress.");
      return;
    }

    setIsSubmitting(true);

    const updatedUser = {
      ...user,
      issueDate: new Date().toLocaleDateString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      rollNo: state.studentInfo.rollNo,
      issueResolved: "No",
      //expireAt: new Date(),
      token: uuidv4(),
    };

    try {
      await user_insertIssue({ updatedUser });
      const mail = state.studentInfo.student_email;
      const response = await axios.post(
        "https://hostel-backend-agn2.vercel.app/user/sendemail",
        JSON.stringify({
          to: mail,
          subject: `${updatedUser.token} - Complaint Registered`,
          text: " no text in text",
          html: `<div style="border : 1px solid white;padding:"10px">
              Complaint ID : ${updatedUser.token} <br />
              <p>Your complaint has been registered for ${updatedUser.department} department.</p>
              <p>Complaint description : ${updatedUser.detail} </p>
              <p><hr/>Registered Successfully !</p>
            </div>`,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setUser({
        department: "",
        detail: "",
        preferredDate: "",
        preferredTimeFrom: "",
        preferredTimeTo: "",
      });

      toast.success("Complaint registered successfully!", {
        autoClose: 3000, // Close the toast after 3 seconds (optional)
      });
      toast.success("Email delivered successfully", {
        autoClose: 3000, // Close the toast after 3 seconds (optional)
      });

      navigate("/home");
    } catch (error) {
      console.log(error.response);

      if (error.response && error.response.status === 409) {
        toast.error("Complaint already registered.");
      } else if (error.response && error.response.status === 401) {
        toast.error("Unauthorized request. Please check your credentials.");
      } else {
        toast.error("Failed to register complaint. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return state.isInfo ? (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 0.8,
          marginRight: 0,
          paddingTop: 2,
        }}
        component={Paper}
        elevation={12}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <ContentPasteIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register Complaint
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3, margin: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="department">Department</InputLabel>
                <Select
                  required
                  labelId="department"
                  id="department"
                  label="Department"
                  name="department"
                  value={user.department}
                  onChange={changehandler}
                >
                  <MenuItem value={"Electricity"} default>
                    Electricity
                  </MenuItem>
                  <MenuItem value={"Room Service"}>Room Service</MenuItem>
                  <MenuItem value={"Water"}>Water</MenuItem>
                  <MenuItem value={"Mess"}>Mess</MenuItem>
                  <MenuItem value={"Clean"}>Clean</MenuItem>
                  <MenuItem value={"Estate"}>Estate</MenuItem>
                  <MenuItem value={"Network"}>Network</MenuItem>
                  <MenuItem value={"Miscellaneous"}>Miscellaneous</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="detail"
                label="Enter Detail"
                name="detail"
                value={user.detail}
                onChange={changehandler}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Select preferred date:</InputLabel>
              <TextField
                required
                fullWidth
                id="preferredDate"
                name="preferredDate"
                type="date"
                value={user.preferredDate}
                onChange={changehandler}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Select preferred time slot:</InputLabel>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel>From:</InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="preferredTimeFrom"
                    name="preferredTimeFrom"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={user.preferredTimeFrom}
                    onChange={changehandler}
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel>To:</InputLabel>
                  <TextField
                    required
                    fullWidth
                    id="preferredTimeTo"
                    name="preferredTimeTo"
                    type="time"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={user.preferredTimeTo}
                    onChange={changehandler}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={ComplaintHandler}
          >
            Register
          </Button>
        </Box>
      </Box>
    </>
  ) : (
    <div>
      Go to student-info first
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-30">
        <Link to="/home/student" className="text-white">
          Student Info
        </Link>
      </button>
    </div>
  );
};

export default Dashboard;
