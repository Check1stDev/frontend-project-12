import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from '../slices/authSlice.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authError, setAuthError] = useState(null);
  return (
    <div className="container">
      <h1>Авторизация</h1>
      {authError && (
      <div className="alert alert-danger" role="alert">{authError}</div>
      )}
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={(values) => {
          setAuthError(null);
          return axios.post('/api/v1/login', values)
            .then((response) => {
              const { token } = response.data;
              dispatch(logIn(token));
              navigate('/');
            })
            .catch(() => { setAuthError('Неверные имя пользователя или пароль'); });
        }}
      >
        <Form>
          <Field name="username" />
          <Field name="password" type="password" />
          <button type="submit">Войти</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
