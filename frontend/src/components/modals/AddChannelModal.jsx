import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { closeModal } from '../../slices/modalSlice';
import { setCurrentChannelId } from '../../slices/chatSlice';

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const channels = useSelector((store) => store.chat.channels);
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Слишком короткое название канала')
      .max(20, 'Слишком длинное название канала')
      .required('Поле не может быть пустым')
      .test(
        'Проверка уникальности',
        'Канал с таким именем уже существует',
        (value) => !channels.some((channel) => channel.name === value),
      ),
  });
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => axios.post('/api/v1/channels', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const channel = response.data;
          dispatch(setCurrentChannelId(channel.id));
          dispatch(closeModal());
        })}
    >
      <Form>
        <Field name="name" />
        <ErrorMessage name="name" component="div" />
        <button type="submit">Отправить</button>
        <button type="button" onClick={() => dispatch(closeModal())}>Отменить</button>
      </Form>
    </Formik>
  );
};
export default AddChannelModal;
