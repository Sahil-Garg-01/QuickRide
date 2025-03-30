import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from './pages/Start.jsx';
import UserLogin from './pages/UserLogin.jsx';
import UserSignup from './pages/UserSignup.jsx';
import CaptainSignup from './pages/CaptainSignup.jsx';
import CaptainLogin from './pages/CaptainLogin.jsx';
import Home from './pages/Home.jsx';
import UserProtectWrapper from './pages/UserProtectWrapper.jsx';
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome.jsx';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper.jsx';
import CaptainLogout from './pages/CaptainLogout.jsx';
import Riding from './pages/Riding.jsx';
import CaptainRiding from './pages/CaptainRiding.jsx';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
          } />
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
          } /> 
        <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
        </Routes>
    </div>
  );
};

export default App;