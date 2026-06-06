import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as Yup from 'yup';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { closeModal } from '../../slices/modalSlice';

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const modalItem = useSelector((store) => store.modal.item);
  const channels = useSelector((store) => store.chat.channels);
  const { t } = useTranslation();

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
      .min(3, t('validation.channelNameMin'))
      .max(20, t('validation.channelNameMax'))
      .required(t('validation.required'))
      .test(
        'Проверка уникальности',
        t('validation.channelNameUnique'),
        (value) => !channels.some((channel) => channel.name === value
          && channel.id !== modalItem.id),
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
        <Field name="name" placeholder={t('modals.renameChannel.inputLabel')} />
        <ErrorMessage name="name" component="div" />
        <button type="submit">{t('modals.renameChannel.submit')}</button>
        <button type="button" onClick={() => dispatch(closeModal())}>{t('modals.renameChannel.cancel')}</button>
      </Form>
    </Formik>
  );
};

export default RenameChannelModal;
