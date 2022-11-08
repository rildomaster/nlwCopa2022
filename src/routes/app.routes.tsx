import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { useTheme } from 'native-base';
import { Platform } from 'react-native';

import { New } from '../screens/New';
import { Pools } from '../screens/Pools';
import { Find } from '../screens/Find';
import { Details } from '../screens/Details';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {

    const { colors, sizes } = useTheme();
    const iconSize = sizes[6];

    return (
        <Navigator 
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: colors.yellow[500],
                // tabBarInactiveTintColor: colors.gray[300], //'blue'
                //tabBarShowLabel: false,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    position: 'absolute',
                    height: sizes[22],
                    borderTopWidth: 0,
                    //borderTopColor: 'red',
                    //borderTopStartRadius: 10,
                    //borderTopEndRadius: 10,
                    backgroundColor: colors.gray[800]
                },
                tabBarItemStyle: {
                    position: 'relative',
                    top: Platform.OS == 'android' ? -10 : 0
                }
            }}
        >
            <Screen 
                name='new' 
                component={New} 
                options={{ 
                    tabBarIcon: ({ color }) => <PlusCircle color={color} weight='fill' size={iconSize} />,
                    tabBarLabel: 'Novo Bolão'
                }} 
            />

            <Screen 
                name='pools' 
                component={Pools} 
                options={{ 
                    tabBarIcon: ({ color }) => <SoccerBall color={color} weight='fill' size={iconSize} />,
                    tabBarLabel: 'Meus Bolões'
                }} 
            />

            <Screen 
                name='find' 
                component={Find} 
                options={{ 
                    tabBarButton: () => null
                }} 
            />

            <Screen 
                name='details' 
                component={Details} 
                options={{ 
                    tabBarButton: () => null
                }} 
            />

        </Navigator>
    );
}