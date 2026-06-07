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
    <div className="cyber-modal-panel">
      <div className="cyber-modal-header">
        <h2 className="cyber-modal-title">{t('modals.removeChannel.title')}</h2>
        <p className="cyber-modal-subtitle">Это действие нельзя отменить</p>
      </div>

      <div className="cyber-modal-body">
        <span className="cyber-modal-channel-name">
          #
          {' '}
          {modalItem.name}
        </span>
        <p className="mb-0">{t('modals.removeChannel.body')}</p>
      </div>

      <div className="cyber-modal-footer">
        <button className="btn cyber-btn-secondary" type="button" onClick={() => dispatch(closeModal())}>{t('modals.removeChannel.cancel')}</button>
        <button className="btn cyber-btn-danger" type="button" onClick={() => deleteChannel(modalItem)}>{t('modals.removeChannel.submit')}</button>
      </div>
    </div>
  );
};

export default RemoveChannelModal;
