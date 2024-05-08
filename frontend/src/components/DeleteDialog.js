import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton} from '@mui/material';
import Grow from '@mui/material/Grow';
import DialogContentText from "@mui/material/DialogContentText";
import API from '../utils/api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const FormDialogDeleteUser = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
      setOpen(true);
  }
  const handleClose = () => {
      setOpen(false);
  }
  
  const handleSubmit = (e) => {
      const onSuccess = (msg) => {
          props.refresh()
          setOpen(false);
      }
      e.preventDefault();
      const role = JSON.parse(localStorage.getItem('authpegUser')).role
      if(role=='admin' && props.for =='users'){
        API.admin().delete(props.itemid).then(res => {
          console.log(res.data.message);
          onSuccess(res.data.message);
        }).catch(err => {
          console.log(err);
        });
      }
      else if(role=='superadmin'){
        API.user().delete(props.itemid).then(res => {
          console.log(res.data.message);
          onSuccess(res.data.message);
        }).catch(err => {
          console.log(err);
        });
      }
      else{
          API.user().delete(props.itemid).then(res => {
              console.log(res.data);
              onSuccess(res.data.message);
            }).catch(err => {
                console.log(err);
            });    
        }
  }

  return (
    <div>
      <IconButton style={{ color: 'red' }} onClick={handleOpen}>
          Delete
      </IconButton>
      <Dialog  
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
            <DialogTitle id="form-dialog-title" style={{padding: "30px 30px 0px 30px"}}>Delete User</DialogTitle>
            <div>

            <DialogContent style={{padding: "30px 30px 10px 30px"}}>
                  <DialogContentText>
                      Are you sure want to delete this record?
                  </DialogContentText>
            </DialogContent>

            <DialogActions style={{padding: 30}}>
                <Button variant="contained" onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} color="secondary">
                    Delete
                </Button>
            </DialogActions>
            </div>
      </Dialog>
    </div>
  );
}

export default FormDialogDeleteUser;