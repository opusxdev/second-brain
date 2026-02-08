import React from "react";
import './App.css';
import './index.css'; 
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import SharedPage from './pages/SharedPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/" element={<RegisterPage />} />
          <Route path="/share/:id" element={<SharedPage />} />
          <Route path="*" element={<Navigate to="/HomePage" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
