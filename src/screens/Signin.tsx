import { Center, Text, Icon } from 'native-base';
import Logo from '../assets/logo.svg';
import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';
import { Fontisto  } from '@expo/vector-icons';

export function Signin() {

  const { signIn, isUserLoading } = useAuth();

  return (
      <Center flex={1} bgColor="gray.900" p={6}>

        <Logo width={212} height={40} />

        <Button 
          marginY={10}
          leftIcon={<Icon as={Fontisto} name='google' color='white' size='md' />}
          title='Entrar com o Google' 
          type='SECONDARY'
          onPress={signIn}
          isLoading={isUserLoading}
          _loading={{ _spinner: { color: 'white' } }}
        />

        <Text color='white' textAlign='center'>
          Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
        </Text>
        
      </Center>
  );
}