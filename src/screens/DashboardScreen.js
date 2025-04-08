// MENU GLOWNE
import React from "react";
import { StyleSheet,View,Text } from "react-native";
import { styles } from "../assets/styles";

export default function DashboardScreen () {
    return(
        <View style = {styles.container} >
            <Text style = {styles.title}>Welcome to Gym App! 🏋️ </Text>
            <Text>Your latest workouts will appear here</Text>
        </View>
    );
};
