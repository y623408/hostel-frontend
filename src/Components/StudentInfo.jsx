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
  Paper,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { UserAuth } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentInfo = () => {
  const { state, get_userList, get_userIssue } = useContext(UserAuth);

  const navigate = useNavigate();

  useEffect(() => {
    get_userList();
  }, [get_userList]);

  useEffect(() => {
    get_userIssue();
  }, [get_userIssue]);
  
  const logout =async(req,res) => {
    localStorage.removeItem("token");
    state.isLogin =false;
    navigate("/");
    toast.success("logged out successfully");
  }

  return (
    <section>
      <Grid>
        <Box justifyContent="center" alignItems="center" display="flex">
          <Card sx={{
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
          }, }}>
            <h4 sx={{ text: "center", paddingY: 0.5 }}>Student-Info:</h4>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
              <Typography>Name: {state.studentInfo.student_name}</Typography>
              <Typography>Roll No.: {state.studentInfo.rollNo}</Typography>
              <Typography>Year: {state.studentInfo.student_year}</Typography>
              <Typography>
                Room No.: {state.studentInfo.student_room}
              </Typography>
              <Typography>Email: {state.studentInfo.student_email}</Typography>
              <Button
                variant="outline"
                style={{
                  backgroundImage:
                    "linear-gradient(to right,darkblue,lightblue)",
                }}
                onClick={logout}
              >
                Sign Out
              </Button>
            </Box>
            {/* )} */}
          </Card>
        </Box>
      </Grid>

      <Grid
        item
        xs={6}
        sm={8}
        md={5}
        component={Paper}
        elevation={12}
        square
        sx={{ margin: 4 }}
      >
        <React.Fragment>
          <Typography>Recent Complaints</Typography>
          <TableContainer sx={{ maxHeight: "85vh" }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Token ID</TableCell>
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
                {state.issueInfo?.map((issue) => (
                  <TableRow key={issue.token}>
                    <TableCell>{issue.token}</TableCell>
                    <TableCell>{issue.department}</TableCell>
                    <TableCell>{issue.detail}</TableCell>
                    <TableCell>{issue.issueDate}</TableCell>
                    <TableCell>{issue.preferredDate}</TableCell>
                    <TableCell>{issue.preferredTimeFrom}</TableCell>
                    <TableCell>{issue.preferredTimeTo}</TableCell>
                    <TableCell>{issue.issueResolved}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      </Grid>
    </section>
  );
};

export default StudentInfo;
