import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Grow from "@mui/material/Grow";
import API from "../utils/api";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
});

const initialFormState = {
    id: "",
    description: "",
    completed: "",
};

const FormDialogEditUser = props => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(initialFormState);
    const [errors, setErrors] = useState({});

    const handleClickOpen = () => {
        setErrors({});
        setUser({
            id: props.taskid,
            description: props.description,
            completed: props.completed,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = e => {
        const onSuccess = () => {
            props.refresh()
            setOpen(false);
        };
        e.preventDefault();
        const data = {
            description: user.description,
            completed: user.completed,
        }
        API.user().update(user.id, data).then(res => {
            console.log(res.data);
            onSuccess();
        }).catch(err => {
            console.log(err);
        });

    };
    const handleSelectChange = (event) => {
        setUser({ ...user, completed: event.target.value });
      };

    return (
        <div>
            <IconButton color="primary" onClick={handleClickOpen}>
                Edit
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
                    Edit Task
                </DialogTitle>

                <DialogContent style={{ padding: "30px 30px 10px 30px" }}>
                    <TextField
                        name="description"
                        label="Description"
                        value={user.description}
                        fullWidth
                        onChange={handleInputChange}
                        {...(errors.description && { error: true, helperText: errors.description })}
                    />

                    <br />
                    <br />
                    <InputLabel id="demo-simple-select-label">Completed</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={user.completed}
                        label="Completed"
                        onChange={handleSelectChange}
                    >
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                    </Select>
                </DialogContent>

                <DialogActions style={{ padding: 30 }}>
                    <Button variant="contained" onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleSubmit} color="secondary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default FormDialogEditUser;
