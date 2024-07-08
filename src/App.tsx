import './App.css'
import LoginButton from './components/common/LoginButtons'
import FormComponent from './pages/form/UserForm'
import UserProfile from './pages/user-profile/UserProfile'

// Import only specific weights and styles
import '@fontsource/roboto/300.css'; // Light weight
import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight
import '@fontsource/roboto/700.css'; // Bold weight


function App () {
  return (
    <>
      <FormComponent />
    </>
  )
}

export default App
