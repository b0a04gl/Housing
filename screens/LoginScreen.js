import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';

import {
 Dropdown }
 from 'react-native-material-dropdown';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState();
  const {login} = useContext(AuthContext);


  // const signIn = async () => {
  //     try {
  //       const result = await Expo.Google.logInAsync({
  //         androidClientId:
  //           "291292229085-isrndrekqne9odbh9fhehosbd78spkhu.apps.googleusercontent.com",
  //         //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
  //         scopes: ["profile", "email"]
  //       })
  //
  //       if (result.type === "success") {
  //         this.setState({
  //
  //           // signedIn: true,
  //           // name: result.user.name,
  //           // photoUrl: result.user.photoUrl
  //         })
  //       } else {
  //         console.log("cancelled")
  //       }
  //     } catch (e) {
  //       console.log("error", e)
  //     }
  //   }

  let data = [{
       value: 'Rentee',
     }, {
       value: 'Renter',
     }, {
       value: 'Admin',
     }];

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/house1.jpg')}
        style={styles.logo}
      />
      <Text style={styles.text}>Housing App</Text>

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
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />


    <View style={styles.container2}>
    <Dropdown
        label='Which User are you?'
        data={data}
        onChangeText={(userType) => setUserType(userType)}
      />
    </View>




      <FormButton
        buttonTitle="Sign In"
        onPress={() => login(email, password,userType)}
      />



      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>


      <SocialButton
        buttonTitle="Sign In with Google"
        btnType="google"
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={() => {}}
      />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>



    </View>
  );
};

export default LoginScreen;

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
  logo: {
    height: 150,
    width: 150,
    marginTop:40,
    resizeMode: 'cover',
  },
  text: {
    // fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',

  },
});

//
// <View style={styles.container2}>
// <Dropdown
//   label='Favorite Fruit'
//   data={data}
// />
// </View>
