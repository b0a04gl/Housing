import React, { useContext,useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Firebase from '../firebaseConfig';



function Heart(props) {

const itemData = props.itemData;
const use = props.use;


const [isWished,setIsWished] = React.useState(itemData.isWished);
const [isFirst,setIsFirst] = React.useState(true);
const [key,setKey] = React.useState(null);

let path = [];
path['absPath'] = "/properties/"+itemData.owner+"/"+itemData.propID;

useEffect(() => {



});

const handle = () => {




  setIsWished(!isWished);

  if(!isWished)
  {
    console.log(itemData.propID+" is wished");

    itemData.isWished = true;

    Firebase.database().ref(path['absPath']).set(itemData).then(() => {

    }).catch((error) => {
        console.log(error);
    });


  }
  else {
    console.log(itemData.propID+" is unwished");
    itemData.isWished = false;

    Firebase.database().ref(path['absPath']).set(itemData).then(() => {

    }).catch((error) => {
        console.log(error);
    });

  }


}

console.log("key>>>>>>"+key);

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
