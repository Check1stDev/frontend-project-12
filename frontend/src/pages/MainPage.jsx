import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import {
  setChannels,
  setMessages,
  setCurrentChannelId,
  addMessage,
  addChannel,
  removeChannel,
  renameChannel,
} from '../slices/chatSlice';
import { openModal } from '../slices/modalSlice';
import ModalContainer from '../components/modals/ModalContainer';

filter.add(filter.getDictionary('ru'));

const MainPage = () => {
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState('');
  const { t } = useTranslation();

  const channels = useSelector((store) => store.chat.channels);
  const messages = useSelector((store) => store.chat.messages);
  const currentChannel = useSelector((store) => store.chat.currentChannelId);
  const token = useSelector((store) => store.auth.token);
  const username = useSelector((store) => store.auth.username);

  const addMessageRequest = (newMessage) => axios.post('/api/v1/messages', newMessage, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(() => {
    setMessageText('');
  });

  useEffect(() => {
    const socket = io();
    socket.on('connect', () => {
      console.log('socket connected:', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.log('socket connect error:', error.message);
    });
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
    });
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
    });

    const fetchData = () => {
      axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        const loadedChannels = response.data;
        dispatch(setChannels(loadedChannels));
        const generalChannel = loadedChannels.find((channel) => channel.name === 'general');
        dispatch(setCurrentChannelId(generalChannel.id));
      }).catch(() => {
        toast.error(t('notifications.networkError'));
      });

      axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        dispatch(setMessages(response.data));
      }).catch(() => {
        toast.error(t('notifications.networkError'));
      });
    };
    const runFetch = token ? fetchData : () => null;
    runFetch();

    return () => {
      socket.disconnect();
    };
  }, [token, dispatch, t]);
  const sendMessage = (e) => {
    e.preventDefault();
    const trimmedMessage = messageText.trim();
    const cleanMessage = filter.clean(trimmedMessage);
    const newMessage = {
      body: cleanMessage,
      channelId: currentChannel,
      username,
    };
    return trimmedMessage === '' ? null : addMessageRequest(newMessage);
  };
  return (
    <div className="container my-4">
      <div className="row border rounded overflow-hidden">
        <div className="col-3 bg-light p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2>{t('chat.channels')}</h2>
            <button type="button" onClick={() => dispatch(openModal({ type: 'addChannel', item: null }))}>{t('buttons.add')}</button>
            <ModalContainer />
          </div>
          <ul className="list-group">
            {channels.map((channel) => (
              <li className="list-group-item p-0 d-flex" key={channel.id}>
                <button className="btn btn-light w-100 text-start" type="button" onClick={() => dispatch(setCurrentChannelId(channel.id))}>
                  <span aria-hidden="true"># </span>
                  {channel.name}
                </button>
                {channel.removable && (
                <div className="dropdown">
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-label={t('buttons.channelManagement')}
                  >
                    <span className="visually-hidden">{t('buttons.channelManagement')}</span>
                  </button>
                  <ul className="dropdown-menu">
                    <li><button type="button" className="dropdown-item" onClick={() => dispatch(openModal({ type: 'renameChannel', item: channel }))}>{t('buttons.rename')}</button></li>
                    <li><button type="button" className="dropdown-item" onClick={() => dispatch(openModal({ type: 'removeChannel', item: channel }))}>{t('buttons.remove')}</button></li>
                  </ul>
                </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="col p-3">
          <h2>{t('chat.messages')}</h2>
          <div className="d-flex flex-column gap-3">
            {messages
              .filter((message) => message.channelId === currentChannel)
              .map((message) => (
                <div className="border rounded p-3" key={message.id}>
                  <div className="small text-muted">{message.username}</div>
                  <div>{message.body}</div>
                </div>
              ))}
          </div>
          <form className="d-flex gap-2 mt-3" onSubmit={sendMessage}>
            <input
              type="text"
              className="form-control"
              value={messageText}
              placeholder={t('chat.messagePlaceholder')}
              aria-label="Новое сообщение"
              onChange={(input) => setMessageText(input.target.value)}
            />
            <button type="submit" className="btn btn-primary">{t('chat.send')}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
