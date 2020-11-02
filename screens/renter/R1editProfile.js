import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';
import SocialButton from '../../components/SocialButton';
import Firebase from '../../firebaseConfig';
import {AuthContext} from '../../navigation/AuthProvider';
import Toast from 'react-native-simple-toast';
import {
  Dropdown }
  from 'react-native-material-dropdown';

const SignupScreen = ({navigation,route}) => {

  const {user,logout} = useContext(AuthContext);


  const [email, setEmail] = useState(user.email);
  const [newEmail, setNewEmail] = useState('Enter your new email Id');

  const [dname, setDname] = user.displayName==null? useState('Enter your Display Name'):useState(user.displayName);


  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const [userType, setUserType] = useState(null);

const {  otherParam } = route.params;

  const updateEmail=(email,newEmail)=>{

    user.updateEmail(newEmail).then(function() {
      // Update successful.

      console.log(newEmail);

      Toast.show('New Email id has been updated 👋', Toast.SHORT, [
'UIAlertController',
]);

      navigation.navigate('Profile');



    }).catch(function(error) {
      // An error happened.
      console.log("error occured");
    });

}

  const updatePassword=(password,confirmPassword)=>{

    Firebase.auth().sendPasswordResetEmail(user.email).then(function() {

      Toast.show('Password Reset mail has been sent 👋', Toast.SHORT, [
'UIAlertController',
]);



  logout();
}).catch(function(error) {
  // An error happened.
});


  }

  const confirmDname=(dname)=>{
    user.updateProfile({
      displayName: dname,
      photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function() {

  //

      console.log("updated dname..."+user.displayName);

      Toast.show('Display name updated 👋', Toast.SHORT, [
'UIAlertController',
]);
  navigation.navigate('Profile');
      }).catch(function(error) {
      // An error happened.
      });

  }
  const deleteAcc=()=>{
    user.delete().then(function() {
      // User deleted.
    }).catch(function(error) {
      // An error happened.
    });
}



  if(otherParam=='Update Email')
  {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{otherParam}</Text>



        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          labelValue={newEmail}
          onChangeText={(userEmail) => setNewEmail(userEmail)}
          placeholderText="Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />



        <FormButton
          buttonTitle="Update"
          onPress={() => updateEmail(email,newEmail)}
        />



      </View>
    );
  }
  else if(otherParam=='Display name'){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{otherParam}</Text>


        <FormInput
          labelValue={dname}
          onChangeText={(dname) => setDname(dname)}
          placeholderText="Display Name"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />




        <FormButton
          buttonTitle="Confirm"
          onPress={() => confirmDname(dname)}
        />


      </View>
    );
  }
  else if(otherParam=='Delete account'){
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{otherParam}</Text>


        <FormButton
          buttonTitle="Confirm to Delete account"
          onPress={() => deleteAcc()}
        />



      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{otherParam}</Text>


        <FormButton
          buttonTitle="Send password reset mail"
          onPress={() => updatePassword(password,confirmPassword)}
        />



      </View>
    );
  }
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container2: {
    backgroundColor: '#f9fafd',
    flex: -1,
    justifyContent: 'center',
    width:300,
    height:50,
    padding:10,
    marginBottom:30


  },
  text: {

    fontSize: 28,
    marginTop : -50,
    marginBottom: 30,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',

  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',

    color: 'grey',
  },
});
