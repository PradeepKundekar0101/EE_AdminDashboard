// src/components/LoginButton.js
import { useDispatch } from 'react-redux'
import { login } from '../../store/reducers/authReducer'
import CustomLayout from '../layout/custom-layout/CustomLayout'

const LoginButton = () => {
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(login({ id: 1, name: 'John Doe' }))
  }

  return (
    <CustomLayout>
      <button onClick={handleLogin}>Login</button>
    </CustomLayout>
  )
}

export default LoginButton
