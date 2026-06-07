import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const ModalContainer = () => {
  const modalType = useSelector((store) => store.modal.type);
  const mapping = {
    addChannel: <AddChannelModal />,
    removeChannel: <RemoveChannelModal />,
    renameChannel: <RenameChannelModal />,
  };

  const currentModal = mapping[modalType] ?? null;
  if (!currentModal) {
    return null;
  }

  return (
    <div className="modal show d-block" tabIndex="-1" data-testid="modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {currentModal}
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
