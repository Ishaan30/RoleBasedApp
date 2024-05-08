import React from "react";
import Layout from "../components/Layout";

 const Dashboard = () => {
    const name = JSON.parse(localStorage.getItem('authpegUser')).name
    return (
        <Layout>
            <h1>Welcome {name}</h1>
        </Layout>
           
    )
 }

 export default Dashboard;