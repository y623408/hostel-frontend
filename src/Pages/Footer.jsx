
import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box bgcolor="black" color="white" minHeight={40} padding={5}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography variant="h6" component="h2" textAlign="center" textTransform="uppercase">
              Hostel Utility
            </Typography>
            <Typography variant="body2" textAlign="center" color="purple">
              BIT MESRA
            </Typography>
            <Typography variant="body2" textAlign="center" color="purple">
              All rights received
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="subtitle1" component="h3" textAlign="center" textTransform="uppercase">
              Social Media
            </Typography>
            <Button variant="text" color="secondary">
              <a
                target="_blank"
                href="https://www.facebook.com/BITMesraRanchi"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Facebook />
                Facebook
              </a>
            </Button>
            <Button variant="text" color="secondary">
              <a
                target="_blank"
                href="https://twitter.com/BITMesra_Ranchi"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Twitter />
                Twitter
              </a>
            </Button>
            <Button variant="text" color="secondary">
              <a
                target="_blank"
                href="https://www.instagram.com/bit.mediacell/"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Instagram />
                Instagram
              </a>
            </Button>
            <Button variant="text" color="secondary">
              <a
                target="_blank"
                href="https://www.instagram.com/bit.mediacell/"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <YouTube />
                Youtube
              </a>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;



