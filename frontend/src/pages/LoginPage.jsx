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
    <main className="container d-flex justify-content-center align-items-center auth-page">
      <div className="card auth-card">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">{t('login.title')}</h1>
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
                  dispatch(logIn(response.data));
                  navigate('/');
                })
                .catch(() => {
                  setAuthError(t('login.errors.invalidCredentials'));
                });
            }}
          >
            <Form className="d-flex flex-column gap-3">
              <div>
                <label className="form-label" htmlFor="username">{t('login.username')}</label>
                <Field className="form-control" id="username" name="username" placeholder={t('login.username')} />
              </div>

              <div>
                <label className="form-label" htmlFor="password">{t('login.password')}</label>
                <Field className="form-control" id="password" name="password" type="password" placeholder={t('login.password')} />
              </div>

              <button className="btn btn-primary w-100" type="submit">{t('login.submit')}</button>
            </Form>
          </Formik>
          <div className="auth-footer text-center mt-4">
            <p className="mb-2">{t('login.signupText')}</p>
            <Link to="/signup">{t('login.signupLink')}</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
