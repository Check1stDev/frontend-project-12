import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { useState } from 'react';

import NotFoundPage from './pages/NotFoundPage.jsx';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage setToken={setToken} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
