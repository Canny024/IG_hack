import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
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
        <Route path="/" element={<SignUpPage/>}/>
        <Route path="/loginPage" element={<LoginPage/>}/>
        <Route path="/signUpPage" element={<SignUpPage/>}/>
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
