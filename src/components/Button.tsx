import { Button as BaseButton, IButtonProps, Text } from 'native-base';

interface Props extends IButtonProps {
    title: string;
    type?: 'PRIMARY' | 'SECONDARY';
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
    return (
        <BaseButton 
            w='full'
            h={14}
            rounded='sm'
            bg={type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
            _pressed={{ bg: type === 'SECONDARY' ? 'red.400' : 'yellow.200' }}
            
            {...rest} 
        >


            <Text 
                textTransform='uppercase' 
                fontSize='sm' 
                fontFamily='heading'
                color={type === 'SECONDARY' ? 'white' : 'black'}
            >

                {title}
            </Text> 

        </BaseButton>
    );
}