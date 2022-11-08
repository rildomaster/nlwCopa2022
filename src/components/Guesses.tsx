import { useState, useEffect } from 'react';

import { Box, useToast, FlatList } from 'native-base';

import { api } from '../services/api';

import { Loading } from '../components/Loading';
import { Game, GameProps } from '../components/Game';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';


interface Props {
  poolId: string;
  index: number;
  code: string;
}

export function Guesses({ poolId, index, code }: Props) {

  const [isLoading, setIsLoading] = useState(false);
  const [guessConfirmLoading, setGuessConfirmLoading] = useState(false);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState('');
  const [secondTeamPoints, setSecondTeamPoints] = useState('');

  const toast = useToast();

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function getGames() {
    try {

      setIsLoading(true);

      const response = await api.get(`/26684a7a97e4917675cb/${index}/games`);
      //console.log(response.data);

      setGames(response.data);
      
    } catch (error) {
      
      console.log(error);
      toast.show({
        bg: 'red.500',
        title: 'Erro ao carregar os jogos!',
        placement: 'top'
      });

    } finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      //console.log(firstTeamPoints);
      //console.log(secondTeamPoints);
      
      setGuessConfirmLoading(true);

      if(!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          bg: 'red.500',
          title: 'Informe o placar do palpite!',
          placement: 'top'
        });
      }

      await sleep(3000);

      toast.show({
        bg: 'green.500',
        title: 'Palpite enviado com sucesso!',
        placement: 'top'
      });

      //Adicionar aqui o envio do palpite para a API, (que ainda não existe)
      //getGames();

    } catch (error) {
      
      console.log(error);
      toast.show({
        bg: 'red.500',
        title: 'Erro ao confirmar palpite!',
        placement: 'top'
      });

    } finally {
      setGuessConfirmLoading(false);
    }
  }

  useEffect(() => {
    getGames();
  }, [poolId]);

  return (
    <Box flex={1} pb={16}>

      {
        isLoading ? <Loading /> :
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Game 
              data={item}
              setFirstTeamPoints={setFirstTeamPoints}
              setSecondTeamPoints={setSecondTeamPoints}
              onGuessConfirm={() => handleGuessConfirm(item.id)}
              guessConfirmLoading={guessConfirmLoading}
            />
          )}
          _contentContainerStyle={{ pb: 10 }}
          ListEmptyComponent={() => (
            <EmptyMyPoolList code={code} />
          )}
        />
      }

    </Box>
  );
}
