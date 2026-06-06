import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../slices/authSlice.js';

const Header = () => {
    const token = useSelector((store) => store.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <>
        <Link to="/">Hexlet Chat</Link>
        {token &&  (<button type='button' onClick={() => {
        dispatch(logOut())
        navigate('/login');}}
        >Выйти</button>)}
        </>
    )
}

export default Header;