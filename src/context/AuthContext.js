// LOGOWANIE,REJESTROWANIE
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[currentUser, setCurrentUser] = useState(null);
    
    useEffect(() => {
        checkLoginStatus();
    },[])
    
    const checkLoginStatus = async () => {
        try{
            const loggedInUser = await AsyncStorage.getItem('currentUser');
            if(loggedInUser){
                setCurrentUser(loggedInUser);
                setIsLoggedIn(true);
            }
        }catch(error){
            console.error("Blad w sprawdzaniu statusu logowania",error);
        }
    }

    const login = async (username, password) => {
        try {
            const users = JSON.parse(await AsyncStorage.getItem('users')) || {};
            if(!users[username] || users[username].password !== password){
                return{success: false, error: "Nieprawidlowy login lub haslo"}
            }
            await AsyncStorage.setItem('currentUser',username);
            setCurrentUser(username);
            setIsLoggedIn(true);
            return{success: true};
        }catch (error){
            console.error("Blad logowania",error)
            return{success: false, error: "Blad logowania"};
        }
    };
    const register = async (username, password) => {
        if (!username || !password) {
          return { success: false, error: 'Wypełnij wszystkie pola' };
        }
        try {
          const users = JSON.parse(await AsyncStorage.getItem('users')) || {};
          if (users[username]) {
            return { success: false, error: 'Użytkownik już istnieje' };
          }
          users[username] = { password, trainings: [] };
          await AsyncStorage.setItem('users', JSON.stringify(users)); 
          return { success: true, message: 'Rejestracja udana, możesz się zalogować' };
        } catch (error) {
          console.error('Błąd rejestracji', error);
          return { success: false, error: 'Błąd rejestracji' };
        }
      };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('currentUser');
            setIsLoggedIn(false);
            setCurrentUser(null);
        } catch (error) {
            console.error("Blad wylogowywania",error)
        }
    }

    return(
        <AuthContext.Provider value={{isLoggedIn, currentUser,login,register,logout}}>
            {children}
        </AuthContext.Provider>
    )
}