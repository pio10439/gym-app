// MENU GLOWNE
import React from "react";
import { StyleSheet,View,Text } from "react-native";


export default function DashboardScreen () {
    return(
        <View style = {styles.container} >
            <Text style = {styles.title}>Welcome to Gym App! 🏋️ </Text>
            <Text>Your latest workouts will appear here</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginTop: 200,


    },
    title:{
        textAlign: "center",
        fontSize: 26,
        fontWeight: "bold",
    }
})