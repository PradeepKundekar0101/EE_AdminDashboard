// src/components/LoginButton.js
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducers/authReducer';

const LoginButton = () => {
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ id: 1, name: 'John Doe' }));
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default LoginButton;
