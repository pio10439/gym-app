import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import WorkoutsScreen from "../screens/WorkoutsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AuthScreen from "../screens/AuthScreen";
import {WorkoutProvider} from '../context/WorkoutContext';
import { AuthContext, AuthProvider } from "../context/AuthContext";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {

  const {logout} = useContext(AuthContext)

  return (
    <Tab.Navigator
      screenOptions= {({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Welcome") {
            iconName = "view-dashboard";
          } else if (route.name === "Workouts") {
            iconName = "dumbbell";
          } else if (route.name === "Profile") {
            iconName = "account-circle";
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Welcome" component={DashboardScreen} />
      <Tab.Screen name="Workouts">
        {() => <WorkoutsScreen onLogout={logout} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function Navigation() {

  const{isLoggedIn, currentUser} = useContext(AuthContext);

  return (
    <WorkoutProvider currentUser={currentUser}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Screen name="Main" component={MainTabs} />
          ) : (
            <Stack.Screen name="Auth" component={AuthScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </WorkoutProvider>
  );
}

export default function AppNavigation() {
  return(
    <AuthProvider>
      <Navigation/>
    </AuthProvider>
  )
}
