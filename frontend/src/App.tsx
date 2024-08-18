import { Route, Routes } from 'react-router'
import AdminDashboard from './admin/admin'
import Home from './dashboard/page'
import EditEvent from './admin/editEvent/[id]'
import CreateEvent from './event/page'
import Login from './login/page'
import Register from './register/page'

function App() {

  return (
    <>
      <Routes>
        <Route path = "/admin"  element = {<AdminDashboard/>} />
        <Route path = "/"  element = {<Home/>}/>
        <Route path = {`/admin/editEvent/:id`} element = {<EditEvent/>} />
        <Route path = "/event/create" element = {<CreateEvent/>}/>
        <Route path = "/login" element = {<Login/>} />
        <Route path = "register" element = {<Register/>} />
       </Routes>
    </>
  )
}

export default App
