//PROFIL
import React, {useContext} from "react";
import { StyleSheet,View, Image, FlatList, Alert, TouchableOpacity, SafeAreaView } from "react-native";
import { Button, Text, Card} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker'
import {MaterialIcons} from '@expo/vector-icons'
import { UserContext} from "../context/UserContext";
import { Camera } from "expo-camera";

export default function ProfileScreen () {
    const{userData, addPhoto, removePhoto} = useContext(UserContext);

    const takePhoto = async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        if(status !== 'granted'){
            Alert.alert('Permission denied','Camera is required to take photos' );
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
        });
        if(!result.canceled) {
            addPhoto(result.assets[0].uri);
        }
    }

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

    const delPhoto = (uri) => {
        setTimeout(() => {
        Alert.alert("Delete photo","Ale you sure to delete this photo ? ", [
            {text: "Cancel", style: "cancel"},
            {text: "Delete", style: "destructive", onPress: () => removePhoto(uri)},
            ]);
        },100);
    };

    return(
        <View style = {styles.container}>
            <Text variant="titleLarge"  style = {styles.title}>Your Profile 🧍</Text>
            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleMedium">📏 Height: {userData.height  || 'No data'} cm </Text>
                    <Text variant="titleMedium">⚖️ Weight: {userData.weight || 'No data'} kg </Text>
                    <Text variant="titleMedium">🎂 Age: {userData.age || 'No data'}  </Text>
                    <Text variant="titleMedium">🎯 Goal: {userData.goal || 'No data'}  </Text>
                </Card.Content>
            </Card>
            <View style={styles.testButtons}>
            <Button 
            onPress={pickImage}
            mode="contained"
            style={styles.button}
            >
                Add from gallery
            </Button>
             <Button 
            onPress={takePhoto}
            mode="contained"
            style={styles.button}
            >
                Take photo
            </Button>
            </View>
            <Text style={styles.photoTitle}>Your photos:</Text>
            <FlatList
                data={userData?.photos || []}
                renderItem={({item}) =>(
                    <TouchableOpacity
                    onPress={() => delPhoto(item)}
                    style={styles.imageWrapper}
                    activeOpacity={0.8}
                    >
                        <Image source={{uri: item}} style={styles.photo}/>
                        <MaterialIcons
                        name="delete"
                        size={20}
                        color="#fff"
                        style={styles.deleteIcon}
                        />
                    </TouchableOpacity>
                )}
                keyExtractor={(item,index) => index.toString()}
                numColumns={2}
                key={'_2col'}
                ListEmptyComponent={<Text>No photos</Text>}
                contentContainerStyle={{paddingVertical: 10}}

            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: { 
        marginTop: 55,
        flex: 1, 
        padding: 24,
        backgroundColor: "#f2f4f7",
    },
    title: { 
        textAlign: 'center',
        fontSize: 28, 
        fontWeight: 'bold', 
        marginBottom: 16,
        color: "#333" 
    },
    card: {
        marginBottom: 20,
        backgroundColor:"#fff",
        borderRadius: 12,
        elevation: 3
    },
    button:{
        marginVertical: 2,
        borderRadius: 8,
    },
    photoTitle:{
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 12,
        marginBottom: 6,
    },
    imageWrapper: {
        flex: 1,
        margin: 6,
        borderRadius: 8,
        overflow: "hidden",
        elevation: 2,
        backgroundColor: "#fff",
    },
    photo: { 
        width: '100%', 
        aspectRatio: 1,
        resizeMode: "cover",
    },
    deleteIcon: {
        position: "absolute",
        top: 8,
        right: 8,
        padding: 4,
        borderRadius: 20,
        overflow: "hidden",
    },
    testButtons: {
        flexDirection: 'column',
    }
  });