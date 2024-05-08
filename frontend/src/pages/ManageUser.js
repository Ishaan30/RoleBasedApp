import React, { useEffect,useContext } from "react";
import Layout from "../components/Layout";
import { DataGrid } from '@mui/x-data-grid';
import {
    Box, Paper, Button
} from '@mui/material';
import FormDialogDeleteUser from "../components/DeleteDialog";
import FormDialogAddUser from "../components/AddUserDialog";
import API from "../utils/api";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ViewAllTasks = () => {
    const [tasksData, setTasksData] = React.useState([]);
    const [getData, setGetData] = React.useState(false);
    const {logout} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
       API.admin().fetchAll()
            .then((response) => {
                console.log(response.data);
                setTasksData(response.data);
            }).catch((error) => {
                console.log(error);
            })
    }, [getData]);

    const filteredRows = tasksData.map(row => ({
        id: row._id,
        name: row.name,
        email: row.email,
    }));

    const refresh = async () => {
        setGetData(!getData);
    }
    const tasksHandler = (id) => {
       localStorage.removeItem('taskUserId');
       localStorage.setItem('taskUserId',id);
       navigate('/usertasks');
    }
    const adminHandler = (id) => {
        API.superadmin().assignAdmin(id).then((response)=>{
            console.log(response);
            refresh();
        }).catch((error)=>{
            console.log(error);
        });
    }
    const role = JSON.parse(localStorage.getItem('authpegUser')).role;
    const columns = [
        // { field: 'id', headerName: 'ID', width: 90 },
        //Temporary trick to shift first column to right
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) =>
            (<div style={{ "width": "20rem", "display": "flex" }}>
                {role=='superadmin'&&
                    <Button variant="outlined" onClick={()=>adminHandler(params.row.id)}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#1976d2',
                            color: '#fff',
                        },
                    }}>
                    Assign Admin
                </Button>
                }
                <Button variant="outlined" onClick={()=>tasksHandler(params.row.id)}
                    sx={{
                        '&:hover': {
                            backgroundColor: '#1976d2',
                            color: '#fff',
                        },
                    }}>
                    View Tasks
                </Button>
                <FormDialogDeleteUser
                    itemid={params.row.id}
                    // delete={props.delete}
                    refresh={refresh}
                    for='users'
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
                <FormDialogAddUser component={Paper}
                    for="Admin"
                    refresh={refresh}
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