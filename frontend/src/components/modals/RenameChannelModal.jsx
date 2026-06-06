import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as Yup from 'yup';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { closeModal } from '../../slices/modalSlice';

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const modalItem = useSelector((store) => store.modal.item);
  const channels = useSelector((store) => store.chat.channels);

  const renameChannel = (item, newName) => {
    axios.patch(`/api/v1/channels/${item.id}`, newName, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      dispatch(closeModal());
    });
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Слишком короткое название канала')
      .max(20, 'Слишком длинное название канала')
      .required('Поле не может быть пустым')
      .test(
        'Проверка уникальности',
        'Канал с таким именем уже существует',
        (value) => !channels.some((channel) => channel.name === value && channel.id !== modalItem.id),
      ),
  });
  return (
    <Formik
      initialValues={{
        name: modalItem.name,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => renameChannel(modalItem, values)}
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

export default RenameChannelModal;
