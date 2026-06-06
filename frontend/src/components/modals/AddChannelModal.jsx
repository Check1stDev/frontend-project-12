import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../slices/modalSlice';
import { setCurrentChannelId } from '../../slices/chatSlice';
import filter from 'leo-profanity';

filter.add(filter.getDictionary('ru'));

const AddChannelModal = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const channels = useSelector((store) => store.chat.channels);
  const { t } = useTranslation();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, t('validation.channelNameMin'))
      .max(20, t('validation.channelNameMax'))
      .required(t('validation.required'))
      .test(
        'Проверка уникальности',
        t('validation.channelNameUnique'),
        (value) => !channels.some((channel) => channel.name === filter.clean(value)),
      ),
  });
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={validationSchema}
      
      onSubmit={(values) => {
        const cleanName = filter.clean(values.name);
        
        axios.post('/api/v1/channels', { name: cleanName }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          const channel = response.data;
          toast.success(t('notifications.channelCreated'));
          dispatch(setCurrentChannelId(channel.id));
          dispatch(closeModal());
        })}
    }
    >
      <Form>
        <Field name="name" placeholder={t('modals.addChannel.inputLabel')} />
        <ErrorMessage name="name" component="div" />
        <button type="submit">{t('modals.addChannel.submit')}</button>
        <button type="button" onClick={() => dispatch(closeModal())}>{t('modals.addChannel.cancel')}</button>
      </Form>
    </Formik>
  );
};
export default AddChannelModal;
