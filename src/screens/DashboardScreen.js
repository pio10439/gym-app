// MENU GLOWNE
import React, {useContext} from "react";
import { StyleSheet,View,Text } from "react-native";
import {WorkoutContext} from '../context/WorkoutContext'


export default function DashboardScreen () {
    const {trainings} = useContext(WorkoutContext);

    const lastTraining = trainings.length > 0 ? trainings[trainings.length - 1 ] : null;

    return(
        <View style = {styles.container}>
            <Text style={styles.title}>Dashboard</Text>
            {lastTraining ? (
                <View>
                    <Text style={styles.label}>Ostatni trening:</Text>
                    <Text>{lastTraining.title}</Text>
                    <Text>Data: {new Date(lastTraining.data).toLocaleDateString()}</Text>
                    <Text>
                        Lokalizacja: {''}
                        {lastTraining.location
                        ? `${lastTraining.location.latitude}, ${lastTraining.location.longitude}`
                        : 'Brak danych'}
                    </Text>
                </View>

            ) : (
                <Text>Brak Treningow</Text>
            )}
            </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title:{
        textAlign: "center",
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 20
    },
    label: { 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
})