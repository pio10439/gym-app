// LISTA TRENINGOW
import React, {createContext,useEffect,useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const WorkoutContext = createContext();

export function WorkoutProvider ({children}) {
    const[workouts,setWorkouts] = useState([]);

    const loadWorkouts = async () => {
        try{
            const storedWorkouts = await AsyncStorage.getItem("workouts")
            if(storedWorkouts){
                setWorkouts(JSON.parse(storedWorkouts));
            }
        }catch(error){
            console.log("Failed to load workouts",error);
        }
    }

    const saveWorkouts = async(newWorkout) => {
        try{
            await AsyncStorage.setItem("workouts",JSON.stringify(newWorkout));
        }catch(erorr){
            console.error("Failed to save workouts",erorr);
        }
    };

    const addWorkout = (newWorkout) => {
        const updatedWorkouts = [...workouts,newWorkout];
        setWorkouts(updatedWorkouts);
        saveWorkouts(updatedWorkouts);
    };

    const removeWorkout = (id) => {
        const updatedWorkouts = workouts.filter((workout) => workout.id !== id);
        setWorkouts(updatedWorkouts);
        saveWorkouts(updatedWorkouts);
    };

    const updateWorkout = (id, newName) => {
        const updatedWorkouts = workouts.map(workout => 
            workout.id === id ? {...workout,name: newName} : workout
        );
        setWorkouts(updatedWorkouts);
        saveWorkouts(updatedWorkouts);
    }

    useEffect(() => {
        loadWorkouts();
    },[])

    return(
        <WorkoutContext.Provider value={{workouts, addWorkout, removeWorkout, updateWorkout}}>
            {children}
        </WorkoutContext.Provider>
    );
}