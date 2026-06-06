import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { closeModal } from '../../slices/modalSlice';
import { setCurrentChannelId } from '../../slices/chatSlice';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const modalItem = useSelector((store) => store.modal.item);
  const { t } = useTranslation();

  const deleteChannel = (item) => {
    axios.delete(`/api/v1/channels/${item.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      dispatch(closeModal());
      toast.success(t('notifications.channelRemoved'));
      dispatch(setCurrentChannelId(1));
    });
  };

  return (
    <div>
      <h2>
        {t('modals.removeChannel.title')}
      </h2>
      <h3>{modalItem.name}</h3>
      <p>{t('modals.removeChannel.body')}</p>
      <button type="button" onClick={() => deleteChannel(modalItem)}>{t('modals.removeChannel.submit')}</button>
      <button type="button" onClick={() => dispatch(closeModal())}>{t('modals.removeChannel.cancel')}</button>
    </div>
  );
};

export default RemoveChannelModal;
