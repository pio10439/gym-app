import React, {useState, useContext} from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { AuthContext } from "../context/AuthContext";


export default function AuthScreen () {

    const {login,register} = useContext(AuthContext);
    const[isRegistering,setIsRegistering] = useState(false);
    const[username,setUsername] = useState("");
    const[password,setPassword] = useState("");
    const[message,setMessage] = useState("");


    const handleAuth = async () => {
        setMessage('');
        const result = isRegistering
        ? await register(username,password)
        : await login(username,password);

        if(result.success){
            if(isRegistering){
                setMessage(result.message);
                setIsRegistering(false);
                setPassword('');
                setUsername('');
            }
        }else{
            setMessage(result.error)
        }
    }
    return(
        <View style ={styles.container}>
            <Text style = {styles.title}>{isRegistering ? "Rejestracja":"Logowanie"}</Text>
            <TextInput
            style = {styles.input}
            placeholder="Login"
            value={username}
            onChangeText={setUsername}
            />
            <TextInput
            style = {styles.input}
            placeholder="Hasło"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            />
            {message ? <Text style={styles.message}>{message}</Text> : null}
            <Button
            title={isRegistering? 'Zarejestruj się' : 'Zaloguj się'}
            onPress={handleAuth}
            />
            <Button
            title={isRegistering? 'Mam konto, zaloguj' : 'Nie mam konta, zarejestruj'}
            onPress={() => {
                setIsRegistering(!isRegistering);
                setMessage("");
                setUsername("");
                setPassword("");
            }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 10, borderRadius: 5 },
    message: { color: 'red', marginVertical: 10, textAlign: 'center' },
  });