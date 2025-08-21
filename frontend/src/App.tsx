import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import TutorsList from './pages/TutorsList'
import TutorDetail from './pages/TutorDetal'
import ListTuTorBooking from './pages/ListTutorBooking'
import ListStudentBooking from './pages/ListStudentBooking'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login'    element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/tutors' element={<TutorsList/>}/>
        <Route path='/tutors/:idTutor' element={<TutorDetail/>}/>
        <Route path='/booking' element={<TutorDetail/>}/>
        <Route path='/booking/tutor' element={<ListTuTorBooking/>}/>
        <Route path='/booking/student' element={<ListStudentBooking/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
