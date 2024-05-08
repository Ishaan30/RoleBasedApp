import React, { useEffect,useContext } from "react";
import Layout from "../components/Layout";
import { DataGrid } from '@mui/x-data-grid';
import {
    Box, Paper, Button
} from '@mui/material';
import FormDialogDeleteTask from "../components/DeleteDialog";
import FormDialogEditUser from "../components/EditDialog";
import FormDialogAddTask from "../components/AddTaskDialog";
import API from "../utils/api";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ViewAllTasks = () => {
    const [tasksData, setTasksData] = React.useState([]);
    const [getData, setGetData] = React.useState(false);
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();
    const userId = localStorage.getItem('taskUserId');

    useEffect(() => {
        API.admin().fetchTasks(userId)
            .then((response) => {
                console.log(response.data);
                setTasksData(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }, [getData,userId]);
     
    const filteredRows = tasksData.map(row => ({
        id: row._id,
        description: row.description,
        completed: row.completed,
        owner: row.owner,
    }));

    const refresh = async () => {
        setGetData(!getData);
    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        //Temporary trick to shift first column to right
        {
            field: 'description',
            headerName: 'Description',
            flex: 1,
        },
        {
            field: 'completed',
            headerName: 'Completed Status',
            flex: 1,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) =>
            (<div style={{ "width": "20rem", "display": "flex" }}>
                <FormDialogEditUser
                    description={params.row.description}
                    completed={params.row.completed}
                    taskid={params.row.id}
                    refresh={refresh}
                />
                <FormDialogDeleteTask
                    itemid={params.row.id}
                    // delete={props.delete}
                    refresh={refresh}
                    for="tasks"
                />
            </div>
            )
        },
    ];
    const logoutHandler = () => {
        logout(navigate);
    }


    return (
        <Layout>
            <Box sx={{display:'flex',justifyContent:'space-around',marginBottom:'2rem'}}>
                <FormDialogAddTask component={Paper}
                    // create={props.create}
                    refresh={refresh}
                    for='other'
                />
                <Button variant="outlined" onClick={logoutHandler}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#1976d2',
                            color: '#fff',
                        },
                    }}>
                    Logout
                </Button>
            </Box>
            <Box sx={{ overflowX: "hidden" }}>
                <DataGrid
                    sx={{
                        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                            outline: "none !important",
                        },
                        "& .MuiDataGrid-columnHeader:focus-within, & .MuiDataGrid-columnHeader:focus":
                        {
                            outline: "none !important",
                        },
                        '& .MuiDataGrid-virtualScroller': {
                            overflowX: 'hidden',
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: 'rgba(242,242,242)',
                            fontWeight: 'bold',
                        }
                    }}
                    autoHeight={true}
                    rows={filteredRows}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 8,
                            },
                        },
                    }}
                    pageSizeOptions={[8, 10, 20]}
                    disableRowSelectionOnClick
                    rowHeight={61}
                />
            </Box>
        </Layout>

    )
}

export default ViewAllTasks;