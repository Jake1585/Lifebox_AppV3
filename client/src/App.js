import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import Register from './pages/Register';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast'
import Home from "./pages/Home";
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import AddDoctor from './pages/AddDoctor';
import Userslist from './pages/AdminInfo/Userslist';
import Doctorslist from './pages/AdminInfo/Doctorslist';
import BookAppointment from './pages/appointment-scheduling';
import Appointments from './pages/appointments';
import Profile from './pages/ProfileView';

function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div class="spinner-border" role="status">
          </div>
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/add-doctor" element={<ProtectedRoute><AddDoctor /></ProtectedRoute>} />
        <Route path="/AdminInfo/Userslist" element={<ProtectedRoute><Userslist /></ProtectedRoute>} />
        <Route path="/AdminInfo/Doctorslist" element={<ProtectedRoute><Doctorslist /></ProtectedRoute>} />
        <Route path="/appointment-scheduling/:doctorId" element={<ProtectedRoute><BookAppointment /></ProtectedRoute>} />
        <Route path="/appointments/" element={<ProtectedRoute><Appointments/></ProtectedRoute>} />
        <Route path="/ProfileView/" element={<ProtectedRoute><Profile/></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;