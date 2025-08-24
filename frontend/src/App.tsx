import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import TutorsList from './pages/tutors/TutorsList';
import TutorDetail from './pages/tutors/TutorDetal';
import ListTuTorBooking from './pages/ListTutorBooking';
import ListStudentBooking from './pages/ListStudentBooking';
import AdminPage from './pages/admin/AdminPage';
import CreateTutor from './pages/tutors/createTutor';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import TutorProfile from './pages/TutorProfile';
import Payment from './pages/Payment';
import RoleRoute from './RoleRoute';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/tutors" element={<TutorsList />} />
      <Route
        path="/tutors/create"
        element={<RoleRoute element={<CreateTutor />} allowedRoles={["tutor"]} />}
      />
      <Route path="/tutors/:idTutor" element={<TutorDetail />} />

      <Route
        path="/booking/courses"
        element={<RoleRoute element={<ListTuTorBooking />} allowedRoles={["student"]} />}
      />

      <Route
        path="/student"
        element={<RoleRoute element={<ListStudentBooking />} allowedRoles={["tutor"]} />}
      />
      <Route
        path="/booking/student"
        element={<RoleRoute element={<ListStudentBooking />} allowedRoles={["tutor"]} />}
      />

      <Route
        path="/admin/:section"
        element={<RoleRoute element={<AdminPage />} allowedRoles={["admin"]} />}
      />

      <Route
        path="/user/me"
        element={<RoleRoute element={<UserProfile />} allowedRoles={["student","tutor"]} />}
      />
      <Route
        path="/tutor/me"
        element={<RoleRoute element={<TutorProfile />} allowedRoles={["tutor"]} />}
      />

      <Route
        path="/payment/:idTutor"
        element={<RoleRoute element={<Payment />} allowedRoles={["student"]} />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>


    </BrowserRouter>
  )
}

export default App
