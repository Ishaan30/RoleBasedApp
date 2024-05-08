import { styled } from "@mui/material/styles";
import { Grid, Typography } from '@mui/material';

export const CustomGrid = styled(Grid)({
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "hidden",
  });
  
  export const LogotypeContainer = styled("div")(({ theme }) => ({
    backgroundColor: "#631012",
    width: "60%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));
  
  export const LogotypeImage = styled("div")({
    width: 165,
    marginBottom: (theme) => theme.spacing(4),
  });
  
  export const LogotypeText = styled(Typography)(({ theme }) => ({
    color: "black",
    fontWeight: 500,
    fontSize: 64,
    [theme.breakpoints.down("md")]: {
      fontSize: 32,
    },
  }));
  
  export const FormContainer = styled("div")(({ theme }) => ({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    paddingTop: "50px",
  }));
  
  export const Form = styled("div")({
    width: 320,
  });
  
  export const TabClass = styled("div")({
    fontWeight: 400,
    fontSize: 18,
  });
  
  export const Copyright = styled("div")({
    fontWeight: 400,
    fontSize: 18,
  });
  
  export const ErrorMessage = styled("div")(({ theme }) => ({
    textAlign: "center",
    paddingTop: "20px",
    fontSize: "14px",
    fontWeight: "600",
  }));
  
  export const StyledTextFieldUnderline = styled('div')(({ theme }) => ({
    '&:before': {
      borderBottomColor: theme.palette.primary.light,
    },
    '&:after': {
      borderBottomColor: theme.palette.primary.main,
    },
    '&:hover:before': {
      borderBottomColor: `${theme.palette.primary.light} !important`,
    },
  }));
  
  export const StyledTextField = styled('div')(({ theme }) => ({
    borderBottomColor: theme.palette.background.light,
  }));
  
  
  export const CreatingButtonContainer = styled("div")({
    marginTop: (theme) => theme.spacing(2.5),
    height: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  });
  
  export const CreateAccountButton = styled("div")({
    height: 46,
    textTransform: "none",
  });
  
  export const FormButtonsWrapper = styled('div')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }));
  
  export const ForgetButton = styled('div')(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 400,
  }));
  
  export const LoginLoader = styled('div')(({ theme }) => ({
    marginLeft: theme.spacing(4),
  }));