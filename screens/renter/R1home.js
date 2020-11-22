
import React, { useContext, useEffect, useRef } from "react";
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Firebase from '../../firebaseConfig';
import Card from '../../components/Card';

const CardListScreen = ({navigation}) => {

  const [myProperties, setMyProperties] = React.useState([]);
  const user = Firebase.auth().currentUser;
    useEffect(() => {
      let dbRef = Firebase.database().ref('/properties/'+user.uid);
      if (dbRef) {
        dbRef.on('value', (data) => {

          // console.log(data.val());
          if (data.val()) {
            var temp = data.val();
            var keys = Object.keys(temp);
            var x = [];
            for (var index = 0; index < keys.length; index++) {
              var key = keys[index];

              x.push(temp[key]);
              x[index]['propID'] = key;
              //console.log(x[index]);
            }
            setMyProperties(x);


          }
          else {
            setMyProperties([]);
          }
        });
      }

  
    }, []);


    const renderItem = ({item}) => {


        return (
            <Card
                itemData={item}
                onPress={()=> navigation.navigate('CardDetails', {itemData: item})}
            />
        );
    };

    return (
      <View style={styles.container}>
        <FlatList
            data={myProperties}
            renderItem={renderItem}
            keyExtractor={item => item.id}
        />
      </View>
    );
};

export default CardListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
});
