import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import TutorsList from './pages/TutorsList'
import TutorDetail from './pages/TutorDetal'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login'    element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/tutors' element={<TutorsList/>}/>
        <Route path='/tutors/:idTutor' element={<TutorDetail/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
