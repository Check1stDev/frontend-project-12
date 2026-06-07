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
    <>
      <div className="container my-4">
        <div className="row overflow-hidden chat-layout">
          <div className="col-3 p-3 chat-sidebar">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="chat-title">{t('chat.channels')}</h2>
              <button type="button" className="btn cyber-btn-primary chat-add-btn" onClick={() => dispatch(openModal({ type: 'addChannel', item: null }))}>{t('buttons.add')}</button>
            </div>
            <ul className="list-group chat-channel-list">
              {channels.map((channel) => (
                <li className="list-group-item p-0 d-flex chat-channel-item" key={channel.id}>
                  <button
                    className="btn w-100 text-start chat-channel-btn"
                    type="button"
                    onClick={() => dispatch(setCurrentChannelId(channel.id))}
                  >
                    <span aria-hidden="true"># </span>
                    {channel.name}
                  </button>
                  {channel.removable && (
                  <div className="dropdown chat-channel-dropdown">
                    <button
                      type="button"
                      className="btn dropdown-toggle chat-channel-menu-btn"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      aria-label={t('buttons.channelManagement')}
                    >
                      <span className="visually-hidden">{t('buttons.channelManagement')}</span>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end chat-dropdown-menu">
                      <li><button type="button" className="dropdown-item chat-dropdown-item" onClick={() => dispatch(openModal({ type: 'renameChannel', item: channel }))}>{t('buttons.rename')}</button></li>
                      <li><button type="button" className="dropdown-item chat-dropdown-item chat-dropdown-item-danger" onClick={() => dispatch(openModal({ type: 'removeChannel', item: channel }))}>{t('buttons.remove')}</button></li>
                    </ul>
                  </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="col p-3 chat-main">
            <h2 className="chat-title">{t('chat.messages')}</h2>
            <div className="d-flex flex-column gap-3 chat-messages-list">
              {messages
                .filter((message) => message.channelId === currentChannel)
                .map((message) => {
                  const isOwnMessage = message.username === username;
                  return (
                    <div className={`chat-message-row ${isOwnMessage ? 'chat-message-row-own' : 'chat-message-row-other'}`}>
                      <div key={message.id} className={`chat-message-bubble ${isOwnMessage ? 'chat-message-bubble-own' : 'chat-message-bubble-other'}`}>
                        <div className="chat-message-author">{message.username}</div>
                        <div className="chat-message-body">{message.body}</div>
                      </div>
                    </div>
                  )
                })}
            </div>
            <form className="d-flex gap-2 mt-3 chat-form chat-form" onSubmit={sendMessage}>
              <input
                type="text"
                className="form-control chat-input"
                value={messageText}
                placeholder={t('chat.messagePlaceholder')}
                aria-label="Новое сообщение"
                onChange={(input) => setMessageText(input.target.value)}
              />
              <button type="submit" className="btn cyber-btn-primary chat-send-btn">{t('chat.send')}</button>
            </form>
          </div>
        </div>
      </div>
      <ModalContainer />
    </>
  );
};

export default MainPage;
