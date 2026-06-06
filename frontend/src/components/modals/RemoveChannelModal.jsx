import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { closeModal } from '../../slices/modalSlice';
import { setCurrentChannelId } from '../../slices/chatSlice';

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const modalItem = useSelector((store) => store.modal.item);

  const deleteChannel = (item) => {
    axios.delete(`/api/v1/channels/${item.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      dispatch(closeModal());
      dispatch(setCurrentChannelId(1));
    });
  };

  return (
    <div>
      <h2>
        Удаление канала
      </h2>
      <h3>{modalItem.name}</h3>
      <p>Уверены что хотите удалить этот канал ?</p>
      <button type="button" onClick={() => deleteChannel(modalItem)}>Удалить</button>
      <button type="button" onClick={() => dispatch(closeModal())}>Отмена</button>
    </div>
  );
};

export default RemoveChannelModal;
