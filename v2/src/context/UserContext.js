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

    const loadUserData = async () => {
        if(!currentUser){
            console.log('Brak currentUser, reset');
            setUserData({height: '',weight: '',age: '',goal:'',photos: []});
            return;
        }
        try {
            const users = JSON.parse(await AsyncStorage.getItem('users') || '{}');
            const data = users[currentUser]?.userData || {
                height: '',
                weight: '',
                age: '',
                goal: '',
                photos: [],
            };
            console.log('Dane uzytkownika:',data);
            setUserData(data);
        } catch (error) {
            console.error('Blad ladowania danych uzytkownika')
        }
    }

    const saveUserData = async (newData) => {
        if(!currentUser){
            console.log('Brak currentUser')
            return;
        }
        try {
            const users = JSON.parse(await AsyncStorage.getItem('users') || '{}')
            users[currentUser].userData = newData;
            await AsyncStorage.setItem('users',JSON.stringify(users))
            setUserData(newData);
        } catch (error) {
            console.error('Blad zapisu danych uzytkownika',error)
        }
    }

    const addPhoto = async (photoUri) => {
        const updatedData = {...userData, photos: [...userData.photos,photoUri]};
        await saveUserData(updatedData);
    }
    const removePhoto = async (photoUri) => {
        const updatedPhotos = (userData.photos || []).filter((uri) => uri !== photoUri);
        const updatedData = {...userData, photos: updatedPhotos};
        await saveUserData(updatedData)
    };

    useEffect(() => {
        loadUserData();
    },[currentUser]);

    return(
        <UserContext.Provider value={{userData, saveUserData, addPhoto, removePhoto }}>
            {children}
        </UserContext.Provider>
    );
}