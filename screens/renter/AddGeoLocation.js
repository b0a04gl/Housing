import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import React, {Component  ,Fragment} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View, ScrollView,Button,Image,TextInput
} from 'react-native'


import FormButton from '../../components/FormButton';


class AddGeoLocation extends Component {


  constructor(props)
  {
    super(props);

    this.state={

markers: [],
      region: {
     latitude: 28.644800,
     longitude: 77.216721,
     latitudeDelta: 0.1,
     longitudeDelta: 0.1
   },

    }



  }



  render(){
    return (
      <View style={styles.container}>

      <Text style={{ color: '#000', fontSize: 17,alignSelf:'center' ,padding:10}}>
           Press any place in the map to mark the location
      </Text>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        region={this.state.region}
        onPress={(e) => this.setState({ markers: [...this.state.markers, { latlng: e.nativeEvent.coordinate }], region:{
          latitude: e.nativeEvent.coordinate.latitude,
          longitude: e.nativeEvent.coordinate.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        } })}>
        {
            this.state.markers.map((marker, i) => (
                <MapView.Marker key={i} coordinate={marker.latlng} />
            ))
        }
</MapView>

<View style={{flexDirection: 'row'}}>

<View style={{padding:16,
width: '50%'}}>
<FormButton
  buttonTitle="Remove Markers"
  onPress={() => {
      this.setState({markers:[]});
}}
/>
</View>

<View style={{padding:16,
width: '50%'}}>
<FormButton
  buttonTitle="Done"
  onPress={() => {
/* 1. Navigate to the Details route with params */
    this.props.navigation.navigate('AddProperty', {

    smarkers: this.state.markers,

  });
}}
/>
</View>

  </View>
      </View>
    );
  }
}

export default AddGeoLocation;

const styles = StyleSheet.create({
  container: {

    flex: 1,

      },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});

/*
<Text style={{ color: '#000', fontSize: 17,alignSelf:'center' ,padding:10}}>
     Press any place in the map to mark the location
</Text>
    <View style={[styles.section, {height: 250}]}>
          <MapView style={{flex: 1}} provider={PROVIDER_GOOGLE} region={this.state.region}
onPress={(e) => this.setState({ markers: [...this.state.markers, { latlng: e.nativeEvent.coordinate }] })}>
{
    this.state.markers.map((marker, i) => (
        <MapView.Marker key={i} coordinate={marker.latlng} />
    ))
}
</MapView>
    </View>

*/
