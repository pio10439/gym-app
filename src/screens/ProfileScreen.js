//PROFIL
import React, {useState, useContext} from "react";
import { StyleSheet,View,Text, TextInput, Button, Image, FlatList } from "react-native";
import * as ImagePicker from 'expo-image-picker'
import { UserContext } from "../context/UserContext";

export default function ProfileScreen () {
    const{userData, saveUserData, addPhoto} = useContext(UserContext);
    const[height,setHeight] = useState(userData.height);
    const[weight,setWeight] = useState(userData.weight);
    const[age,setAge] = useState(userData.age);
    const[goal,setGoal] = useState(userData.goal);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if(!result.canceled){
            addPhoto(result.assets[0].uri);
        }
    }

        const saveProfile = () => {
            saveUserData({...userData, height, weight, age, goal});
        };
    return(
        <View style = {styles.container}>
            <Text style = {styles.title}>Your Profile 🧍</Text>
        </View>
    );
};
const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            marginTop: 200,
    
    
        },
        title:{
            fontSize: 26,
            fontWeight: "bold",
        }
    })