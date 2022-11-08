import { useCallback, useState } from 'react';

import { VStack, Icon, useToast, FlatList } from 'native-base';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Octicons } from '@expo/vector-icons';

import { api } from '../services/api';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PoolCard, PoolCardProps } from '../components/PoolCard';
import { EmptyPoolList } from '../components/EmptyPoolList';


export function Pools() {

    const [isLoading, setIsLoading] = useState(true);
    const [pools, setPools] = useState<PoolCardProps[]>([]);

    const { navigate } = useNavigation();
    const toast = useToast();

    async function getPools() {
        try {

            setIsLoading(true);

            const response = await api.get('/f38ecaf3ab97e28ca29f');
            //console.log(response.data);

            setPools(response.data);

        } catch (error) {
            console.log(error);
            toast.show({
                title: 'Houve um erro ao capturar os bolões :(',
                bg: 'red.500',
                placement: 'top'
            });

        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        getPools();
    }, []));

    return (
        <VStack flex={1} bg='gray.900'>

            <Header title='Meus Bolões' />

            <VStack borderBottomWidth={2} borderBottomColor='gray.600' mt={6} mb={4} mx={5} pb={4}>

                <Button 
                    title='Buscar bolão por código' 
                    leftIcon={<Icon as={Octicons} name='search' color='black' size='md' />}
                    onPress={() => navigate('find')}
                />
                
            </VStack>

            {
                isLoading ? <Loading /> :
                <FlatList 
                    data={pools}
                    keyExtractor={item => item.id}
                    renderItem={({item, index}) => (
                        <PoolCard 
                            data={item}
                            onPress={() => navigate('details', { id: item.id, index })}
                        />
                    ) }
                    ListEmptyComponent={() => <EmptyPoolList />}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ pb: 10 }}
                    px={5}
                />
            }

        </VStack>
    );
}