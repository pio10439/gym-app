//PROFIL
import React, {useContext} from "react";
import { StyleSheet,View, Image, FlatList, Alert, TouchableOpacity } from "react-native";
import { Button, Title, Text, Card} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker'
import {MaterialIcons} from '@expo/vector-icons'
import { UserContext} from "../context/UserContext";

export default function ProfileScreen () {
    const{userData, addPhoto, removePhoto} = useContext(UserContext);

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
            <Title style = {styles.title}>Twoj Profil 🧍</Title>

            <Card style={styles.card}>
                <Card.Content>
                    <Text variant="titleMedium">📏 Wzrost: {userData.height  || 'No data'} cm </Text>
                    <Text variant="titleMedium">⚖️ Waga: {userData.weight || 'No data'} kg </Text>
                    <Text variant="titleMedium">🎂 Wiek: {userData.age || 'No data'}  </Text>
                    <Text variant="titleMedium">🎯 Cel: {userData.goal || 'No data'}  </Text>
                </Card.Content>
            </Card>
            <Button 
            onPress={pickImage}
            mode="contained"
            style={styles.button}
            contentStyle={{paddingVertical: 8}}
            >
                Add photo
            </Button>
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
        flex: 1, 
        padding: 24,
        backgroundColor: "#f2f4f7",
    },
    title: { 
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
        marginVertical: 12,
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
        overflow: "hidden"
    }
  });