//LISTA TRENINGOW
import React,{useState, useContext} from "react";
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, Alert  } from "react-native";
import {WorkoutContext} from '../context/WorkoutContext';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function WorkoutsScreen () {

    const {workouts, addWorkout, removeWorkout, updateWorkout} = useContext(WorkoutContext);
    const[newWorkout, setNewWorkout] = useState("");
    const[editWorkout,setEditeWorkout] = useState(null);
    const[editName,setEditName] = useState("");

    const handleAddWorkouts = () => {
        if(newWorkout.trim() && isNaN(newWorkout)){
            addWorkout({id: Date.now().toString(), name: newWorkout});
            setNewWorkout("");
        }else {
            Alert.alert("Pls enter some workout 😃")
        }
    };

    const handleEditWorkout = (id,name) => {
        setEditeWorkout(id);
        setEditName(name);
    }
    
    const handleSaveEdit = (id) => {
        if(editName.trim()){
            updateWorkout(id, editName);
            setEditeWorkout(null);
        }
    }

    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Your workouts 💪</Text>
            <TextInput
            style = {styles.input}
            placeholder="Enter workout name"
            value={newWorkout}
            onChangeText={setNewWorkout}
            />
            <Button title="Add workout" onPress = {handleAddWorkouts} />
            <FlatList
            data = {workouts}
            keyExtractor = {(item) => item.id}
            renderItem = {({item}) => (
                <View style = {styles.workoutItem}>
                    {editWorkout === item.id ? (
                        <>
                        <TextInput
                        style = {styles.input}
                        value={editName}
                        onChangeText={setEditName}
                        />
                        <TouchableOpacity onPress={() => handleSaveEdit(item.id)}>
                            <MaterialCommunityIcons name="content-save" size={24} color="green"/>
                        </TouchableOpacity>
                        </>
                    ) : (
                        <>
                        <Text style = {styles.workoutText}>{item.name}</Text>
                        <View style = {styles.icons}>
                            <TouchableOpacity onPress={() => handleEditWorkout(item.id, item.name)}>
                                <MaterialCommunityIcons name="pencil" size = {24} color= "blue"/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => removeWorkout(item.id)}>
                                <MaterialCommunityIcons name="trash-can" size={24} color="red"/>
                            </TouchableOpacity>
                        </View>
                        </>
                    )}
                </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
      },
      title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 8,
        marginBottom: 10,
        borderRadius: 5,
        flex: 1,
      },
      workoutItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
      },
      workoutText: {
        fontSize: 18,
        flex: 1,
      },
      icons: {
        flexDirection: "row",
        gap: 10,
      },
})



