import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { useToast } from 'native-base';

import { useAuth } from '../hooks/useAuth';

import { AppRoutes } from './app.routes';
import { Signin } from '../screens/Signin';

import { Box } from 'native-base';

export function Routes() {

    const { isAuthenticated, user } = useAuth();
    const toast = useToast();

    function infoSigin() {
        if(isAuthenticated){
            toast.show({ 
                description: `Seja bem vindo ${user.name}`, 
                bg: 'green.500',
                placement: 'top'
            });
        }
      }
    
      useEffect(() => {
        infoSigin();
      }, [isAuthenticated]);

    return (
        <Box flex={1} bg='gray.900'>
            <NavigationContainer>
                {isAuthenticated ? <AppRoutes /> : <Signin />}
            </NavigationContainer>
        </Box>
    );
}