import './App.css';
import HomePage from './pages/HomePage';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import TouristPage from './pages/TouristPage';
import GuidePage from './pages/GuidePage';
import ForgotPassPage from './pages/ForgotPassPage';
import SetNewPassWordPage from './pages/SetNewPassWordPage';
import ChatPage from './pages/ChatPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/touristPage" element={<TouristPage/>}/>
        <Route path="/guidePage" element={<GuidePage/>}/>
        <Route path="/forgotPassWord" element={<ForgotPassPage/>}/>
        <Route path="/setNewPassWordPage" element={<SetNewPassWordPage/>}/>
        <Route path="/chatPage" element={<ChatPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
