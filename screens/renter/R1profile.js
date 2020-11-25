import React, { useContext } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Firebase from '../../firebaseConfig';
import {AuthContext} from '../../navigation/AuthProvider';
import FormButton from '../../components/FormButton';

const currentUser = Firebase.auth().currentUser;

const colors = {
  themeColor: "#4263ec",
  white: "#fff",
  background: "#f4f6fc",
  greyish: "#a4a4a4",
  tint: "#2b49c3"
};

const tasks = [

  {
    id:0,
    task: "Display name",
    icon: "account-tie",
    theme: "#008b8b",
    stamp: "The name appears in welcome note!"
  },
  {
        id:1,
    task: "Update Email",
    icon: "email",
    theme: "#008b8b",
    stamp: "The email account synced with app!"
  },
  {
        id:2,
    task: "Update Password",
    icon: "lock-alert",
    theme: "#008b8b",
    stamp: "The Password synced with app!"
  },
  {
        id:3,
    task: "Delete account",
    icon: "delete",
    theme: "#008b8b",
    stamp: "Delete the user account created!"
  },
];

function Task ({ task, icon, theme, stamp,navigation })  {



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
          onPress={() => {
  /* 1. Navigate to the Details route with params */
  navigation.navigate('EditProfile', {

            otherParam: ''+task,

          });




          
}}
        />

      </View>
    </View>
  );
};

export default function R1Profile(props) {

  const {user, logout} = useContext(AuthContext);
// const [initializing, setInitializing] = useState(user.);
const {navigation} = props;

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
              {user.displayName!=null ? "Hello,\n"+user.displayName : "Hello,\nAnonymous"}
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
              navigation = {navigation}
            />
          ))}
        </ScrollView>

    <View style = {styles.container}>

    <FormButton
      buttonTitle="Logout"
      onPress={() => logout()}
    />

    </View>
      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
  },

});
