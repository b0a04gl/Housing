import React, { useContext,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Firebase from '../firebaseConfig';



function Heart(props) {

const itemData = props.itemData;
const use = props.use;

var currentWishlist=[];

const [isWished,setIsWished] = React.useState(false);
const [isFirst,setIsFirst] = React.useState(true);
const [key,setKey] = React.useState(null);

const user = Firebase.auth().currentUser;

useEffect(() => {


  Firebase.database().ref('/users/renters/'+user.uid+"/wishlist").on('value', (data) => {

    // console.log(data.val());
    if (data.val()) {
      var temp = data.val();
      var keys = Object.keys(temp);
      // console.log("keys"+keys);
      // console.log("current propID"+itemData.propID);

      currentWishlist = keys;

  // console.log("reuslts : "+currentWishlist.includes(itemData.propID));

  setIsWished(currentWishlist.includes(itemData.propID));

}

});


},[]);







let path = [];
path['absPath'] = "/properties/"+itemData.owner+"/"+itemData.propID;

const handle = () => {




  setIsWished(!isWished);

  if(!isWished)
  {
    // console.log(itemData.propID+" is wished");


  itemData.isWished = true;



    Firebase.database().ref('/users/renters/'+user.uid+"/wishlist/"+itemData.propID).set(itemData).then(() => {

    }).catch((error) => {
        console.log(error);
    });




  }
  else {
    // console.log(itemData.propID+" is unwished");
    itemData.isWished = false;

    Firebase.database().ref('/users/renters/'+user.uid+"/wishlist/"+itemData.propID).remove().then(() => {

    }).catch((error) => {
        console.log(error);
    });
  }


}

// console.log("key>>>>>>"+key);

  return (
    <View style={{flexDirection: 'row', marginRight: 10}}>


        <MaterialCommunityIcons style={{marginRight: 5}} name="heart" size={30} color={isWished?'red':'white'} onPress={() => handle()} />



    </View>
  );
}

export default Heart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});
