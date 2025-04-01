
import './App.css';
import Home from './pages/Home';
import {Routes,Route} from 'react-router'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MakeComplaint from './pages/MakeComplaint';
import UpdateComplaint from './pages/UpdateComplaint';
import AdminDashboard from './admin/AdminDashboard';
import Message from './admin/Message';
import UserChat from './pages/UserChat';

function App() {
  return (
    <div className="App">
     
      
    
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element = {<Login/>} />
          <Route path="/signup" element = {<SignUp/>} />
          <Route path='/dashboard' element = {<Dashboard/>}  />
          <Route path='/addcomplaint' element = {<MakeComplaint/>}  />
          <Route path='/updatecomplaint' element = {<UpdateComplaint/>}  />
          <Route path='/adminDashboard' element = {<AdminDashboard/>}  />
          <Route path='/message' element = {<Message/>}  />
          <Route path='/userChat' element = {<UserChat/>}  />
          

      </Routes>
      


    </div>
  );
}

export default App;
