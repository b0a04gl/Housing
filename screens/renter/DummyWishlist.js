
import React, { useContext, useEffect, useRef } from "react";
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Firebase from '../../firebaseConfig';
import Card from '../../components/Card';
import Wishlist from './Wishlist';
import FormButton from '../../components/FormButton';



const DummyWishlist = ({navigation,route}) => {

const propSubtype = 'Villa';

// console.log("propSubtype>>>>>>>>>>>>>>>"+propSubtype)

  const [myProperties, setMyProperties] = React.useState([]);
  const user = Firebase.auth().currentUser;

    useEffect(() => {


      let allusers = Firebase.database().ref('/properties');
      var useruids = [];
      if (allusers) {
        allusers.on('value', (data) => {

          // console.log(data.val());
          if (data.val()) {
            var temp = data.val();
            var keys = Object.keys(temp);
            useruids = keys;
            }
          });
    }

var required = [];

for(var i=0;i<useruids.length;i++)
{
  console.log(useruids[i]);
  var ref = Firebase.database().ref("/properties/"+useruids[i]);
  var query = ref.orderByChild("isWished").equalTo(true);
  query.once("value", (data) => {

      // console.log(data.val());
      if (data.val()) {
        var temp = data.val();
        var keys = Object.keys(temp);
        var x = [];
        for (var index = 0; index < keys.length; index++) {
          var key = keys[index];

          required.push(temp[key]);

          console.log(x[index]);
        };
      }
    });
}

if(required!=null)
{
  setMyProperties(required);
  // console.log(required[0]);

}
else {
  setMyProperties([]);

}

    }, []);


  return(
    <View style={styles.container}>
      <Text style={{
        fontSize: 20,
        color: '#333333'
      }}>Welcome </Text>
      <FormButton buttonTitle='Refresh' onPress={() => {navigation.navigate("Wishlist",{data: myProperties})}} />
    </View>
  );
};

export default DummyWishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
});
