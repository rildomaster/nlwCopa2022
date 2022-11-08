import { useState } from 'react';
import { VStack, Heading, useToast } from 'native-base';

import { useNavigation } from '@react-navigation/native';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function Find() {

    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { signOut } = useAuth();
    const { navigate } = useNavigation();
    const toast = useToast();
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));

    async function handleJoinPools() {

        try {

            if(!code.trim()) {
                return toast.show({
                            title: 'Informe o código do bolão!',
                            bg: 'red.500',
                            placement: 'top'
                        });
            }

            setIsLoading(true);

            await sleep(3000);

            //TODO: colocar aqui a ação para entrar em um bolão na API

            toast.show({
                title: `Você entrou no bolão '${code}' com sycesso!`,
                bg: 'green.500',
                placement: 'top'
            });

            setCode('');

            setIsLoading(false);

            navigate('pools');

            
        } catch (error) {
            console.log(error)

            setIsLoading(false);
            
            toast.show({
                title: 'Um erro foi encontrado',
                bg: 'red.500',
                placement: 'top'
            });

        }
    }
    
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title='Buscar por código' showBackButton showShareButton onShareButton={signOut} />

            <VStack alignItems='center' mx={5}>

                <Heading color='white' fontSize='xl' fontFamily='heading' textAlign='center' my={8}>
                    Encontre um botão através de {'\n'} seu código único
                </Heading>

                <Input 
                    mb={2} 
                    placeholder='Qual o código do bolão?'
                    autoCapitalize='characters'
                    onChangeText={setCode}
                    value={code}
                    onSubmitEditing={handleJoinPools}
                    returnKeyType='done'
                />

                <Button 
                    title='Buscar bolão'
                    isLoading={isLoading}
                    onPress={handleJoinPools}
                />

            </VStack>
            
            


        </VStack>
    );
}