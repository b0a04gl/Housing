import React, { Component ,Fragment} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View, ScrollView,
} from 'react-native'
import { ButtonGroup } from 'react-native-elements';

import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import NumericInput from 'react-native-numeric-input'
import Constants from 'expo-constants';
import SearchableDropdown from 'react-native-searchable-dropdown';

const component1 = () => <Text>Residential</Text>
const component2 = () => <Text>Commercial</Text>

const citiesData =[
  {
      id:1,
      name : 'Mumbai'
  },{
    id:2,
    name : 'Chennai'
  },{
    id:3,
    name : 'Kolkata'
  },{
    id:4,
    name : 'Bangalore'
  },{
    id:5,
    name : 'Hyderabad'
  },
  {
    id:6,
    name : 'Ahmedabad'
  },
  {
    id:7,
    name : 'Pune'
  },
  {
    id:8,
    name : 'Amaravathi'
  },{
    id:9,
    name:'Vishag'
  },
  {
    id:10,
    name:'Jaipur'
  }
];


class R1add extends Component {
  state = {
    count: 0
  }

  constructor () {
    super()
    this.state = {
      propType: 2,
      propSubtype: null,
      fromValue:0,
      toValue:0,
      bedCount:0,
      bathroomCount:0,
      selectedItems: [
        {
          id:5,
          name : 'Hyderabad'
        },
        {
          id:6,
          name : 'Ahmedabad'
        },

      ]
    }
    this.updateIndex = this.updateIndex.bind(this)

  }



  updateIndex (selectedIndex) {

    console.log(selectedIndex);

    this.setState({propType:selectedIndex})
  }


  render () {
    const buttons = [{ element: component1 }, { element: component2 }]


    return (

      <ScrollView keyboardShouldPersistTaps="handled">
      <View style={{ padding: 16 }}>
        <Text style={{ color: '#000', fontSize: 20 }}>
          Location
        </Text>

      </View>
      <Fragment>
                {/* Multi */}
                <SearchableDropdown
                  multi={true}
                  selectedItems={this.state.selectedItems}
                  onItemSelect={(item) => {
                    const items = this.state.selectedItems;
                    items.push(item)
                    this.setState({ selectedItems: items });
                  }}
                  containerStyle={{ padding: 5 }}
                  onRemoveItem={(item, index) => {
                    const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
                    this.setState({ selectedItems: items });
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
                  items={citiesData}
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
                      onTextChange: text => alert(text)
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
          Property type
        </Text>

      </View>
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={this.state.propType
        }
        buttons={buttons}
        containerStyle={{height: 50}} />

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
               Price range
             </Text>


             <View>
                                 <RangeSlider min={20000} max={50000}
                                      fromValueOnChange={value => {this.setState({fromValue:value})}}
                                      toValueOnChange={value => {this.setState({toValue:value})}}
                                      initialFromValue={30000}
                                 />
                                 <Text style={styles.categoryBtnTxt}>MIN value:  {this.state.fromValue}</Text>
                                 <Text style={styles.categoryBtnTxt}>MAX value:  {this.state.toValue}</Text>
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
             totalWidth={240}
             totalHeight={50}
             iconSize={25}
             step={1}
             initValue={0}
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
              totalWidth={240}
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
    width: 70,
    height: 70,
    backgroundColor: '#87ceeb' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#000',
  },
})

export default R1add;
