//PROFIL
import React from "react";
import { StyleSheet,View,Text } from "react-native";


export default function ProfileScreen () {
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