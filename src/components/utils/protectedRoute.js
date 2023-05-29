import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { checkToken } from './checkToken';
import NoAuthDialog from '../UI/alerts/noAuthDialog';

const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('AuthToken');

      if (token) {
        const isTokenValid = await checkToken(token);

        setIsAuthenticated(isTokenValid);
      } else {
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, []);

  return isAuthenticated ? <Outlet /> : <NoAuthDialog/>;
};

export default ProtectedRoutes;
