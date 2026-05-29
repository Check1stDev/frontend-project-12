import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';

import { useSelector } from 'react-redux';
import NotFoundPage from './pages/NotFoundPage.jsx';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';

const App = () => {
  const token = useSelector((store) => store.auth.token);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <MainPage /> : <Navigate to="/login" />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
