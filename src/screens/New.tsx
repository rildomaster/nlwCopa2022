import { useState } from 'react';
import { VStack, Heading, Text, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';

import Logo from '../assets/logo.svg';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function New() {

    const [poolName, setPollName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();
    const { navigate } = useNavigation();

    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    async function handleAddPoll() {

        if(!poolName.trim()){
            return toast.show({
                title: 'Informe o nome do bolão!', 
                // description: 'Descrição', 
                placement: 'top',
                bgColor: 'red.500'
            });
        }

        try {

            setIsLoading(true);

            //TODO: Implementar novo bolão para API aqui

            await sleep(3000);

            toast.show({
                bg: 'green.500',
                title: `Bolão '${poolName}' foi criado com sucesso!`,
                placement: 'top'
            });

            setPollName('');

            navigate('pools');

            
        } catch (error) {
      
            console.log(error);
            toast.show({
              bg: 'red.500',
              title: 'Erro ao confirmar palpite!',
              placement: 'top'
            });
      
          } finally {
            setIsLoading(false);
          }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title='Criar novo bolão' />

            <VStack alignItems='center' mt={8} mx={5}>
                <Logo />

                <Heading color='white' fontSize='xl' fontFamily='heading' textAlign='center' my={8}>
                    Crie seu próprio bolão de copa {'\n'} e compartilhe entre amigos!
                </Heading>

                <Input 
                    mb={2} 
                    placeholder='Qual o nome do bolão?' 
                    onChangeText={setPollName}
                    value={poolName}
                    onSubmitEditing={handleAddPoll}
                    returnKeyType='done'
                />

                <Button 
                    title='Criar meu bolão' 
                    onPress={handleAddPoll}
                    isLoading={isLoading}
                />

                <Text color='gray.200' fontSize='sm' textAlign='center' mt={4} px={10}>
                    Após criar seu bolão, você receberá um código único
                    que poderá usar para convidar outra outras pessoas.
                </Text>

            </VStack>
            
            


        </VStack>
    );
}