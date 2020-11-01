// import React, { Component } from 'react'
// import {
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   View,
// } from 'react-native'
//
// class R1profile extends Component {
//   state = {
//     count: 0
//   }
//
//   onPress = () => {
//     this.setState({
//       count: this.state.count + 1
//     })
//   }
//
//  render() {
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity
//          style={styles.button}
//          onPress={this.onPress}
//         >
//          <Text>Profile</Text>
//         </TouchableOpacity>
//         <View>
//           <Text>
//             You clicked { this.state.count } times
//           </Text>
//         </View>
//       </View>
//     )
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#DDDDDD',
//     padding: 10,
//     marginBottom: 10
//   }
// })
//
// export default R1profile;



import * as React from "react";
import { View, Text, StatusBar } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const colors = {
  themeColor: "#4263ec",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3"
};

const tasks = [

  {
    task: "Display name",
    icon: "account-tie",
    theme: "#008b8b",
    stamp: "The name appears in welcome note!"
  },
  {
    task: "Update Email",
    icon: "email",
    theme: "#008b8b",
    stamp: "The email account synced with app!"
  },
  {
    task: "Update Password",
    icon: "lock-alert",
    theme: "#008b8b",
    stamp: "The Password synced with app!"
  },
  {
    task: "Delete account",
    icon: "delete",
    theme: "#008b8b",
    stamp: "Delete the user account created!"
  },
];

const Task = ({ task, icon, theme, stamp }) => {
  return (
    <View
      style={{
        backgroundColor: colors.white,
        flexDirection: "row",
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialCommunityIcons
          name={icon}
          size={30}
          style={{ color: theme, marginRight: 5 }}
        />
        <View>
          <Text style={{ fontSize: 16 }}>{task}</Text>
          <Text style={{ color: colors.greyish }}>{stamp}</Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <MaterialCommunityIcons
          name="pencil"
          size={30}
          style={{ color: theme }}
        />

      </View>
    </View>
  );
};

export default class Tasks extends React.Component {


  render() {

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.themeColor
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor={colors.themeColor} />
        <View style={{ backgroundColor: colors.themeColor }}>

          <View style={{ padding: 16 }}>
            <Text style={{ color: colors.white, fontSize: 30 }}>
              {"Hello,\nBenjamin"}
            </Text>

          </View>
        </View>

        <View
          style={{
            padding: 20,
            flexDirection: "row",
            backgroundColor: colors.background,
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: 20
          }}
        >
          <Text style={{ fontSize: 24 }}>Edit Profile</Text>
           <AntDesign name="user" size={30} style={{ color: colors.themeColor }} />
        </View>

        <ScrollView
          style={{
            backgroundColor: colors.background
          }}
        >
          {tasks.map(task => (
            <Task
              task={task.task}
              icon={task.icon}
              theme={task.theme}
              stamp={task.stamp}
            />
          ))}
        </ScrollView>
      </View>
    );

   }

}
