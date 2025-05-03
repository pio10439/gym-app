import React, {createContext, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserContext = createContext();

export function UserProvider({children, currentUser}) {
    const[userData,setUserData] = useState({
        height: '',
        weight: '',
        age: '',
        goal: '',
        photos: [],
    });

    const loodUserData = async () => {
        try {
            const users = JSON.parse(await AsyncStorage.getItem('users') || '{}');
            const data = users[currentUser]?.userData || {};
            setUserData({...userData, ...data})
        } catch (error) {
            console.error('Blad ladowania danych uzytkownika')
        }
    }

    const saveUserData = async (newData) => {
        if(!currentUser) return;
        try {
            const users = JSON.parse(await AsyncStorage.getItem('users') || '{}')
            users[currentUser].userData = newData;
            await AsyncStorage.setItem('users',JSON.stringify(users))
            setUserData(newData);
        } catch (error) {
            console.error('Blad zapisu danych uzytkownika',error)
        }
    }

    const addPhoto = async (photoUsr) => {
        const updatedData = {...userData, photos: [...userData.photos,photoUsr]};
        saveUserData(updatedData);
    }

    useEffect(() => {
        loodUserData();
    },[currentUser]);

    return(
        <UserContext.Provider value={{userData, saveUserData, addPhoto }}>
            {children}
        </UserContext.Provider>
    );
}