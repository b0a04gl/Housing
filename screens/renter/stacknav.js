import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./R1home";
import AddProperty from "./R1add";
import Profile from "./R1profile";
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerTitleStyle: {
          fontWeight: 'bold',
        },
};



const MainStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home}
      options={{
               headerTitleAlign: 'center',
               headerLeft : ({ color, size }) => (
                   <MaterialCommunityIcons name="menu" color={color} size={30}

                    onPress={() => navigation.openDrawer()}
                    />
               ),

           }}

      />

    </Stack.Navigator>
  );
}

const AddPropertyStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="AddProperty" component={AddProperty}

      options={{
               headerTitleAlign: 'center',
               headerLeft : ({ color, size }) => (
                   <MaterialCommunityIcons name="menu" color={color} size={30}

                    onPress={() => navigation.openDrawer()}
                    />
               ),

           }}
      />
    </Stack.Navigator>
  );
}


const ProfileStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={Profile}

      options={{
               headerTitleAlign: 'center',
               headerLeft : ({ color, size }) => (
                   <MaterialCommunityIcons name="menu" color={color} size={30}

                    onPress={() => navigation.openDrawer()}
                    />
               ),

           }}

      />
    </Stack.Navigator>
  );
}


export { MainStackNavigator, AddPropertyStackNavigator,ProfileStackNavigator };