import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import Grow from "@mui/material/Grow";
import API from "../utils/api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const initialFormState = {
  name: "",
  email: "",
  password:"",
  role:'admin'
};

const FormDialogAddUser = props => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const handleClickOpen = () => {
    setErrors({});
    setUser(initialFormState);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    let formIsValid = true;

    if (!user.name || user.name.trim() === "") {
      formIsValid = false;
      tempErrors["name"] = "Cannot be empty";
    }

    if (!user.email || user.email.trim() === "") {
      formIsValid = false;
      tempErrors["email"] = "Cannot be empty";
    }
    if (!user.password || user.password.trim() === "") {
      formIsValid = false;
      tempErrors["password"] = "Cannot be empty";
    }

    let regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regexp.test(user.email)) {
      formIsValid = false;
      tempErrors["email"] = "Email is not valid";
    }

    setErrors(tempErrors);
    return formIsValid;
  };

  const handleSubmit = e => {
    const onSuccess = (msg) => {
      props.refresh()
      setOpen(false);
    };
    e.preventDefault();
    if(validate()){
        console.log('register',user.email,user.name,  user.password);
      API.auth().register(user).then(res => {
        console.log(res);
        onSuccess(res.data.message);
    }).catch(err => {
        console.log(err);
        });
    }
  };

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        Add Admin
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          style={{ padding: "30px 30px 0px 30px" }}
        >
          {props.for==="Admin" && "Add User"}
          {props.for==="Super Admin" && "Add User"}
        </DialogTitle>

        <DialogContent style={{ padding: "30px 30px 10px 30px" }}>
          <TextField
            autoFocus
            name="name"
            label="Name"
            value={user.name}
            fullWidth
            onChange={handleInputChange}
            {...(errors.name && { error: true, helperText: errors.name })}
          />

          <br />
          <br />

          <TextField
            name="email"
            label="User Email"
            value={user.email}
            fullWidth
            onChange={handleInputChange}
            {...(errors.email && { error: true, helperText: errors.email })}
          />
          <br />
          <br />

          <TextField
            name="password"
            label="Password"
            value={user.password}
            fullWidth
            onChange={handleInputChange}
            {...(errors.password && { error: true, helperText: errors.password })}
          />
        </DialogContent>

        <DialogActions style={{ padding: 30 }}>
          <Button variant="contained" onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="secondary">
            Add Admin
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FormDialogAddUser;
