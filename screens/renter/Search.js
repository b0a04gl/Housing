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

const component3= () => <Text>Buy</Text>
const component4= () => <Text>Lease</Text>
const component5 = () => <Text>Rent</Text>

const component6= () => <Text>Yearly</Text>
const component7= () => <Text>Monthly</Text>
const component8 = () => <Text>Weekly</Text>

const priceRange = [
  {
    id: 1,
    name:"20000"
  },
  {
    id: 2,
    name:"40000"
  },
  {
    id: 3,
    name:"60000"
  },
  {
    id: 4,
    name:"80000"
  },
  {
    id: 5,
    name:"100000"
  },

];

const areaRange = [
  {
    id: 1,
    name:"100"
  },
  {
    id: 2,
    name:"200"
  },
  {
    id: 3,
    name:"300"
  },
  {
    id: 4,
    name:"400"
  },
  {
    id: 5,
    name:"500"
  },

];

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
      frequency:null,
      propType: null,
      propSubtype: null,
      propMinPrice:null,
      propMaxPrice:null,
      propMinArea:null,
      propMaxArea:null,
      bedCount:null,
      bathroomCount:null,
      selectedItems1: [],
      selectedItems2: [],
      useruids: [],
      searchResults: [],
      user: Firebase.auth().currentUser
    }

    this.updateIndex = this.updateIndex.bind(this)
    this.saveToDB = this.saveToDB.bind(this)
    this.singleParamSearch = this.singleParamSearch.bind(this);
    this.findMatch = this.findMatch.bind(this);

  }



  updateIndex (selectedIndex) {

    // console.log(selectedIndex);

    this.setState({propType:selectedIndex})
  }



singleParamSearch = (name,value) => {



  var required = [];
  for(var i=0;i<this.state.useruids.length;i++)
  {
    // console.log(useruids[i]);




    var ref = Firebase.database().ref("/properties/"+this.state.useruids[i]);


    if(name=='propArea')
    {
      console.log("AREA");
      console.log("propArea"+value[0]+" "+value[1]);

      ref.orderByChild(name).startAt(parseInt(value[0].name)).endAt(parseInt(value[1].name)).once("value", (data) => {
      // console.log("PROPPRICE :::: ");

      if (data.val()) {
        var temp = data.val();
        var keys = Object.keys(temp);
        var x = [];
        for (var index = 0; index < keys.length; index++) {
          var key = keys[index];

          required[key] = temp[key];

          // console.log(x[index]);
        };
      }

      // console.log(Object.keys(required));

    });


      return required;


    }

    if(name == 'propPrice' )
    {
      console.log("PRICE");
      console.log("propPrice"+value[0]+" "+value[1]);
      ref.orderByChild(name).startAt(parseInt(value[0].name)).endAt(parseInt(value[1].name)).once("value", (data) => {
      // console.log("PROPPRICE :::: ");

      if (data.val()) {
        var temp = data.val();
        var keys = Object.keys(temp);
        var x = [];
        for (var index = 0; index < keys.length; index++) {
          var key = keys[index];

          required[key] = temp[key];

          // console.log(x[index]);
        };
      }

      // console.log(Object.keys(required));

});


      return required;
    }


var query = ref.orderByChild(name).equalTo(value);
    query.once("value", (data) => {

        // console.log(data.val());
        if (data.val()) {
          var temp = data.val();
          var keys = Object.keys(temp);
          var x = [];
          for (var index = 0; index < keys.length; index++) {
            var key = keys[index];

            required[key] = temp[key];

            // console.log(x[index]);
          };
        }
      });
  }

  return required;

}


findMatch = (searchResults,required) => {


  if(searchResults==null || Object.keys(searchResults).length==0)
  {
    return required;
  }
  else {

    var keys1 = Object.keys(searchResults);
    var keys2 = Object.keys(required);

    var filtered = keys1.filter((value) => keys2.includes(value));

    var finalResults = [];

    if(filtered!=null)
    {
        for(var i=0;i<filtered.length;i++)
        {
            finalResults[filtered[i]] = required[filtered[i]];
        }
    }

    return finalResults;


  }


}

saveToDB = () =>{





  const route = this.props.route;

  var amenities=[];

if(route.params!=null)
{
   amenities = route.params;

}
    let locations=null;

    for(var i=0;i<this.state.selectedItems2.length;i++)
        locations=(this.state.selectedItems2[i].name);

    var today  = new Date();

    // console.log(today.toLocaleDateString("en-US")); // 9/17/2016

    let propData = [];


    if(this.state.action==0)
    {
      propData['action']='Sell';
    }
    else if(this.state.action==1)
    {
      propData['action']='Lease';
    }
    else if(this.state.action===2)
    {
      propData['action']='Rent';
    }

    if(this.state.propType==0)
    {
      propData['propType']='Residential'
    }
    else if(this.state.propType==1) {
      propData['propType']='Commercial'
    }

    if(this.state.frequency==0)
    {
      propData['frequency'] = 'Yearly'
    }
    else if(this.state.frequency==1)
    {
      propData['frequency'] = 'Monthly'
    }
    else if(this.state.frequency==2)
    {
      propData['frequency'] = 'Weekly'
    }

    propData['date'] = today.toLocaleDateString("en-US");
    propData['locations'] = locations;

    propData['propSubtype'] = this.state.propSubtype;
    propData['propPrice'] = [this.state.propMinPrice,this.state.propMaxPrice];
    propData['propArea'] = [this.state.propMinArea,this.state.propMaxArea];
    propData['bedCount'] = this.state.bedCount;
    propData['bathroomCount'] = this.state.bathroomCount;

    propData['amenities'] = amenities;



    var searchResults = null;

    if(propData['locations']!=null)
    {

          var required = this.singleParamSearch('locations',propData['locations']);


          if(required==null || Object.keys(required).length==0)
          {
              console.log("NO PROPERTY MATCHED...");
              this.props.navigation.navigate("SearchResults",{results:null});
              return;
          }

          console.log("MATCHES locations : "+Object.keys(required));

          searchResults = this.findMatch(searchResults,required);

          console.log("FILTERED MATCHES : "+Object.keys(searchResults).length);

    }

    if(propData['action']!=null)
    {

         required = this.singleParamSearch('action',propData['action']);

        console.log("MATCHES action : "+Object.keys(required));

        searchResults = this.findMatch(searchResults,required);

        if(searchResults==null || Object.keys(searchResults).length==0)
        {
            console.log("NO PROPERTY MATCHED...");
            this.props.navigation.navigate("SearchResults",{results:searchResults});
            return;
        }


        console.log("FILTERED MATCHES : "+Object.keys(searchResults).length);

}

if(propData['propType']!=null)
{
        required = this.singleParamSearch('propType',propData['propType']);

        console.log("MATCHES propType : "+Object.keys(required));

        searchResults = this.findMatch(searchResults,required);

        if(searchResults==null || Object.keys(searchResults).length==0)
        {
          console.log("NO PROPERTY MATCHED...");
          this.props.navigation.navigate("SearchResults",{results:searchResults});
            return;
        }

        console.log("FILTERED MATCHES : "+Object.keys(searchResults).length);

}

if(propData['propSubtype']!=null)
{
        required = this.singleParamSearch('propSubtype',propData['propSubtype']);

        console.log("MATCHES propSubtype : "+Object.keys(required));

        searchResults = this.findMatch(searchResults,required);

        if(searchResults==null || Object.keys(searchResults).length==0)
        {
          console.log("NO PROPERTY MATCHED...");
          this.props.navigation.navigate("SearchResults",{results:searchResults});
            return;
        }

        console.log("FILTERED MATCHES : "+Object.keys(searchResults).length);

}
    if(propData['frequency']!=null)
    {
          required = this.singleParamSearch('bedCount',propData['bedCount']);

          console.log("MATCHES bedCount : "+Object.keys(required).length);

          searchResults = this.findMatch(searchResults,required);

          if(searchResults==null || Object.keys(searchResults).length==0)
          {
            console.log("NO PROPERTY MATCHED...");
            this.props.navigation.navigate("SearchResults",{results:searchResults},{results:searchResults});
              return;
          }

          console.log("FILTERED MATCHES : "+Object.keys(searchResults).length);

    }

    if(propData['bedCount']!=null)
    {

          required = this.singleParamSearch('bedCount',propData['bedCount']);

          console.log("MATCHES bedCount : "+Object.keys(required).length);

          searchResults = this.findMatch(searchResults,required);

          if(searchResults==null || Object.keys(searchResults).length==0)
          {
            console.log("NO PROPERTY MATCHED...");
            this.props.navigation.navigate("SearchResults",{results:searchResults});
              return;
          }

          console.log("FILTERED MATCHES : "+Object.keys(searchResults).length);
}

if(propData['bathroomCount']!=null)
{

        required = this.singleParamSearch('bathroomCount',propData['bathroomCount']);

        console.log("MATCHES bathroomCount : "+Object.keys(required).length);

        searchResults = this.findMatch(searchResults,required);

        if(searchResults==null || Object.keys(searchResults).length==0)
        {
          console.log("NO PROPERTY MATCHED...");
          this.props.navigation.navigate("SearchResults",{results:searchResults});
            return;
        }

        console.log("FILTERED MATCHES : "+Object.keys(searchResults).length);
}

if(propData['propPrice']!=null && propData['propPrice'].length!=0 && this.state.propMinPrice != null && this.state.propMaxPrice != null)
{
         required = this.singleParamSearch('propPrice',propData['propPrice']);

      console.log("MATCHES propPrice : "+Object.keys(required).length);

        searchResults = this.findMatch(searchResults,required);

        if(searchResults==null || Object.keys(searchResults).length==0)
        {
          console.log("NO PROPERTY MATCHED...");
          this.props.navigation.navigate("SearchResults",{results:searchResults});
            return;
        }

        console.log("FILTERED MATCHES : "+Object.keys(searchResults).length);

}

if(propData['propArea']!=null && propData['propArea'].length !=0 && this.state.propMaxArea != null && this.state.propMinArea != null)
{
         required = this.singleParamSearch('propArea',propData['propArea']);

      console.log("MATCHES propArea : "+Object.keys(required).length);

        searchResults = this.findMatch(searchResults,required);

        if(searchResults==null || Object.keys(searchResults).length==0)
        {
          console.log("NO PROPERTY MATCHED...");
          this.props.navigation.navigate("SearchResults",{results:searchResults});
            return;
        }

        console.log("FILTERED MATCHES : "+Object.keys(searchResults).length);
}


this.props.navigation.navigate("SearchResults",{results:searchResults});


}


componentDidMount() {


  let allusers = Firebase.database().ref('/properties');

  var useruids = [];

    allusers.on('value', (data) => {

      // console.log(data.val());

        this.setState({useruids : Object.keys(data.val())});

      });

}






  render () {


// console.log("USRUIDS ----------- "+this.state.useruids.length);


    const buttons = [{ element: component1 }, { element: component2 }]
      const buttons2 = [{ element: component3 }, { element: component4 }, { element: component5 }]
      const buttons3 = [{ element: component6 }, { element: component7 }, { element: component8 }]
    // console.log(this.state.user.uid);
    const navigation = this.props.navigation;



    return (

      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
      <View style={{padding:36}}>
     <FormButton
       buttonTitle="CLEAR"
       onPress={() => {
         this.setState ({
           taluksData:[],
           action:null,
           frequency:null,
           propType: 2,
           propSubtype: null,
           propMinPrice:0,
           propMaxPrice:0,
           propMinArea:0,
           propMaxArea:0,
           bedCount:0,
           bathroomCount:0,
           selectedItems1: [],
           selectedItems2: [],
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
                  resetValue={false}
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
                resetValue={false}
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
             <View style={{padding:10,alignSelf:'center',flexDirection:'row'}}>
             <Fragment>
                       {/* Multi */}
                       <SearchableDropdown

                         onItemSelect={(item) => {
                          this.setState({propMinPrice:item});
                         }}
                         containerStyle={{ padding: 5 }}

                         itemStyle={{
                           padding: 10,
                           marginTop: 2,
                           backgroundColor: '#87ceeb',
                           borderColor: '#bbb',
                           borderWidth: 1,
                           borderRadius: 5,
                           alignItems:'center'
                         }}
                         itemTextStyle={{ color: '#222', }}
                         itemsContainerStyle={{ maxHeight: 140 }}
                         items={priceRange}
                         defaultIndex={0}
                         chip={true}
                         resetValue={false}
                         textInputProps={
                           {
                             placeholder: "Select the MIN price",
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

             <Fragment>
                       {/* Multi */}
                       <SearchableDropdown
                         multi={true}

                         onItemSelect={(item) => {


                           this.setState({propMaxPrice:item});
                         }}
                         containerStyle={{ padding: 5 }}

                         itemStyle={{
                           padding: 10,
                           marginTop: 2,
                           backgroundColor: '#87ceeb',
                           borderColor: '#bbb',
                           borderWidth: 1,
                           borderRadius: 5,
                           alignItems:'center'
                         }}
                         itemTextStyle={{ color: '#222' }}
                         itemsContainerStyle={{ maxHeight: 140 }}
                         items={priceRange}
                         defaultIndex={0}
                         chip={true}
                         resetValue={false}
                         textInputProps={
                           {
                             placeholder: "Select the MAX price",
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
             <View style={{padding:10,alignSelf:'center',flexDirection:'row'}}>
             <Fragment>
                       {/* Multi */}
                       <SearchableDropdown

                         onItemSelect={(item) => {
                          this.setState({propMinArea:item});
                         }}
                         containerStyle={{ padding: 5 }}

                         itemStyle={{
                           padding: 10,
                           marginTop: 2,
                           backgroundColor: '#87ceeb',
                           borderColor: '#bbb',
                           borderWidth: 1,
                           borderRadius: 5,
                           alignItems:'center'
                         }}
                         itemTextStyle={{ color: '#222', }}
                         itemsContainerStyle={{ maxHeight: 140 }}
                         items={areaRange}
                         defaultIndex={0}
                         chip={true}
                         resetValue={false}
                         textInputProps={
                           {
                             placeholder: "Select the MIN area",
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

             <Fragment>
                       {/* Multi */}
                       <SearchableDropdown


                         onItemSelect={(item) => {


                           this.setState({propMaxArea:item});
                         }}
                         containerStyle={{ padding: 5 }}

                         itemStyle={{
                           padding: 10,
                           marginTop: 2,
                           backgroundColor: '#87ceeb',
                           borderColor: '#bbb',
                           borderWidth: 1,
                           borderRadius: 5,
                           alignItems:'center'
                         }}
                         itemTextStyle={{ color: '#222' }}
                         itemsContainerStyle={{ maxHeight: 140 }}
                         items={areaRange}
                         defaultIndex={0}
                         chip={true}
                         resetValue={false}
                         textInputProps={
                           {
                             placeholder: "Select the MAX area",
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


                



 <View style={{padding:16}}>
<FormButton
  buttonTitle="SEARCH"
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
      marginHorizontal: 10,
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
