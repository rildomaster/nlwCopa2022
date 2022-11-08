import { useState } from 'react';
import { VStack, Heading, Text, useToast } from 'native-base';

import Logo from '../assets/logo.svg';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export function New() {

    const [poolName, setPollName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    async function handleAddPoll() {

        if(!poolName.trim()){
            return toast.show({
                title: 'Informe o nome do bolão!', 
                // description: 'Descrição', 
                placement: 'top',
                bgColor: 'red.500'
            });
        }
        
        setIsLoading(true);
        console.log(`Você clicou em Add e o valur do input é: '${poolName}'`);

        setTimeout(() => {
            setIsLoading(false);
            console.log('A função de time terminou!!');
        }, 3000);
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