import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.description')}</p>
    </div>
  );
};

export default NotFoundPage;
