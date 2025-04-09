import React, { useState, useContext } from "react";
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { WorkoutContext } from '../context/WorkoutContext';
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function WorkoutsScreen({onLogout}) {

    const { trainings, addTraining, editTraining, deleteTraining } = useContext(WorkoutContext);
    const [trainingTitle, setTrainingTitle] = useState('');
    const [exercise, setExercise] = useState('');
    const [exercises, setExercises] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [error, setError] = useState('');

    const valideInput = () => {
        if(!trainingTitle.trim()){
            setError('Please enter a training name');
            return false;
        }
        if(trainingTitle.trim() === "" || (exercises.length === 0 && exercise.trim() === "")){
            setError("Please add at least one exercise");
            return false;
        }
        setError("");
        return true;
    }

    const addExercise = () => {
        if(exercise.trim().length >= 3){
            setExercises([...exercises,exercise]);
            setExercise("");
            setError("");
        }else{
            setError("Exercise cant be shorter than 3 marks")
        }
    };

    const removeExercise = (index) => {
        setExercises(exercises.filter((_,i) => i !== index));
    };

    const saveTraining = () => {
        if(!valideInput()) return;

        const newTraining = {title: trainingTitle, exercises: [...exercises]};

        if(editMode){
            editTraining(editIndex,newTraining);
            setEditMode(false);
            setEditIndex(null);
        }else{
            addTraining(newTraining);
        }
        resetForm();
    };

    const editExistingTraining = (index) => {
        const training = trainings[index];
        setTrainingTitle(training.title);
        setExercises(training.exercises);
        setEditMode(true);
        setEditIndex(index);
    }

    const deleteWholeTraining = (index) => {
        Alert.alert(
            "Delete training",
            "You sure to dele this training?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: () => deleteTraining(index), style: "destructive" }
            ]
        );
    };

    const resetForm = () => {
        setTrainingTitle('');
        setExercises([]);
        setExercise('');
        setError('');
        setEditMode(false);
        setEditIndex(null);
      };
      

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your workouts 💪</Text>
                <Button title="Logout" onPress={onLogout} color="red" />
            </View>
          <Text style={styles.label}>Training title:</Text>
          <TextInput style={styles.input} 
          value={trainingTitle} 
          onChangeText={setTrainingTitle} 
          placeholder="Write training title" />
          <Text style={styles.label}>Add exercise:</Text>
          <View style={styles.exerciseInputContainer}>
            <TextInput 
            style={[styles.input, { flex: 1 }]} 
            value={exercise} 
            onChangeText={setExercise} 
            placeholder="Enter exercise" />
            <Button 
            title="Add" 
            onPress={addExercise} />
          </View>
    
          {error ? <Text style={styles.error}>{error}</Text> : null}
    
          {exercises.length > 0 && (
            <View>
              <Text>{trainingTitle}:</Text>
              {exercises.map((item, index) => (
                <View key={index} style={styles.exerciseRow}>
                  <Text>- {item}</Text>
                  <TouchableOpacity onPress={() => removeExercise(index)}>
                    <Text style={styles.removeText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
          {editMode && (
            <Button title="Anuluj edycję" onPress={resetForm} color="gray" />)}
          <Button title={editMode ? "Save changes" : "Save training"} onPress={saveTraining} />
    
          <FlatList
            data={trainings}
            renderItem={({ item, index }) => (
              <View style={styles.trainingItem}>
                <View style={styles.trainingHeader}>
                  <Text style={styles.trainingTitle}>{item.title}</Text>
                  <TouchableOpacity onPress={() => editExistingTraining(index)}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteWholeTraining(index)}>
                    <Text style={styles.removeText}>Delete</Text>
                  </TouchableOpacity>
                </View>
                {item.exercises.map((exercise, i) => (
                  <Text key={i} style={styles.exerciseItem}>- {exercise}</Text>
                ))}
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      title: {fontSize: 22,fontWeight: "bold",marginBottom: 10, textAlign: 'center'},
      header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
      container: { flex: 1, padding: 20 },
      label: { fontSize: 16, marginTop: 10 },
      input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginVertical: 5, borderRadius: 4 },
      exerciseInputContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
      exerciseRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
      removeText: { color: 'red', marginLeft: 10 },
      trainingItem: { marginTop: 20, padding: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
      trainingHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
      trainingTitle: { fontSize: 18, fontWeight: 'bold' },
      exerciseItem: { marginLeft: 10 },
      editText: { color: 'blue' },
      error: { color: 'red', marginVertical: 5 },
    });