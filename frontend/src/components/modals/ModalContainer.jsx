import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal';
// import RemoveChannelModal from './RemoveChannelModal';
// import RenameChannelModal from './RenameChannelModal';

const ModalContainer = () => {
  const modalType = useSelector((store) => store.modal.type);
  const mapping = {
    addChannel: <AddChannelModal />,
    // removeChannel: <RemoveChannelModal />,
    // renameChannel: <RenameChannelModal />
  };
  return mapping[modalType] ?? null;
};

export default ModalContainer;
