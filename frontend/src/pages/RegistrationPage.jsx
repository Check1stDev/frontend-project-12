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
    <div className="container">
      <h1>{t('signup.title')}</h1>
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
              const { token } = response.data;
              dispatch(logIn(token));
              navigate('/');
            })
            .catch(() => { setRegError(t('signup.errors.userExists')); });
        }}
      >
        <Form>
          <Field name="username" />
          <ErrorMessage name="username" component="div" />
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
          <Field name="confirmPassword" type="password" />
          <ErrorMessage name="confirmPassword" component="div" />
          <button type="submit">{t('signup.submit')}</button>
          <button type="button" onClick={() => navigate('/login')}>{t('signup.cancel')}</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
