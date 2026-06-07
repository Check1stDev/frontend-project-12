import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { logIn } from '../slices/authSlice.js';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [regError, setRegError] = useState(null);
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, t('validation.usernameMin'))
      .max(20, t('validation.usernameMax'))
      .required(t('validation.required')),
    password: Yup.string()
      .min(6, t('validation.passwordMin'))
      .required(t('validation.required')),
    confirmPassword: Yup.string()
      .required(t('validation.required'))
      .oneOf([Yup.ref('password')], t('validation.passwordsMustMatch')),
  });
  return (
    <main className="container d-flex justify-content-center align-items-center auth-page">
      <div className="card auth-card">
        <div className="card-body">
          <h1 className="card-title text-center mb-4">{t('signup.title')}</h1>
          {regError && (
          <div className="alert alert-danger" role="alert">{regError}</div>
          )}
          <Formik
            initialValues={{
              username: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              setRegError(null);
              return axios.post('/api/v1/signup', { username: values.username, password: values.password })
                .then((response) => {
                  dispatch(logIn(response.data));
                  navigate('/');
                })
                .catch(() => { setRegError(t('signup.errors.userExists')); });
            }}
          >
            <Form className="d-flex flex-column gap-3">
              <div>
                <label className="form-label" htmlFor="username">{t('signup.username')}</label>
                <Field className="form-control" id="username" name="username" />
                <ErrorMessage className="text-danger mt-1" name="username" component="div" />
              </div>

              <div>
                <label className="form-label" htmlFor="password">{t('signup.password')}</label>
                <Field className="form-control" id="password" name="password" type="password" />
                <ErrorMessage className="text-danger mt-1" name="password" component="div" />
              </div>

              <div>
                <label className="form-label" htmlFor="confirmPassword">{t('signup.confirmPassword')}</label>
                <Field className="form-control" id="confirmPassword" name="confirmPassword" type="password" />
                <ErrorMessage className="text-danger mt-1" name="confirmPassword" component="div" />
              </div>

              <button className="btn btn-primary w-100" type="submit">{t('signup.submit')}</button>
              <button className="btn cancel-btn cyber-btn-secondary w-100" type="button" onClick={() => navigate('/login')}>{t('signup.cancel')}</button>
            </Form>
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default RegistrationPage;
