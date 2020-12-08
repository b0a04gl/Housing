
import React, { useContext, useEffect, useRef } from "react";
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Firebase from '../../firebaseConfig';
import Card from '../../components/Card';
import FormButton from '../../components/FormButton';
const SearchResults = ({navigation,route}) => {

  const [myProperties, setMyProperties] = React.useState([]);
  const {results} = route.params;

console.log("<<<<<<<<<<<<<<<<<RESULTS>>>>>>>>>>>>>>>>>>>>>");

console.log(Object.keys(results));



  const user = Firebase.auth().currentUser;
    useEffect(() => {

        if(Object.keys(results).length!=0)
{
          var keys = Object.keys(results);

          var x = [];

          for(var i=0;i<Object.keys(results).length;i++)
          {
            // console.log(results[keys[i]]);
            x.push(results[keys[i]]);
          }

          setMyProperties(x);
        }

        else {
          setMyProperties(null);
        }




    }, []);


    const renderItem = ({item}) => {


        return (
            <Card
                itemData={item}
                onPress={()=> navigation.navigate('CardDetails', {itemData: item,type:'NotMine'})}
            />
        );
    };

    if(myProperties!=null && myProperties.length!=0)
    {
      return (
        <View style={styles.container}>
        <View style={{padding:16}}>
       <FormButton
         buttonTitle="MAP VIEW"
         onPress={() => {navigation.navigate("MapViewScreen",{data: myProperties})}}
       />
       </View>
          <FlatList
              data={myProperties}
              renderItem={renderItem}
              keyExtractor={item => item.propID}
          />
        </View>
      );
    }
    else {
      return (
        <View style={{
          backgroundColor: '#f9fafd',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20
        }}>
          <Text style={{
            fontSize: 20,
            color: '#333333'
          }}>No properties match</Text>
        </View>
      );
    }
};

export default SearchResults;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignSelf: 'center'
  },
});
