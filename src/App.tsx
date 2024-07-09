import './App.css'
import LoginButton from './components/common/LoginButtons'
import CreateMentor from './pages/form/CreateMentor'
import Questions from './pages/questions/Questions';
import UserProfile from './pages/user-profile/UserProfile'
import LoginForm from './pages/mentor-login/MentorLogin';

// Import only specific weights and styles
import '@fontsource/roboto/300.css'; // Light weight
import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight
import '@fontsource/roboto/700.css'; // Bold weight


function App () {
  return (
    <>
      <LoginForm />
    </>
  )
}

export default App
