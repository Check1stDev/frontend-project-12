import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useSelector } from 'react-redux';
import NotFoundPage from './pages/NotFoundPage.jsx';
import MainPage from './pages/MainPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegistrationPage from './pages/RegistrationPage.jsx';
import Header from './components/Header.jsx';

const App = () => {
  const token = useSelector((store) => store.auth.token);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={token ? <MainPage /> : <Navigate to="/login" />} />
          <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/signup" element={<RegistrationPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
