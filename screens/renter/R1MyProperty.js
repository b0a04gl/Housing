import React from 'react';

import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import Firebase from '../../firebaseConfig';
import Card from '../../components/Card';

export default class Wishlist extends React.Component {
  state = {
    myProperties: [],
    isLoading: false
  }

  renderRow = ({ item }) => {
    return (
                  <Card
                     itemData={item}
                     onPress={()=> this.props.navigation.navigate('CardDetails', {itemData: item,type:'NotMine'})}
                 />
    )
  }

  componentDidMount(){
    this.getData()
  }

  getData = () => {

this.setState({isLoading:true});

const user = Firebase.auth().currentUser;

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
              // x[index]['propID'] = key;
              //console.log(x[index]);
            }


this.setState({myProperties:x,isLoading:false});
          }
          else {
          this.setState({myProperties:x,isLoading:false});
          }
        });
      }

  }

  render() {
    // console.log("state :: "+this.state.myProperties);
    if(this.state.myProperties!=null && this.state.myProperties.length!=0)
    {
      return (
        <View style={{
            flex: 1,
            width: '90%',
            alignSelf: 'center'
          }}>
          <FlatList
            data={this.state.myProperties}
            renderItem={this.renderRow}
            refreshing={this.state.isLoading}
            onRefresh={this.getData}
            keyExtractor={(item) => item.propID}
          />
        </View>
      )
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
               }}>No properties in this {this.state.propSubtype} category</Text>
             </View>
           );
    }
  }
}
