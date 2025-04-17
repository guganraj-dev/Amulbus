import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react"; 
import HomePage from "./pages/HomePage";
import AdminPanel from "./pages/AdminPanel";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Results from './pages/Results';
import SeatSelect from "./pages/SeatSelect";
import Formfill from "./pages/Formfill";
import AdminPage from "./pages/AdminPage";
import Admin from "./pages/Admin";
import RegisterPage from "./pages/RegisterPage";
import UpdateReg from './pages/UpdateReg'
import BookedCustomer from "./pages/BookedCustomer";
import TouristLogin from "./TouristLogin";
import TouristRegister from "./TouristRegister";
import TouristDashboard from "./TouristDashboard";
import TouristUsers from "./TouristUsers";
import UpdateStatus from "./UpdateStatus";
import TouristBookings from "./auth/TouristBookings";

import Demo from './demo'
import About from "./About";
import Help from "./Help";


function App() {
  const [allbuses, setallbuses] = useState([]);
   const [Statebus, setsatebus] = useState({
    from:'',
    to:'',
    date:'',
   });
  return (
    <Router>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/adminpage" element={<Admin/>} />
  <Route path="/homepage" element={<HomePage search={Statebus} setSearch={setsatebus} />} />
  <Route path="/register" element={<Register />} />
  <Route path="/admin" element={<AdminPanel products={allbuses} setProducts={setallbuses} />} />
  <Route path="/results" element={<Results />} />
  <Route path="/bookedcus" element={<BookedCustomer />} />
  <Route path="/buslist" element={<AdminPage products={allbuses}/>} />
  <Route path="/bus/:id" element={<SeatSelect />} />
  <Route path="/registerpage" element={<RegisterPage />} />
  <Route path="/bus/book/:id" element={<Formfill dateState={Statebus}/>} />
  <Route path="/update/:id" element={<UpdateReg />} />
  <Route path="/touristlogin" element={<TouristLogin />} />
  <Route path="/touristreg" element={<TouristRegister />} />
  <Route path="/tourist-dashboard" element={<TouristDashboard />} />
  <Route path="/tourist-user" element={<TouristUsers/>} />
  <Route path="/update-status/:id" element={<UpdateStatus />} />
  <Route path="/tourist-booking" element={<TouristBookings/>} />
  <Route path="/about" element={<About/>} />
  <Route path="/help" element={<Help/>} />

  
  <Route path="/demo" element={<Demo/>} />
  
  
</Routes>

    </Router>
  );
}

export default App;
