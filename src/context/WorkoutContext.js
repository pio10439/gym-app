// LISTA TRENINGOW
import React, {createContext,useEffect,useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';

export const WorkoutContext = createContext();

export function WorkoutProvider ({children,currentUser}) {
    const[trainings,setTrainings] = useState([]);

    const loadTrainings = async () => {
        if(!currentUser){
            setTrainings([]);
            return;
        }
        try{
             const users = JSON.parse(await AsyncStorage.getItem('users') || '{}');
             const userTrainings = users[currentUser]?.trainings || [];
            setTrainings(userTrainings)
        }catch(error){
            console.log("Blad w ladowaniu treningow",error);
            setTrainings([]);
        }
    }

    const saveToStorage = async(updatedTrainings) => {
        if(!currentUser) return;
        try{
            const users = JSON.parse( await AsyncStorage.getItem('users') || '{}');
            if(!users[currentUser]){
                users[currentUser] = {password: '', trainings: []};
            }
            users[currentUser].trainings = updatedTrainings;
            await AsyncStorage.setItem('users',JSON.stringify(users));
            setTrainings(updatedTrainings)
        }catch(erorr){
            console.error("Blad z zapisem treningu",erorr);
        }
    };

    const addTraining = async (newTraining) => {
        let location = null;
        try {
            let{status} = await Location.requestForegroundPermissionsAsync();
            if(status === 'granted'){
                let position = await Location.getCurrentPositionAsync({});
                location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                };
            }
        } catch (error) {
            console.error('Blad lokalizacji',error)
        }
        const finalTraining = {
            ...newTraining,
            data: new Date().toISOString(),
            location,
        }
        const updatedTrainings = [...trainings,finalTraining];
        saveToStorage(updatedTrainings)
    };

    const editTraining = (index, updatedTraining) => {
        const updatedTrainings = trainings.map((training,i) => 
            i === index ? 
                {...updatedTraining, ...training}
                : training

        );
        saveToStorage(updatedTrainings);
    };

    const deleteTraining = (index) => {
        const updatedTrainings = trainings.filter((_,i) => i !== index);
        saveToStorage(updatedTrainings);
    }

    useEffect(() => {
        loadTrainings();
    },[currentUser])

    return(
        <WorkoutContext.Provider value={{trainings, addTraining, editTraining, deleteTraining }}>
            {children}
        </WorkoutContext.Provider>
    );
}