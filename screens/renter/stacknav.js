import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {View} from 'react-native';
import MyProperty from "./R1MyProperty";
import AddProperty from "./R1add";
import Profile from "./R1profile";
import EditProfile from './R1editProfile';
import CardListScreen from './CardListScreen';
import CardDetails from './CardDetails';
import AddGeoLocation from './AddGeoLocation';
import AddAmenities from './AddAmenities';
import AddMultiImages from './AddMultiImages';
import Wishlist from './Wishlist';
import Home from './Home';
import Search from './Search';
import SearchAmenities from './SearchAmenities';
import SearchResults from './SearchResults';
import MapViewScreen from './MapViewScreen';

import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Heart from '../../components/Heart';

// import { MaterialCommunityIcons } from '@expo/vector-icons';
const Stack = createStackNavigator();

let color = 'white';

var isWished = false;

const wish = (itemData) => {

    isWished = !isWished;

    if(isWished)
    {
        color = 'red';
        console.log(itemData.propID+" is added to wishlist");
    }
    else {
        color = 'white';
        console.log(itemData.propID+" is removed from wishlist");
    }



}


const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#4263ec",  elevation: 0,
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf:'center'
        },
};



const MainStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title : 'Housing',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <View style={{marginLeft: 10}}>
                <Icon.Button
                  name="ios-menu"
                  size={25}
                  color='#fff'
                  backgroundColor='#4263ec'
                  onPress={() => navigation.openDrawer()}
                />
              </View>
            ),
            headerRight: () => (
              <View style={{flexDirection: 'row', marginRight: 10}}>
                <Icon.Button
                  name="ios-search"
                  size={25}
                  color='#fff'
                  backgroundColor='#4263ec'
                  onPress={() => navigation.navigate('Search')}
                />

              </View>
            ),
          }}
        />
        <Stack.Screen
          name="CardListScreen"
          component={CardListScreen}
          options={({route}) => ({
            title: route.params.title,
            headerBackTitleVisible: false,
          headerTitleAlign: 'center',
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 10}}>
              <Icon.Button
                name="ios-search"
                size={25}
                color='#fff'
                backgroundColor='#4263ec'
                onPress={() => navigation.navigate('Search')}
              />

            </View>
          ),
          })}
        />
        <Stack.Screen
          name="CardDetails"
          component={CardDetails}
          options={({route}) => ({
            // title: route.params.title,
            headerBackTitleVisible: false,
            headerTitle: false,
            headerTransparent: true,
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headerRight: () => (
                <Heart itemData = {route.params.itemData} use='notWishlist'/>
             ),
          })}
        />


        <Stack.Screen name="Search" component={Search}

        options={({route}) => ({
          // title: route.params.title,
  headerTitleAlign: 'center',
        })}
        />
        <Stack.Screen name="SearchAmenities" component={SearchAmenities}

        options={({route}) => ({
          // title: route.params.title,
  headerTitleAlign: 'center',
        })}
        />

        <Stack.Screen name="SearchResults" component={SearchResults}

        options={({route}) => ({
          // title: route.params.title,
  headerTitleAlign: 'center',
        })}
        />
        <Stack.Screen name="MapViewScreen" component={MapViewScreen}

        options={({route}) => ({
headerTitleAlign: 'center',
        })}
        />
      </Stack.Navigator>
  );
}

const WishlistStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Wishlist" component={Wishlist}
      options={{

               headerTitleAlign: 'center',
               headerLeft: () => (
                 <View style={{marginLeft: 10}}>
                   <Icon.Button
                     name="ios-menu"
                     size={25}
                     color='#fff'
                     backgroundColor='#4263ec'
                     onPress={() => navigation.openDrawer()}
                   />
                 </View>
               ),
               headerRight: () => (
                 <View style={{flexDirection: 'row', marginRight: 10}}>
                   <Icon.Button
                     name="ios-search"
                     size={25}
                     color='#fff'
                     backgroundColor='#4263ec'
                     onPress={() => navigation.navigate('Search')}
                   />

                 </View>
               ),
           }}

      />
      <Stack.Screen
        name="CardDetails"
        component={CardDetails}
        options={({route}) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerRight: () => (
              <Heart itemData = {route.params.itemData} use='wishlist'/>
           ),
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
               headerLeft: () => (
                 <View style={{marginLeft: 10}}>
                   <Icon.Button
                     name="ios-menu"
                     size={25}
                     color='#fff'
                     backgroundColor='#4263ec'
                     onPress={() => navigation.openDrawer()}
                   />
                 </View>
               ),
               headerRight: () => (
                 <View style={{flexDirection: 'row', marginRight: 10}}>
                   <Icon.Button
                     name="ios-search"
                     size={25}
                     color='#fff'
                     backgroundColor='#4263ec'
                     onPress={() => navigation.navigate('Search')}
                   />

                 </View>
               ),

           }}
      />

      <Stack.Screen name="AddGeoLocation" component={AddGeoLocation}

      options={({route}) => ({
        // title: route.params.title,
headerTitleAlign: 'center',
      })}
      />

      <Stack.Screen name="AddAmenities" component={AddAmenities}

      options={({route}) => ({
        // title: route.params.title,
headerTitleAlign: 'center',
      })}
      />

      <Stack.Screen name="AddMultiImages" component={AddMultiImages}

      options={({route}) => ({
        // title: route.params.title,
headerTitleAlign: 'center',
      })}
      />

    </Stack.Navigator>
  );
}

const MyPropertyStackNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>

    <Stack.Screen name="MyProperty" component={MyProperty}
    options={{

             headerTitleAlign: 'center',
             headerLeft: () => (
               <View style={{marginLeft: 10}}>
                 <Icon.Button
                   name="ios-menu"
                   size={25}
                   color='#fff'
                   backgroundColor='#4263ec'
                   onPress={() => navigation.openDrawer()}
                 />
               </View>
             ),
             headerRight: () => (
               <View style={{flexDirection: 'row', marginRight: 10}}>
                 <Icon.Button
                   name="ios-search"
                   size={25}
                   color='#fff'
                   backgroundColor='#4263ec'
                   onPress={() => navigation.navigate('Search')}
                 />

               </View>
             ),

         }}

    />

    <Stack.Screen name="CardDetails" component={CardDetails}

    options={({route}) => ({
      // title: route.params.title,
      headerTitleAlign: 'center',
      headerBackTitleVisible: false,
      headerTitle: false,
      headerTransparent: true,
      headerTintColor: '#fff'
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
               headerLeft: () => (
                 <View style={{marginLeft: 10}}>
                   <Icon.Button
                     name="ios-menu"
                     size={25}
                     color='#fff'
                     backgroundColor='#4263ec'
                     onPress={() => navigation.openDrawer()}
                   />
                 </View>
               ),

               headerRight: () => (
                 <View style={{flexDirection: 'row', marginRight: 10}}>
                   <Icon.Button
                     name="ios-search"
                     size={25}
                     color='#fff'
                     backgroundColor='#4263ec'
                     onPress={() => navigation.navigate('Search')}
                   />

                 </View>
               ),
           }}

      />

      <Stack.Screen name="EditProfile" component={EditProfile}

      options={{

               headerTitleAlign: 'center',
               headerLeft: () => (
                 <View style={{marginLeft: 10}}>
                   <Icon.Button
                     name="ios-menu"
                     size={25}
                     color='#fff'
                     backgroundColor='#4263ec'
                     onPress={() => navigation.openDrawer()}
                   />
                 </View>
               ),

               headerRight: () => (
                 <View style={{flexDirection: 'row', marginRight: 10}}>
                   <Icon.Button
                     name="ios-search"
                     size={25}
                     color='#fff'
                     backgroundColor='#4263ec'
                     onPress={() => navigation.navigate('Search')}
                   />

                 </View>
               ),

           }}

      />

    </Stack.Navigator>
  );
}


export { MainStackNavigator, WishlistStackNavigator,AddPropertyStackNavigator,ProfileStackNavigator,MyPropertyStackNavigator };
