import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import { ProfileStackNavigator,AddPropertyStackNavigator ,WishlistStackNavigator,MyPropertyStackNavigator} from "./stacknav";
import BottomTabNavigator from "./tabnav";
import Search from './Search';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (

    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />

      <Drawer.Screen name="Profile" component={ProfileStackNavigator} />
      <Drawer.Screen name="Wishlist" component={WishlistStackNavigator} />
      <Drawer.Screen name="Add Property" component={AddPropertyStackNavigator} />
      <Drawer.Screen name="My Property" component={MyPropertyStackNavigator} />
    </Drawer.Navigator>

  );
}

export default DrawerNavigator;
