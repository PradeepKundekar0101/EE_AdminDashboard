import { useNavigate } from 'react-router-dom';

export const useNavigationFunctions = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToAdminLogin = () => {
    navigate('/login/admin');
  };

  const navigateToMentorLogin = () => {
    navigate('/login/mentor');
  };

  // Add more navigation functions as needed

  return {
    navigateToHome,
    navigateToAdminLogin,
    navigateToMentorLogin
    // Add more functions here
  };
};
