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


    const route = this.props.route;

    const propSubtype = route.params.title;



this.setState({propSubtype:propSubtype , isLoading:true});

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
      // console.log(useruids[i]);
      var ref = Firebase.database().ref("/properties/"+useruids[i]);
      var query = ref.orderByChild("propSubtype").equalTo(propSubtype);
      query.once("value", (data) => {

          // console.log(data.val());
          if (data.val()) {
            var temp = data.val();
            var keys = Object.keys(temp);
            var x = [];
            for (var index = 0; index < keys.length; index++) {
              var key = keys[index];

              required.push(temp[key]);

            };
          }
        });
    }

    if(required!=null)
    {
      this.setState({myProperties:required,isLoading:false});


    }
    else {
            this.setState({myProperties:required,isLoading:false});
    }


  }

  render() {





    console.log("state :: "+this.state.myProperties);
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

// import React, { useContext, useEffect, useRef } from "react";
// import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
// import Firebase from '../../firebaseConfig';
// import Card from '../../components/Card';
//
// const CardListScreen = ({navigation,route}) => {
//
// const propSubtype = route.params.title;
//
// // console.log("propSubtype>>>>>>>>>>>>>>>"+propSubtype)
//
//   const [myProperties, setMyProperties] = React.useState([]);
//   const user = Firebase.auth().currentUser;
//     useEffect(() => {
//
//
//       let allusers = Firebase.database().ref('/properties');
//       var useruids = [];
//       if (allusers) {
//         allusers.on('value', (data) => {
//
//           // console.log(data.val());
//           if (data.val()) {
//             var temp = data.val();
//             var keys = Object.keys(temp);
//             useruids = keys;
//             }
//           });
// }
//
// var required = [];
//
// for(var i=0;i<useruids.length;i++)
// {
//   console.log(useruids[i]);
//   var ref = Firebase.database().ref("/properties/"+useruids[i]);
//   var query = ref.orderByChild("propSubtype").equalTo(propSubtype);
//   query.once("value", (data) => {
//
//       // console.log(data.val());
//       if (data.val()) {
//         var temp = data.val();
//         var keys = Object.keys(temp);
//         var x = [];
//         for (var index = 0; index < keys.length; index++) {
//           var key = keys[index];
//
//           required.push(temp[key]);
//
//           console.log(x[index]);
//         };
//       }
//     });
// }
//
// if(required!=null)
// {
//   setMyProperties(required);
//   // console.log(required[0]);
//
// }
// else {
//   setMyProperties([]);
//
// }
//
//     }, []);
//
//
//     const renderItem = ({item}) => {
//
//
//         return (
//             <Card
//                 itemData={item}
//                 onPress={()=> navigation.navigate('CardDetails', {itemData: item,type:'NotMine'})}
//             />
//         );
//     };
//
//     if(myProperties!=null && myProperties.length!=0)
//     {
//       return (
//         <View style={styles.container}>
//           <FlatList
//               data={myProperties}
//               renderItem={renderItem}
//               keyExtractor={item => item.propID}
//           />
//         </View>
//       );
//     }
//     else {
//       return (
//         <View style={{
//           backgroundColor: '#f9fafd',
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: 20
//         }}>
//           <Text style={{
//             fontSize: 20,
//             color: '#333333'
//           }}>No properties in this {propSubtype} category</Text>
//         </View>
//       );
//     }
// };
//
// export default CardListScreen;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     width: '90%',
//     alignSelf: 'center'
//   },
// });
