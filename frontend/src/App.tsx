import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/'    element={<Home/>}/>
        <Route path='/login'    element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route path='/tutors' element={<TutorsList/>}/>
        <Route path='/tutors/create' element={<CreateTutor/>}/>
        <Route path='/tutors/:idTutor' element={<TutorDetail/>}/>

        <Route path='booking/courses' element={<ListTuTorBooking/>}/>

        <Route path='/student' element={<ListStudentBooking/>}/>
        <Route path='/booking/student' element={<ListStudentBooking/>}/>

     
        <Route path='/admin/:section' element={<AdminPage/>}/>
        <Route path='/user/me' element={<UserProfile/>}/>
        <Route path='/tutor/me' element={<TutorProfile/>}/>

         <Route path="/payment/:idTutor" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
