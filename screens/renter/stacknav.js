import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./R1home";
import AddProperty from "./R1add";
import Profile from "./R1profile";
import EditProfile from './R1editProfile';
import CardDetails from './CardDetails';
import AddGeoLocation from './AddGeoLocation';
import AddAmenities from './AddAmenities';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#4263ec",
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
                   <MaterialCommunityIcons name="text" color={'#fff'} size={30}

                    onPress={() => navigation.openDrawer()}
                    />
               ),
               headerRight : ({ color, size }) => (
                   <MaterialCommunityIcons name="bell-outline" color={'#fff'} size={30}

                    />
               ),

           }}

      />

      <Stack.Screen name="CardDetails" component={CardDetails}

      options={({route}) => ({
        // title: route.params.title,
        headerBackTitleVisible: false,
        headerTitle: false,
        headerTransparent: true,
        headerTintColor: '#fff'
      })}
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
                   <MaterialCommunityIcons name="text" color={'#fff'} size={30}

                    onPress={() => navigation.openDrawer()}
                    />
               ),
               headerRight : ({ color, size }) => (
                   <MaterialCommunityIcons name="bell-outline" color={'#fff'} size={30}


                    />
               ),

           }}
      />

      <Stack.Screen name="AddGeoLocation" component={AddGeoLocation}

      options={({route}) => ({
        // title: route.params.title,

      })}
      />

      <Stack.Screen name="AddAmenities" component={AddAmenities}

      options={({route}) => ({
        // title: route.params.title,

      })}
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
                   <MaterialCommunityIcons name="text" color={'#fff'} size={30}

                    onPress={() => navigation.openDrawer()}
                    />
               ),

               headerRight : ({ color, size }) => (
                   <MaterialCommunityIcons name="bell-outline" color={'#fff'} size={30}


                    />
               ),

           }}

      />

      <Stack.Screen name="EditProfile" component={EditProfile}

      options={{

               headerTitleAlign: 'center',
               headerLeft : ({ color, size }) => (
                   <MaterialCommunityIcons name="text" color={'#fff'} size={30}

                    onPress={() => navigation.openDrawer()}
                    />
               ),

               headerRight : ({ color, size }) => (
                   <MaterialCommunityIcons name="bell-outline" color={'#fff'} size={30}


                    />
               ),

           }}

      />

    </Stack.Navigator>
  );
}


export { MainStackNavigator, AddPropertyStackNavigator,ProfileStackNavigator };
