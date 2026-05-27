import { Formik, Form, Field } from 'formik';

const LoginPage = () => (
  <div className="container">
    <h1>Авторизация</h1>

    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={() => {}}
    >
      <Form>
        <Field name="username" />
        <Field name="password" type="password" />
        <button type="submit">Войти</button>
      </Form>
    </Formik>
  </div>
);

export default LoginPage;
