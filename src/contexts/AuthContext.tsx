import { createContext, ReactNode, useState, useEffect } from 'react';

import axios from 'axios';

import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    picture: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean;
    isAuthenticated: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthProviderProps) {

    const [isUserLoading, setIsUserLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<UserProps>({} as UserProps);

    const googleClientId = process.env.GOOGLE_CLIENT_ID;

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: googleClientId,
        redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
        scopes: ['profile', 'email']
    });

    async function signIn() {
        try {
            
            setIsUserLoading(true);
            await promptAsync();

        } catch (error) {

            console.log(error)
            throw error;

        } finally {
            setIsUserLoading(false);
        }
    }

    async function signOut() {

        setUser({} as UserProps);
        setIsAuthenticated(false);

    }

    async function signInWithGoogle(access_token: string) {
        //console.log('TOKEN DE AUTENTICAÇÃO =>', access_token);

        const response = (await axios.get('https://www.googleapis.com/oauth2/v2/userinfo',{
            headers: {"Authorization" : `Bearer ${access_token}`}
        }));
        
        setUser({ name: response.data.name, picture: response.data.picture });
        setIsAuthenticated(true);
    }

    useEffect(() => {
        if(response?.type === 'success' && response?.authentication?.accessToken) {
            signInWithGoogle(response.authentication.accessToken);
        }
    }, [response]);

    return (
        <AuthContext.Provider 
            value={{
                user,
                isUserLoading,
                isAuthenticated,
                signIn,
                signOut
            }} 
        >
            {children}
        </AuthContext.Provider>
    );
}