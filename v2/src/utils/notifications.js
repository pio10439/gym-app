import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export const requestNotificationPermission = async() => {
    const {status} = await Notifications.requestPermissionsAsync();
    if(status !== 'granted'){
        Alert.alert('Permission denied', 'No permission for notifications')
    }
};

export const sendTrainingsNotification = async (training) => {
    try {
        await Notifications.scheduleNotificationAsync({
            content:{
                title:'Training saved, good job 💪🏻',
                body: `${training.title} (${training.exercises.length} exercises) have been saved`,
            },
            trigger: null
        })
    } catch (error) {
        console.error('Error while sending notification',error)
        
    }
}