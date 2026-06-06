import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOut } from '../slices/authSlice.js';

const Header = () => {
  const token = useSelector((store) => store.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Link to="/">{t('header.title')}</Link>
      {token && (
      <button
        type="button"
        onClick={() => {
          dispatch(logOut());
          navigate('/login');
        }}
      >
        {t('header.logout')}
      </button>
      )}
    </>
  );
};

export default Header;
