import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      header: {
        title: 'Hexlet Chat',
        logout: 'Выйти',
      },

      login: {
        title: 'Войти',
        username: 'Ваш ник',
        password: 'Пароль',
        submit: 'Войти',
        signupText: 'Нет аккаунта?',
        signupLink: 'Регистрация',
        errors: {
          invalidCredentials: 'Неверные имя пользователя или пароль',
          general: 'Ошибка входа. Попробуйте позже',
        },
      },

      signup: {
        title: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        submit: 'Зарегистрироваться',
        cancel: 'Отмена',
        errors: {
          userExists: 'Пользователь с таким именем уже существует',
          general: 'Ошибка регистрации. Попробуйте позже',
        },
      },

      validation: {
        required: 'Поле не может быть пустым',
        usernameMin: 'Слишком короткое имя',
        usernameMax: 'Слишком длинное имя',
        passwordMin: 'Слишком короткий пароль',
        passwordsMustMatch: 'Пароли должны совпадать',
        channelNameMin: 'Слишком короткое название канала',
        channelNameMax: 'Слишком длинное название канала',
        channelNameUnique: 'Канал с таким именем уже существует',
      },

      chat: {
        channels: 'Каналы',
        messages: 'Сообщения',
        send: 'Отправить',
        messagePlaceholder: 'Введите сообщение...',
      },

      modals: {
        addChannel: {
          title: 'Добавить канал',
          inputLabel: 'Имя канала',
          submit: 'Отправить',
          cancel: 'Отменить',
        },
        renameChannel: {
          title: 'Переименовать канал',
          inputLabel: 'Имя канала',
          submit: 'Отправить',
          cancel: 'Отменить',
        },
        removeChannel: {
          title: 'Удалить канал',
          body: 'Уверены что хотите удалить этот канал ?',
          submit: 'Удалить',
          cancel: 'Отменить',
        },
      },

      notFound: {
        title: 'Страница не найдена',
        description: 'Но вы можете перейти на главную страницу',
        link: 'главную страницу',
      },

      buttons: {
        add: '+',
        remove: 'Удалить',
        rename: 'Переименовать',
      },

      notifications: {
        channelCreated: 'Канал создан',
        channelRenamed: 'Канал переименован',
        channelRemoved: 'Канал удалён',
        networkError: 'Ошибка соединения. Проверьте подключение к интернету',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
