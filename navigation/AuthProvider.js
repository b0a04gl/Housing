import React, {createContext, useState} from 'react';
// import auth from '@react-native-firebase/auth';
import Firebase from '../firebaseConfig';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,

        login: async (email, password,userType) => {
          try {
            Firebase.auth().signInWithEmailAndPassword(email, password);

          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password,userType) => {
          try {
            Firebase.auth().createUserWithEmailAndPassword(email, password)
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            Firebase.auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
