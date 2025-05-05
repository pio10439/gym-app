// USTAWIENIA APLIKACJI, tutaj bedzie dodawana waga wzrost wiek i cel, w profilu bedzie wyswietlane 
import React, {useState, useEffect, useContext} from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { TextInput, Button, Title, Text } from "react-native-paper";
import { UserContext } from "../context/UserContext";

export default function SettingScreen () {
    const{userData, saveUserData} = useContext(UserContext);
    const[height,setHeight] = useState(userData.height);
    const[weight,setWeight] = useState(userData.weight);
    const[age,setAge] = useState(userData.age);
    const[goal,setGoal] = useState(userData.goal);

    useEffect(() => {
        setHeight(userData?.height || '');
        setWeight(userData?.weight || '');
        setAge(userData?.age || '');
        setGoal(userData?.goal || '');
    },[userData])

    const isNumeric = (value) => /^[0-9]+$/.test(value);
    
    const saveProfile = () => {
        if(!isNumeric(height) || height < 80 || height > 250){
            return Alert.alert("Enter the correct height in cm (80-250)")
        }
        if(!isNumeric(weight) || weight < 30 || weight > 300){
            return Alert.alert("Enter the correct weight in kg (30-30)")
        }
        if(!isNumeric(age) || age < 10 || age > 120){
            return Alert.alert("Please enter correct age (10-120 years)")
        }
        if(!goal.trim()){
            return Alert.alert("Goal cannot be empty")
        }
        saveUserData({...userData, height, weight, age, goal});
       // console.log('Dane zapisane',userData);
        Alert.alert("Data has been saved 😄")

    };

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Title style={styles.title}>Ustawienia</Title>
            <Text style ={styles.subtitle}>Dane uzytkownika:</Text>
            <TextInput
            label = "Height (cm)"
            style = {styles.input}
            mode="outlined"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
            />
            <TextInput
            style = {styles.input}
            label="Weight (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            mode="outlined"
            />
            <TextInput
            style = {styles.input}
            label="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            mode="outlined"
            />
            <TextInput
            style = {styles.input}
            label="Goal"
            value={goal}
            onChangeText={setGoal}
            mode="outlined"
            />
            <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={saveProfile} style={styles.button} contentStyle = {{paddingVertical: 8}}
            >Save</Button>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 24, backgroundColor: "#f2f4f7" },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 4, color: "#333" },
    subtitle: { fontSize: 18, marginBottom: 16, color: "#666" },
    input: {
        marginBottom: 12,
        backgroundColor: "#fff"
    },
    button: {
        marginTop: 24,
        borderRadius: 8,
    }
  });