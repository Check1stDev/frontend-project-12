import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logIn } from '../slices/authSlice.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authError, setAuthError] = useState(null);
  const { t } = useTranslation();

  return (
    <div className="container">
      <h1>{t('login.title')}</h1>
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
            .catch(() => {
              setAuthError(t('login.errors.invalidCredentials'));
            });
        }}
      >
        <Form>
          <Field name="username" placeholder={t('login.username')} />
          <Field name="password" type="password" placeholder={t('login.password')} />
          <button type="submit">{t('login.submit')}</button>
        </Form>
      </Formik>
      <div>
        <p>{t('login.signupText')}</p>
        <Link to="/signup">{t('login.signupLink')}</Link>
      </div>
    </div>
  );
};

export default LoginPage;
