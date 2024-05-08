import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import ViewAllTasks from './pages/ViewAllTasks';
import ManageUser from './pages/ManageUser';
import ManageAdmin from './pages/ManageAdmin';
import UsersTasks from './pages/UsersTasks';

function App() {
  return (
    <Router>
        <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route exact path="/yourTasks" element={<PrivateRoute><ViewAllTasks/></PrivateRoute> } />
        <Route exact path="/userTasks" element={<PrivateRoute><UsersTasks/></PrivateRoute> } />
        <Route exact path="/manageUser" element={<PrivateRoute><ManageUser/></PrivateRoute> } />
        <Route exact path="/manageAdmin" element={<PrivateRoute><ManageAdmin/></PrivateRoute> } />
        <Route exact path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute> } />
        </Routes>
    </Router>
  );
}

export default App;