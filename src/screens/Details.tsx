import { useEffect, useState } from 'react';
import { Share } from 'react-native';

import { VStack, HStack, useToast } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { api } from '../services/api';

import { PoolCardProps } from '../components/PoolCard';
import { Loading } from '../components/Loading';
import { Header } from '../components/Header';
import { PoolHeader } from '../components/PoolHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Option } from '../components/Option';
import { Guesses } from '../components/Guesses';

interface RouteParam {
    id: string;
    index: number;
}

export function Details() {

    const route = useRoute();
    const toast = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [optionSelected, setOptionSelected] = useState<'guesses' | 'ranking'>('guesses');
    const [pool, setPool] = useState<PoolCardProps>({} as PoolCardProps);

    const { id, index } = route.params as RouteParam;

    async function getPoolDetais() {
        try {
            
            setIsLoading(true);

            const response = await api.get(`/f38ecaf3ab97e28ca29f/${index}`);

            setPool(response.data);

        } catch (error) {
            console.log(error);
            
            toast.show({
                title: 'Um erro ocorreu ao detalhar o bolão! :(',
                bg: 'red.500',
                placement: 'top'
            });

        } finally {
            setIsLoading(false);
        }
    }

    async function handleCodeShare() {
        await Share.share({
            message: pool.code
        });
    }

    useEffect(() => {
        getPoolDetais();
    }, [id]);


    if(isLoading) {
        return (
            <VStack flex={1} bgColor='gray.900'>
                <Loading />
            </VStack>
        );
    }

    return (
        
        <VStack flex={1} bgColor='gray.900'>
            <Header title={pool.title} showBackButton showShareButton onShareButton={handleCodeShare} />

            {
                pool._count?.participants > 0 ?
                <VStack px={5} flex={1}>

                    <PoolHeader data={pool} />

                    <HStack bgColor='gray.800' p={1} rounded='sm' mb={5} >

                        <Option 
                            title='Seus palpites' 
                            isSelected={optionSelected === 'guesses'}
                            onPress={() => setOptionSelected('guesses')}
                        />

                        <Option 
                            title='Ranking do grupo' 
                            isSelected={optionSelected === 'ranking'}
                            onPress={() => setOptionSelected('ranking')}
                        />

                    </HStack>

                    <Guesses poolId={id} index={index} code={pool.code} />

                </VStack>
                :
                <EmptyMyPoolList code={pool.code} />
            }

        </VStack>
    );
}