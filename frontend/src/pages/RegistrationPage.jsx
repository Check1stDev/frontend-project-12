import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { logIn } from '../slices/authSlice.js';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [regError, setRegError] = useState(null);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Слишком короткое имя')
      .max(20, 'Слишком длинное имя')
      .required('Поле не может быть пустым'),
    password: Yup.string()
      .min(6, 'Слишком короткий пароль')
      .required('Поле не может быть пустым'),

    confirmPassword: Yup.string()
      .required('Поле не может быть пустым')
      .oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
  });
  return (
    <div className="container">
      <h1>Регистрация</h1>
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
            .catch(() => { setRegError('Пользователь с таким именем уже существует'); });
        }}
      >
        <Form>
          <Field name="username" />
          <ErrorMessage name="username" component="div" />
          <Field name="password" type="password" />
          <ErrorMessage name="password" component="div" />
          <Field name="confirmPassword" type="password" />
          <ErrorMessage name="confirmPassword" component="div" />
          <button type="submit">Зарегистрироваться</button>
          <button type="button" onClick={() => navigate('/login')}>Отмена</button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
