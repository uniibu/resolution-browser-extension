import React from "react";
import {Box, Divider, Typography} from "@mui/material";

const styles = {
  main: {
    padding: 2,
    marginTop: "-16px",
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
    width: "400px",
  },
  contentContainer: {
    display: "flex",
    marginBottom: "8px",
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "8px",
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  logo: {
    width: "50px",
    height: "50px",
  },
  title1: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  title2: {
    fontSize: "13px",
    color: "#939799",
  },
};

interface Props {
  title?: string;
  subTitle?: string;
  iconPath?: string;
}

const Header: React.FC<Props> = ({
  title = "Your Portal to Decentralized Web",
  subTitle = "This extension opens websites on the blockchain",
  iconPath = "icon/browser.svg",
}) => (
  <Box sx={styles.main}>
    <Box sx={styles.contentContainer}>
      <Box sx={styles.logoContainer}>
        <Box
          component="img"
          sx={styles.logo}
          src={iconPath}
          alt="Unstoppable domains logo"
        />
      </Box>
      <Box sx={styles.descriptionContainer}>
        <Box fontWeight="fontWeightBold">
          <Typography noWrap variant="subtitle1" sx={styles.title1}>
            {title}
          </Typography>
        </Box>
        <Typography noWrap variant="subtitle2" sx={styles.title2}>
          {subTitle}
        </Typography>
      </Box>
    </Box>
    <Divider />
  </Box>
);

export default Header;
