import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as Yup from 'yup';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { closeModal } from '../../slices/modalSlice';

filter.add(filter.getDictionary('ru'));

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const modalItem = useSelector((store) => store.modal.item);
  const channels = useSelector((store) => store.chat.channels);
  const { t } = useTranslation();

  const renameChannel = (item, values) => {
    const cleanNewName = filter.clean(values.name);
    axios.patch(`/api/v1/channels/${item.id}`, { name: cleanNewName }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      toast.success(t('notifications.channelRenamed'));
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
      <Form className="cyber-modal-form">
        <div className="cyber-modal-header">
          <h2 className="cyber-modal-title">{t('modals.renameChannel.title')}</h2>
          <p className="cyber-modal-subtitle">Обновите название канала</p>
        </div>

        <div className="cyber-modal-body">
          <label className="cyber-modal-label" htmlFor="rename-channel-name">{t('modals.renameChannel.inputLabel')}</label>
          <Field className="cyber-modal-input" id="rename-channel-name" name="name" placeholder={t('modals.renameChannel.inputLabel')} />
          <ErrorMessage className="cyber-modal-error" name="name" component="div" />
        </div>

        <div className="cyber-modal-footer">
          <button className="btn cyber-btn-secondary" type="button" onClick={() => dispatch(closeModal())}>{t('modals.renameChannel.cancel')}</button>
          <button className="btn cyber-btn-primary" type="submit">{t('modals.renameChannel.submit')}</button>
        </div>
      </Form>
    </Formik>
  );
};

export default RenameChannelModal;
