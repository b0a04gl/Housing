import React, { Component  ,Fragment} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View, ScrollView,Button,Image,TextInput
} from 'react-native'
import { ButtonGroup } from 'react-native-elements';

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import NumericInput from 'react-native-numeric-input'
import Constants from 'expo-constants';
import SearchableDropdown from 'react-native-searchable-dropdown';
import FormButton from '../../components/FormButton';
import Firebase from '../../firebaseConfig';
// import { ImagePicker, Permissions } from 'expo';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';

import Toast from 'react-native-simple-toast';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const component1 = () => <Text>Residential</Text>
const component2 = () => <Text>Commercial</Text>

const component3= () => <Text>Sell</Text>
const component4= () => <Text>Lease</Text>
const component5 = () => <Text>Rent</Text>

const component6= () => <Text>Yearly</Text>
const component7= () => <Text>Monthly</Text>
const component8 = () => <Text>Weekly</Text>

const City = [
  {
      id:1,
      name : 'Chennai',
      taluks: [

        {
          id: 1,
          name : 'Adayar',
          latitude: 13.003387,
          longitude:80.255043
        },
        {
          id: 2,
          name : 'Ambattur',
          latitude: 13.1143167,
          longitude:80.1480551
        },
        {
          id: 3,
          name : 'Egmore',
          latitude: 13.073226,
          longitude:80.260918
        },
        {
          id: 4,
          name : 'Guindy',
          latitude: 13.010236,
          longitude:80.215652
        },
        {
          id:5,
          name : 'Tambaram',
          latitude:12.922915,
          longitude:80.127457
        },
      ]
  },


  {
      id:2,
      name : 'Trichy',
      taluks: [
        {
          id:1,
          name : 'Lalgudi',
          latitude:10.879162,
          longitude:78.812485
        },
        {
          id: 2,
          name : 'Manachanallur',
          latitude: 10.904663048,
          longitude:78.701330528
        },
        {
          id: 3,
          name : 'Musiri',
          latitude:10.95299 ,
          longitude:78.44427
        },
        {
          id: 4,
          name : 'SriRangam',
          latitude:  10.85603,
          longitude:78.696597
        },
        {
          id: 5,
          name : 'Puvalur',
          latitude: 10.896694,
          longitude:78.83029
        }
      ]
  },

];




class R1add extends Component {




  state = {
    count: 0
  }

  constructor (props) {
    super(props);
    this.state = {
      taluksData:[],
      action:null,
      image: null,
      imageURL:null,
      frequency:null,
      propType: 2,
      propSubtype: null,
      propPrice:0,
      propArea:0,
      bedCount:0,
      bathroomCount:0,
      selectedItems1: [],
      selectedItems2: [],
      region: {
     latitude: 13.067439,
     longitude: 80.237617,
     latitudeDelta: 0.1,
     longitudeDelta: 0.1
   },
   markers: [],
propDescription:null,
height:30,
contactNo:null,
mailId : null,
whatsappNo : null,
      user: Firebase.auth().currentUser
    }

    this.updateIndex = this.updateIndex.bind(this)
    this.saveToDB = this.saveToDB.bind(this)
    this.onClear = this.onClear.bind(this)
  }

  selectPicture = async () => {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
      aspect: [4, 3],
      });
      if (!cancelled)
    {
      Toast.show('Wait for some seconds for uploading image 👋', Toast.SHORT, [
    'UIAlertController',
    ]);
       this.setState({ image: uri });

       const imageName = uri.substring(uri.lastIndexOf('/') + 1);
       const response = await fetch(uri);
       const blob = await response.blob();
       Firebase
         .storage()
         .ref().child("images/"+imageName)
         .put(blob)
         .then((snapshot) => {
           console.log(`${imageName} has been successfully uploaded.`);

           Toast.show('Image uploaded successfully 👋', Toast.SHORT, [
     'UIAlertController',
     ]);
           snapshot.ref.getDownloadURL().then((url) => {
             this.setState({
               imageURL: url,
             });

           });
         })
         .catch((e) => console.log('uploading image error => ', e));

    }

    };

    takePicture = async ({}) => {
      await Permissions.askAsync(Permissions.CAMERA);



      const { cancelled, uri } = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
      aspect: [4, 3],
      });
      if (!cancelled)
    {
       this.setState({ image: uri });

       const imageName = uri.substring(uri.lastIndexOf('/') + 1);
       const response = await fetch(uri);
       const blob = await response.blob();
       Firebase
         .storage()
         .ref().child("images/"+imageName)
         .put(blob)
         .then((snapshot) => {
           console.log(`${imageName} has been successfully uploaded.`);
           snapshot.ref.getDownloadURL().then((url) => {
             this.setState({
               imageURL: url,
             });


           });
         })
         .catch((e) => console.log('uploading image error => ', e));

    }
    };


  updateIndex (selectedIndex) {

    // console.log(selectedIndex);

    this.setState({propType:selectedIndex})
  }

saveToDB = () =>{


  const route = this.props.route;





  if(route.params!=null && route.params.smarkers!=null)
  {
  const {  smarkers, amenities, gallery} = route.params;

// console.log(amenities);

// console.log("smarkers????????????////"+this.state.markers[0].latlng.latitude);

var propID = Firebase.database().ref('/properties/'+this.state.user.uid).push().getKey();


    let locations=[];

    for(var i=0;i<this.state.selectedItems2.length;i++)
        locations.push(this.state.selectedItems2[i].name);

    var today  = new Date();

    // console.log(today.toLocaleDateString("en-US")); // 9/17/2016

    let propData = [];

    propData['propID'] = propID;
    propData['action'] = this.state.action==0?'Sell':(this.state.action==1?'Lease':'Rent');
    propData['date'] = today.toLocaleDateString("en-US");
    propData['locations'] = locations;
    propData['propType'] = this.state.propType==0?'Residential' : 'Commercial';
    propData['propSubtype'] = this.state.propSubtype;
    propData['propPrice'] = this.state.propPrice;
    propData['propArea'] = this.state.propArea;
    propData['bedCount'] = this.state.bedCount;
    propData['bathroomCount'] = this.state.bathroomCount;
    propData['imageURL'] = this.state.imageURL;

    propData['markers'] = smarkers;
    propData['propDescription'] = this.state.propDescription;
    propData['frequency'] = this.state.frequency==0?'Yearly':(this.state.frequency==1?'Monthly' : 'Weekly');
    propData['amenities'] = amenities;
    propData['contactNo'] = this.state.contactNo;
    propData['mailId'] = this.state.mailId;
    propData['whatsappNo'] = this.state.whatsappNo;
    // console.log(propData['location']);
    propData['gallery'] = gallery;
    propData['owner'] = this.state.user.uid;

    Firebase.database().ref('/properties/'+this.state.user.uid+'/'+propID).set(propData).then(() => {





    }).catch((error) => {
        console.log(error);
    });





    this.props.navigation.navigate('Home');

  }
}


componentDidUpdate() {

  }


onClear = () => {
  this.setState ({
    action:null,
    image: null,
    imageURL:null,
    frequency:null,
    propType: 2,
    propSubtype: null,
    propPrice:0,
    propArea:0,
    bedCount:0,
    bathroomCount:0,
    selectedItems: [],
    region: {
   latitude: 13.067439,
   longitude: 80.237617,
   latitudeDelta: 0.1,
   longitudeDelta: 0.1
 },
 markers: [],
propDescription:null,
height:30,
contactNo:null,
mailId : null,
whatsappNo : null,
user: Firebase.auth().currentUser
  });

}



  render () {
    const buttons = [{ element: component1 }, { element: component2 }]
      const buttons2 = [{ element: component3 }, { element: component4 }, { element: component5 }]
      const buttons3 = [{ element: component6 }, { element: component7 }, { element: component8 }]
    // console.log(this.state.user.uid);
    const navigation = this.props.navigation;



    return (

      <ScrollView keyboardShouldPersistTaps="handled">
      <View style={{padding:36}}>
     <FormButton
       buttonTitle="CLEAR"
       onPress={() => {
         this.setState ({
           action:null,
           image: null,
           imageURL:null,
           frequency:null,
           propType: 2,
           propSubtype: null,
           propPrice:0,
           propArea:0,
           bedCount:0,
           bathroomCount:0,
           selectedItems: [],
           region: {
          latitude: 13.067439,
          longitude: 80.237617,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1
        },
        markers: [],
       propDescription:null,
       height:30,
       contactNo:null,
       mailId : null,
       whatsappNo : null,
       user: Firebase.auth().currentUser
         })
       }}
     />
     </View>
      <View style={{ padding: 16 }}>
        <Text style={{ color: '#000', fontSize: 20 }}>
        City
        </Text>

      </View>
      <Fragment>
                {/* Multi */}
                <SearchableDropdown
                  multi={true}
                  selectedItems={this.state.selectedItems1}
                  onItemSelect={(item) => {
                    var items = this.state.selectedItems1;
                    items=[];
                    items.push(item)

                    this.setState({ selectedItems1: items, taluksData : item.taluks });
                  }}
                  containerStyle={{ padding: 5 }}
                  onRemoveItem={(item, index) => {
                    const items = this.state.selectedItems1.filter((sitem) => sitem.id !== item.id);
                    this.setState({ selectedItems1: items });
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{ color: '#222' }}
                  itemsContainerStyle={{ maxHeight: 140 }}
                  items={City}
                  defaultIndex={0}
                  chip={true}
                  resetValue={true}
                  textInputProps={
                    {
                      placeholder: "Select the location",
                      underlineColorAndroid: "transparent",
                      style: {
                          padding: 12,
                          borderWidth: 1,
                          borderColor: '#ccc',
                          borderRadius: 25,
                      },
                      onTextChange: {}
                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }
                />

      </Fragment>



      <View style={{ padding: 16 }}>
        <Text style={{ color: '#000', fontSize: 20 }}>
          Taluks
        </Text>

      </View>
      <Fragment>
                {/* Multi */}
                <SearchableDropdown
                  multi={true}
                  selectedItems={this.state.selectedItems2}
                  onItemSelect={(item) => {
                    var items = this.state.selectedItems2;
                    items=[];
                    items.push(item)
                    this.setState({ selectedItems2: items });
                  }}
                  containerStyle={{ padding: 5 }}
                  onRemoveItem={(item, index) => {
                    const items = this.state.selectedItems2.filter((sitem) => sitem.id !== item.id);
                    this.setState({ selectedItems2: items });
                  }}
                  itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                  }}
                  itemTextStyle={{ color: '#222' }}
                  itemsContainerStyle={{ maxHeight: 140 }}
                  items={this.state.taluksData}
                  defaultIndex={0}
                  chip={true}
                resetValue={true}
                  textInputProps={
                    {
                      placeholder: "Select the location",
                      underlineColorAndroid: "transparent",
                      style: {
                          padding: 15,
                          borderWidth: 1,
                          borderColor: '#ccc',
                          borderRadius: 25,
                      },
                      onTextChange: {}
                    }
                  }
                  listProps={
                    {
                      nestedScrollEnabled: true,
                    }
                  }
                />

      </Fragment>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          padding:20,
        }}
      />










      <View style={{ padding: 16 }}>
        <Text style={{ color: '#000', fontSize: 20 }}>
          Action
        </Text>

      </View>
      <View style={{padding:16}}>
      <ButtonGroup
        onPress={  (selectedIndex)=>{ this.setState({action:selectedIndex})}}
        selectedIndex={this.state.action}
        buttons={buttons2}
        containerStyle={{height: 40}} />
        </View>


        {this.state.action!='0' && this.state.action!=null ?

            <View>
                <View
                style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                }}
              />
              <View style={{ padding: 16 }}>
                <Text style={{ color: '#000', fontSize: 20 }}>
                  Frequency
                </Text>

              </View>
              <View style={{padding:16}}>
              <ButtonGroup
                onPress={  (selectedIndex)=>{ this.setState({frequency:selectedIndex})}}
                selectedIndex={this.state.frequency}
                buttons={buttons3}
                containerStyle={{height: 40}} />
                </View>
          </View>
        : null}





        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />

      <View style={{ padding: 16 }}>
        <Text style={{ color: '#000', fontSize: 20 }}>
          Property type
        </Text>

      </View>
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={this.state.propType
        }
        buttons={buttons}
        containerStyle={{height: 40}} />

        {this.state.propType == 0 ?


          <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={()=>{this.setState({propSubtype:"Apartment"})}}>
          <View style={styles.categoryIcon}>
          <MaterialCommunityIcons
            name="home-group"
            size={35}
            color={this.state.propSubtype=='Apartment'? "#000" :"#FF6347" }
          />
          </View>
          <Text style={styles.categoryBtnTxt}>Apartment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={()=>{this.setState({propSubtype:"Villa"})}}
          >
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="home-outline"
              size={35}
              color={this.state.propSubtype=='Villa'? "#000" :"#FF6347" }
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Villa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={()=>{this.setState({propSubtype:"Hotel"})}}
          >
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={35}
              color={this.state.propSubtype=='Hotel'? "#000" :"#FF6347" }
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Hotel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={()=>{this.setState({propSubtype:"Building"})}}
          >
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="home-city-outline"
              size={35}
              color={this.state.propSubtype=='Building'? "#000" :"#FF6347" }
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Building</Text>
        </TouchableOpacity>

      </View>

          :

          <View style={styles.categoryContainer}>
                  <TouchableOpacity
                    style={styles.categoryBtn}
                    onPress={()=>{this.setState({propSubtype:"Office"})}}
                    >
                    <View style={styles.categoryIcon}>
                    <MaterialCommunityIcons
                      name="office-building"
                      size={35}
                      color={this.state.propSubtype=='Office'? "#000" :"#FF6347" }
                    />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Office</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.categoryBtn}
                    onPress={()=>{this.setState({propSubtype:"Shop"})}}
                    >
                    <View style={styles.categoryIcon}>
                      <MaterialCommunityIcons
                        name="cart-arrow-up"
                        size={35}
                        color={this.state.propSubtype=='Shop'? "#000" :"#FF6347" }
                      />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Shop</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryBtn}
onPress={()=>{this.setState({propSubtype:"Showroom"})}}
                  >
                    <View style={styles.categoryIcon}>
                      <MaterialCommunityIcons name="shopping-search" size={35} color={this.state.propSubtype=='Showroom'? "#000" :"#FF6347" } />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Showroom</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.categoryBtn} onPress={()=>{this.setState({propSubtype:"Warehouse"})}}>
                    <View style={styles.categoryIcon}>
                      <MaterialCommunityIcons name="warehouse" size={35} color={this.state.propSubtype=='Warehouse'? "#000" :"#FF6347" } />
                    </View>
                    <Text style={styles.categoryBtnTxt}>Warehouse</Text>
                  </TouchableOpacity>
                </View>





           }

           <View
             style={{
               borderBottomColor: 'black',
               borderBottomWidth: 1,
             }}
           />



           <View style={{ padding: 16 }}>
             <Text style={{ color: '#000', fontSize: 20 }}>
               Property Price
             </Text>
             <View style={{padding:10,alignSelf:'center'}}>
                        <NumericInput
                          value={this.state.propPrice}
                          onChange={value => {this.setState({propPrice:value})}}
                          onLimitReached={(isMax,msg) => {this.setState({propPrice:0})}}
                          totalWidth={180}
                          totalHeight={50}
                          iconSize={25}
                          step={500}

                          valueType='integer'
                          minValue={0}
                          maxValue={100000}
                            rounded='true'
                          textColor='#000'
                          iconStyle={{ color: 'white' }}
                          rightButtonBackgroundColor='#FF6347'
                          leftButtonBackgroundColor='#FF6347'/>
             </View>



           </View>

           <View
             style={{
               borderBottomColor: 'black',
               borderBottomWidth: 1,
             }}
           />


           <View style={{ padding: 16 }}>
             <Text style={{ color: '#000', fontSize: 20 }}>
               Property Area(Sq.ft)
             </Text>
             <View style={{padding:10,alignSelf:'center'}}>
                        <NumericInput
                          value={this.state.propArea}
                          onChange={value => {this.setState({propArea:value})}}
                          onLimitReached={(isMax,msg) => console.log(isMax,msg)}
                          totalWidth={180}
                          totalHeight={50}
                          iconSize={25}
                          step={10}

                          valueType='integer'
                          minValue={0}
                          maxValue={500}
                            rounded='true'
                          textColor='#000'
                          iconStyle={{ color: 'white' }}
                          rightButtonBackgroundColor='#FF6347'
                          leftButtonBackgroundColor='#FF6347'/>
             </View>



           </View>

           <View
             style={{
               borderBottomColor: 'black',
               borderBottomWidth: 1,
             }}
           />

<View style={{padding:16}}>
           <Text style={{ color: '#000', fontSize: 20 }}>
             Beds
           </Text>
<View style={{padding:10,alignSelf:'center'}}>
           <NumericInput
             value={this.state.bedCount}
             onChange={value => {this.setState({bedCount:value})}}
             onLimitReached={(isMax,msg) => console.log(isMax,msg)}
             totalWidth={180}
             totalHeight={50}
             iconSize={25}
             step={1}

             valueType='integer'
             minValue={0}
             maxValue={5}
               rounded='true'
             textColor='#000'
             iconStyle={{ color: 'white' }}
             rightButtonBackgroundColor='#FF6347'
             leftButtonBackgroundColor='#FF6347'/>
</View>
</View>


<View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>

<View style={{padding:16}}>
      <Text style={{ color: '#000', fontSize: 20 }}>
        Bathrooms
      </Text>
      <View style={{padding:10,alignSelf:'center'}}>
            <NumericInput
              value={this.state.bathroomCount}
              onChange={value => this.setState({bathroomCount:value})}
              onLimitReached={(isMax,msg) => console.log(isMax,msg)}
              totalWidth={180}
              totalHeight={50}
              iconSize={25}
              step={1}
              rounded='true'
              valueType='real'
              minValue={0}
              maxValue={5}
              textColor='#000'
              iconStyle={{ color: 'white' }}
              rightButtonBackgroundColor='#FF6347'
              leftButtonBackgroundColor='#FF6347'/>
      </View>
</View>

<View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>

  <View style={{padding:16, alignItems: 'center',
  justifyContent: 'center'}}>
      <Text style={{ color: '#000', fontSize: 20,padding:20}}>
        Description
      </Text>
      <View style={{borderWidth:1}}>
            <TextInput

                multiline={true}
                onChangeText={(text) => {
                    this.setState({ propDescription : text })
                }}
                onContentSizeChange={(event) => {
                    this.setState({ height: event.nativeEvent.contentSize.height })
                }}
                style={[styles.default, {height: Math.max(35, this.state.height),width:300}]}
                value={this.state.propDescription}
                placeholder='TYPE...'
              />
</View>
<TouchableOpacity style={styles.button} onPress={()=> {Toast.show('Description added successfully 👋', Toast.SHORT, [
'UIAlertController',
]);}}>
 <Text style={styles.text}>Done</Text>
 </TouchableOpacity>
</View>



           <View
             style={{
               borderBottomColor: 'black',
               borderBottomWidth: 1,
             }}
           />


           <View style={{padding:16, alignItems: 'center',
    justifyContent: 'center'}}>
                 <Text style={{ color: '#000', fontSize: 20,padding:30}}>
                  Header Image
                 </Text>

                 <Image style={styles.image} source={{ uri: this.state.image }} />
         <View style={styles.row}>

           <TouchableOpacity style={styles.button} onPress={this.selectPicture}>
            <Text style={styles.text}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={this.takePicture}>
             <Text style={styles.text}>Camera</Text>
             </TouchableOpacity>

         </View>
    </View>

    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      }}
    />


    <View style={{padding:16}}>
    <Text style={{ color: '#000', fontSize: 20 ,padding:10}}>
      Gallery Images
    </Text>

    <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('AddMultiImages')}}>
     <Text style={styles.text}>Add Multiple Images for Gallery</Text>
     </TouchableOpacity>
    </View>

    <View
      style={{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
      }}
    />


               <View
                 style={{
                   borderBottomColor: 'black',
                   borderBottomWidth: 1,
                 }}
               />

                 <View style={{padding:16}}>
                 <Text style={{ color: '#000', fontSize: 20 ,padding:10}}>
                   Geo Locations
                 </Text>

                 <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('AddGeoLocation',{region: {
                   latitude: this.state.selectedItems2[0].latitude,
                   longitude: this.state.selectedItems2[0].longitude,
                   latitudeDelta: 0.1,
                   longitudeDelta: 0.1
                 }})}}>
                  <Text style={styles.text}>Add Geo location</Text>
                  </TouchableOpacity>
                 </View>

                 <View
                   style={{
                     borderBottomColor: 'black',
                     borderBottomWidth: 1,
                   }}
                 />





                   <View style={{padding:16}}>
                   <Text style={{ color: '#000', fontSize: 20 ,padding:10}}>
                     Amenities / Features
                   </Text>

                   <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('AddAmenities',{type:'add'})}}>
                    <Text style={styles.text}>Add Amenities / Features</Text>
                    </TouchableOpacity>
                   </View>


                   <View
                     style={{
                       borderBottomColor: 'black',
                       borderBottomWidth: 1,
                     }}
                   />

                     <View style={{padding:16, alignItems: 'center',
                     justifyContent: 'center'}}>
                         <Text style={{ color: '#000', fontSize: 20,padding:20}}>
                           Contact Details
                         </Text>
                         <TextInput
                            value={this.state.contactNo}
                            onChangeText={
                              (cellNumber) => {this.setState({contactNo: cellNumber})}
                            }
                            placeholder={'Enter Contact Number Here'}
                            keyboardType="numeric"
                            style={styles.textInputStyle}
                          />

                          <TextInput
                             value={this.state.mailId}
                             onChangeText={
                               (mailId) => {this.setState({mailId: mailId})}
                             }
                             placeholder={'Enter Mail ID Here'}
                             style={styles.textInputStyle}
                           />

                           <TextInput
                              value={this.state.whatsappNo}
                              onChangeText={
                                (whatsappNo) => {this.setState({whatsappNo: whatsappNo})}
                              }
                              placeholder={'Enter WhatsApp Number Here'}
                              keyboardType="numeric"
                              style={styles.textInputStyle}
                            />

                   </View>


 <View style={{padding:16}}>
<FormButton
  buttonTitle="ADD PROPERTY"
  onPress={this.saveToDB}
/>
</View>
</ScrollView>

    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

  textInputStyle: {
      height: 42,
      borderColor: '#2e64e5',
      borderWidth: 1,
      width: '75%',
      paddingHorizontal: 10,
      marginTop: 20
    },

  scrollView: {


  },
  button: {
    alignItems: 'center',
    backgroundColor: '#f5e7ea',
    padding: 10,
    marginBottom: 10
  },categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 55,
    height: 55,
    backgroundColor: '#87ceeb' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#000',
  },
  text: {
   fontSize: 21,
 },
 row: { flexDirection: 'row' },
 image: { width: 300, height: 300, backgroundColor: 'gray' },
 button: {
   padding: 13,
   margin: 15,
   backgroundColor: '#dddddd',
 },
})

export default R1add;
