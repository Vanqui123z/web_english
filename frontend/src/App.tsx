import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import TutorsList from './pages/TutorsList';
import TutorDetail from './pages/TutorDetal';
import ListTuTorBooking from './pages/ListTutorBooking';
import ListStudentBooking from './pages/ListStudentBooking';
import Checkout from './pages/checkout';
import AdminPage from './pages/admin/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login'    element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>

        <Route path='/tutors' element={<TutorsList/>}/>
        <Route path='/tutors/:idTutor' element={<TutorDetail/>}/>

        <Route path='/booking' element={<TutorDetail/>}/>
        <Route path='/booking/tutor' element={<ListStudentBooking/>}/>

        <Route path='/student' element={<ListStudentBooking/>}/>
        <Route path='/booking/student' element={<ListTuTorBooking/>}/>

     
        <Route path='/admin/:section' element={<AdminPage/>}/>

         <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
