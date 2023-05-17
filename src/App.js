import './App.css';
import Navbar from './components/Navbar';
import { Route, Routes, Link } from 'react-router-dom'; 
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';
import Loginscreen from './screens/Loginscreen';
import Signupscreen from './screens/Signupscreen';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
      <Route path="/home" element={<Homescreen/>}/>
      <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen/>}/>
      <Route path="/admin" element={<Adminscreen/>}/>
      <Route path="/" element={<Landingscreen/>}/>
      <Route path="/login" element={<Loginscreen/>}/>
      <Route path="/signup" element={<Signupscreen/>}/>
    </Routes>
    </div>
  )
}

export default App;