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
    <header className="navbar app-header">
      <div className="app-header__glow" />
      <div className="container app-header__inner">
        <Link className="navbar-brand app-header__brand" to="/">
          <span className="app-header__brand-mark">#</span>
          <span>{t('header.title')}</span>
        </Link>
        {token && (
        <button
          className="btn app-header__logout"
          type="button"
          onClick={() => {
            dispatch(logOut());
            navigate('/login');
          }}
        >
          {t('header.logout')}
        </button>
        )}
      </div>
    </header>
  );
};

export default Header;
