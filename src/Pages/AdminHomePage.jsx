import React from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Checkbox,
} from "@mui/material";

import { useEffect, useState, useContext, useRef } from "react";
import { UserAuth } from "../Context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const AdminHomePage = () => {
  const { state, get_adminIssue } = useContext(UserAuth);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [token, setToken] = useState("");
  const [errMsg, setErrMsg] = useState("");
  var mail;

  const navigate = useNavigate();
  useEffect(() => {
    get_adminIssue();
  }, []);
  const errRef = useRef();

  const logout = async (req, res) => {
    state.isAdminLogin = false;
    navigate("/admin");
    toast.success("logged out successfully");
  };

  const handleChange = async (e, token) => {
    //e.preventDefault();

    // console.log("Check : ERROR");
    setToken(token);

    const { checked } = e.target;

    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [token]: checked,
    }));
    try {
      const responseUpd = await axios.post(
        "https://hostel-backend-agn2.vercel.app/user/updateissue",
        JSON.stringify({
          token: token,
          issueResolved: checked ? "Yes" : "No",
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Issue Updated successfully");

      const responseDep = await axios.post(
        "https://hostel-backend-agn2.vercel.app/user/getissue",
        JSON.stringify({ token: token }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const compDate = responseDep?.data?.issueDate;
      const depart = responseDep?.data?.department;
      const detail = responseDep?.data?.detail;
      const prefDate = responseDep?.data?.preferredDate;
      const timeFrom = responseDep?.data?.preferredTimeFrom;
      const timeTo = responseDep?.data?.preferredTimeTo;
      if (depart === "Mess") {
        mail = "anu23.coding@gmail.com";
      } else if (depart === "Water") {
        mail = "ananyapandey2322001@gmail.com";
      } else {
        mail = "ananyapandey2322001@gmail.com";
      }
      if (checked) {
        const response = await axios.post(
          "https://hostel-backend-agn2.vercel.app/user/sendemail",
          JSON.stringify({
            to: mail,
            subject: "Complaint Registered",
            text: " no text in text",
            html: `<div style="border : 1px solid white;padding:"10px">
                <p>Complaint ID : ${token} </p>
                <p>Complaint Date : ${compDate} </p>
                <p>Detail : ${detail} </p>
                <p>Preferred Date : ${prefDate} </p>
                <p>Preferred Time Slot : ${timeFrom} - ${timeTo} </p>
                <p><hr/>Reviewed by Admin</p>
              </div>`,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        toast.success("Email delivered successfully");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Update Failed");
      }
    }
  };

  return state.isAdminLogin ? (
    <Grid>
      <Card
        sx={{
          minWidth: 400,
          maxWidth: "90%", // Set the maximum width to 90% of the screen
          padding: "20px",
          margin: "30px auto", // Center the card horizontally and add vertical margin
          boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(8px)",
          // Media query for smaller screens (phones)
          "@media (max-width: 600px)": {
            minWidth: "80%", // Set the minimum width to 80% of the screen
          },
        }}
      >
        <React.Fragment>
          <Typography> Complaints for Today</Typography>
          <TableContainer sx={{ maxHeight: "85vh" }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Token ID</TableCell>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Detail</TableCell>
                  <TableCell>Complaint Date</TableCell>
                  <TableCell>Preferred Date</TableCell>
                  <TableCell>TimeSlot-From</TableCell>
                  <TableCell>TimeSlot-To</TableCell>
                  <TableCell align="right">Issue Resolved ?</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.issueAdmin?.map((i) => {
                  const dt = new Date().toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  });
                  if (i.issueDate === dt) {
                    return (
                      <TableRow key={i.token}>
                        <TableCell>{i.token}</TableCell>
                        <TableCell>{i.rollNo}</TableCell>
                        <TableCell>{i.department}</TableCell>
                        <TableCell>{i.detail}</TableCell>
                        <TableCell>{i.issueDate}</TableCell>
                        <TableCell>{i.preferredDate}</TableCell>
                        <TableCell>{i.preferredTimeFrom}</TableCell>
                        <TableCell>{i.preferredTimeTo}</TableCell>
                        <TableCell align="right">
                          {i.issueResolved === "Yes" ? (
                            <Checkbox
                              //checked={}
                              indeterminate
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          ) : (
                            <Checkbox
                              checked={checkboxStates[i.token] || false}
                              onChange={(e) => handleChange(e, i.token)}
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      </Card>
      <Box
        position="absolute"
        top="30px"
        right="70px"
        sx={{
          "@media (max-width: 600px)": {
            right: "40px",
          },
        }}
      >
        <Button
          variant="outline"
          style={{
            backgroundImage: "linear-gradient(to right,darkblue,lightblue)",
          }}
          onClick={logout}
        >
          Sign Out
        </Button>
      </Box>
    </Grid>
  ) : (
    <div>
      You aren't Logged In As Admin
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-30">
        <Link to="/admin" className="text-white">
          Login first As Admin
        </Link>
      </button>
    </div>
  );
};

export default AdminHomePage;
