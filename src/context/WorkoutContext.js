// LISTA TRENINGOW
import React, {createContext,useEffect,useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const WorkoutContext = createContext();

export function WorkoutProvider ({children,currentUser}) {
    const[trainings,setTrainings] = useState([]);

    const loadTrainings = async () => {
        if(!currentUser) return;
        try{
             const users = JSON.parse(await AsyncStorage.getItem('users')) || {};
             const userTrainings = users[currentUser]?.trainings || [];
            setTrainings(userTrainings)
        }catch(error){
            console.log("Blad w ladowaniu treningow",error);
        }
    }

    const saveToStorage = async(updatedTrainings) => {
        if(!currentUser) return;
        try{
            const users = JSON.parse( await AsyncStorage.getItem('users')) || {};
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

    const addTraining = (newTraining) => {
        const updatedTrainings = [...trainings,newTraining];
        saveToStorage(updatedTrainings)
    };

    const editTraining = (index, updatedTraining) => {
        const updatedTrainings = trainings.map((training,i) => 
            i === index ? updatedTraining : training
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