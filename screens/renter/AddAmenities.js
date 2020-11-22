import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import React, {Component  ,Fragment} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View, ScrollView,Button,Image,TextInput
} from 'react-native'
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import FormButton from '../../components/FormButton';


const miscellaneous = [
  {
    name : 'ATM',
    icon : 'atm',
    color : '#fff',
    index : 0,
    isSelected : false,
    category : 'miscellaneous'
  },

  {
    name : 'Furnished',
    icon : 'seat',
    color : '#fff',
    index : 1,
    isSelected : false,
    category : 'miscellaneous'
  },
  {
    name : 'Near Mosque',
    icon : 'islam',
    color : '#fff',
    index : 2,
    isSelected : false,
    category : 'miscellaneous'
  }
];


const HealthFitness = [
  {
    name : 'Gym',
    icon : 'dumbbell',
    color : '#fff',
    index : 0,
    isSelected : false,
    category : 'HealthFitness',
  },
  {
    name : 'Indoor',
    icon : 'badminton',
    color : '#fff',
    index : 1,
    isSelected : false,
    category : 'HealthFitness',
  },
  {
    name : 'Golf Court',
    icon : 'golf',
    color : '#fff',
    index : 2,
    isSelected : false,
    category : 'HealthFitness',

  },
  {
    name : 'Billiards',
    icon : 'billiards-rack',
    color : '#fff',
    index : 3,
    isSelected : false,
    category : 'HealthFitness',

  }
];


const RecreationFamily = [
  {
    name : 'Parks and playgrounds',
    icon : 'human-greeting',
    color : '#fff',
    index : 0,
    isSelected : false,
    category : 'RecreationFamily',
  },
  {
    name : "Children's holiday camps",
    icon : 'cake-variant',
    color : '#fff',
    index : 1,
    isSelected : false,
    category : 'RecreationFamily',
  },
  {
    name : 'Barbeque Area',
    icon : 'grill',
    color : '#fff',
    index : 2,
    isSelected : false,
    category : 'RecreationFamily',
  }
];


const Building = [
  {
    name : 'Air Conditioner',
    icon : 'air-conditioner',
    color : '#fff',
    index : 0,
    isSelected : false,
    category : 'Building',
  },
  {
    name : "King-sized Bed",
    icon : 'bed-empty',
    color : '#fff',
    index : 1,
    isSelected : false,
    category : 'Building',
  },
  {
    name : 'Cupboard',
    icon : 'cupboard',
    color : '#fff',
    index : 2,
    isSelected : false,
    category : 'Building',
  },
  {
    name : 'Shower Tub',
    icon : 'shower',
    color : '#fff',
    index : 3,
    isSelected : false,
    category : 'Building',
  }
];

const Security = [
  {
    name : '24/7 security guard',
    icon : 'security',
    color : '#fff',
    index : 0,
    isSelected : false,
    category : 'Security',
  },
  {
    name : "CCTV",
    icon : 'cctv',
    color : '#fff',
    index : 1,
    isSelected : false,
    category : 'Security',
  },
  {
    name : 'Smart Doorlock',
    icon : 'home-lock',
    color : '#fff',
    index : 2,
    isSelected : false,
    category : 'Security',
  }
];

const TransportationTechnology = [
  {
    name : 'Elevator',
    icon : 'elevator',
    color : '#fff',
    index : 0,
    isSelected : false,
    category : 'TransportationTechnology',
  },
  {
    name : "Wifi Service",
    icon : 'wifi',
    color : '#fff',
    index : 1,
    isSelected : false,
    category : 'TransportationTechnology',
  },
  {
    name : 'Car Parking',
    icon : 'car-electric',
    color : '#fff',
    index : 2,
    isSelected : false,
    category : 'TransportationTechnology',
  }
];

const Services = [
  {
    name : 'Weekly cleaning service',
    icon : 'spray-bottle',
    color : '#fff',
    index : 0,
    isSelected : false,
    category : 'Services',
  },
  {
    name : "Wifi Service",
    icon : 'wifi',
    color : '#fff',
    index : 1,
    isSelected : false,
    category : 'Services',
  },
  {
    name : 'Ambulance',
    icon : 'ambulance',
    color : '#fff',
    index : 2,
    isSelected : false,
    category : 'Services',
  },
  {
    name : 'Washing',
    icon : 'washing-machine',
    color : '#fff',
    index : 3,
    isSelected : false,
    category : 'Services',
  }
];



class Amenities extends Component
{

  constructor(props)
  {

      super(props);

      this.state = {
        name : this.props.name,
        icon : this.props.icon,
        index : this.props.index,
        color : '#FF6347',
        isSelected : false,
      }

this.save = this.save.bind(this)


  }

save = () => {

  if(!this.state.isSelected)
  {
    this.setState({isSelected:true,color:'#008000'});
  }
  else {
    this.setState({isSelected:false,color:'#FF6347'});
  }







}


    render()
    {


      if(this.props.category== 'miscellaneous')
      {
          miscellaneous[this.state.index].isSelected = this.state.isSelected;
      }
      else if(this.props.category == 'HealthFitness')
      {
        HealthFitness[this.state.index].isSelected = this.state.isSelected;
      }
      else if(this.props.category == 'RecreationFamily')
      {
        RecreationFamily[this.state.index].isSelected = this.state.isSelected;
      }
      else if(this.props.category == 'Building')
      {
        Building[this.state.index].isSelected = this.state.isSelected;
      }
      else if(this.props.category == 'Security')
      {
        Security[this.state.index].isSelected = this.state.isSelected;
      }
      else if(this.props.category == 'TransportationTechnology')
      {
        TransportationTechnology[this.state.index].isSelected = this.state.isSelected;
      }
      else if(this.props.category == 'Services')
      {
        Services[this.state.index].isSelected = this.state.isSelected;
      }

      return (
        <TouchableOpacity style = {{backgroundColor: this.state.color,
          flexDirection: 'row',
        borderRadius: 20,
        margin: 10,
        padding: 10,
        paddingHorizontal: 15

      }} onPress={this.save}>


          <MaterialCommunityIcons
            name={this.state.icon}
            size={16}
            color='#fff'

          />
          <Text style={styles.category}>{this.state.name}</Text>

        </TouchableOpacity>
      );
    }
}





class AddAmenities extends Component {


  constructor(props)
  {
    super(props);

    this.state={
        items:[],
        selected:[],
    }


this.saveAmenties = this.saveAmenties.bind(this)

  }

saveAmenties = () =>{

  var finalSelects = [];

  for(var i=0;i<7;i++)
  {
    finalSelects[i] = [];
  }

  for(var i=0;i<miscellaneous.length;i++)
  {
      if(miscellaneous[i].isSelected)
      {
        finalSelects[0].push(miscellaneous[i]);
      }
  }

  for(var i=0;i<HealthFitness.length;i++)
  {
      if(HealthFitness[i].isSelected)
      {
        finalSelects[1].push(HealthFitness[i]);
      }
  }

  for(var i=0;i<RecreationFamily.length;i++)
  {
      if(RecreationFamily[i].isSelected)
      {
        finalSelects[2].push(RecreationFamily[i]);
      }
  }

  for(var i=0;i<Building.length;i++)
  {
      if(Building[i].isSelected)
      {
        finalSelects[3].push(Building[i]);
      }
  }

  for(var i=0;i<Security.length;i++)
  {
      if(Security[i].isSelected)
      {
        finalSelects[4].push(Security[i]);
      }
  }

  for(var i=0;i<TransportationTechnology.length;i++)
  {
      if(TransportationTechnology[i].isSelected)
      {
        finalSelects[5].push(TransportationTechnology[i]);
      }
  }

  for(var i=0;i<Services.length;i++)
  {
      if(Services[i].isSelected)
      {
        finalSelects[6].push(Services[i]);
      }
  }

  // console.log(finalSelects);

  this.props.navigation.navigate('AddProperty', {

  amenities: finalSelects,

  });

}

componentDidMount =() =>{


}


  render(){
    return (
      <ScrollView keyboardShouldPersistTaps="handled">

      <View style={styles.section}>
                          <Text style={styles.sectionTitle}>Miscellaneous</Text>
                <View style={[styles.categories]}>

                {miscellaneous.map((am,index)=> (
                  <Amenities
                    name={am.name}
                    icon={am.icon}
                    key={am.index}
                    index={am.index}
                    color={am.color}
                    category= {am.category}
                  />
                ))}
                </View>
              </View>

        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Health and Fitness</Text>
                  <View style={styles.categories}>

                  {HealthFitness.map((am,index)=> (
                    <Amenities
                      name={am.name}
                      icon={am.icon}
                      key={am.index}
                      index={am.index}
                      color={am.color}
                      category= {am.category}
                    />
                  ))}
                  </View>
                </View>

                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Recreation and Family</Text>
                          <View style={styles.categories}>


                            {RecreationFamily.map((am,index)=> (
                              <Amenities
                                name={am.name}
                                icon={am.icon}
                                key={am.index}
                                index={am.index}
                                color={am.color}
                                category= {am.category}
                              />
                            ))}

                          </View>
                        </View>


                        <View style={styles.section}>
                                            <Text style={styles.sectionTitle}>Building</Text>
                                  <View style={styles.categories}>


                                      {Building.map((am,index)=> (
                                        <Amenities
                                          name={am.name}
                                          icon={am.icon}
                                          key={am.index}
                                          index={am.index}
                                          color={am.color}
                                          category= {am.category}
                                        />
                                      ))}
                                  </View>
                                </View>

      <View style={styles.section}>
                          <Text style={styles.sectionTitle}>Security</Text>
                <View style={styles.categories}>


                {Security.map((am,index)=> (
                  <Amenities
                    name={am.name}
                    icon={am.icon}
                    key={am.index}
                    index={am.index}
                    color={am.color}
                    category= {am.category}
                  />
                ))}
                </View>
              </View>
              <View style={styles.section}>
                                  <Text style={styles.sectionTitle}>Transportation & Technology</Text>
                        <View style={styles.categories}>

                        {TransportationTechnology.map((am,index)=> (
                          <Amenities
                            name={am.name}
                            icon={am.icon}
                            key={am.index}
                            index={am.index}
                            color={am.color}
                            category= {am.category}
                          />
                        ))}

                        </View>
                      </View>
              <View style={styles.section}>
                                  <Text style={styles.sectionTitle}>Services</Text>
                        <View style={styles.categories}>

                        {Services.map((am,index)=> (
                          <Amenities
                            name={am.name}
                            icon={am.icon}
                            key={am.index}
                            index={am.index}
                            color={am.color}
                            category= {am.category}
                          />
                        ))}

                        </View>
                      </View>

                      <View style={{padding:16}}>
                      <FormButton
                       buttonTitle="ADD AMENITIES"
                       onPress={this.saveAmenties}
                      />
                      </View>
          </ScrollView>
    );
  }
}

export default AddAmenities;

const styles = StyleSheet.create({
  container: {

    flex: 1,

      },
  text: {
    fontSize: 20,
    color: '#333333'
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 25,
    paddingBottom:15,
    fontWeight: 'bold',
    color:'#000'
  },categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
});

/*

features







Amenities
Electricity backup
Cctv
Ro plant
Security
Guest parking
Gym
Play area
Barbecue area
Pool
Jacuzzi/Sauna /steam room
Laundry room & laundry facility
Garden
Cleaning services
Waste disposal
Maintenance staff

Conference room
Lobby
Cafeteria
Broadband
Intercom
Satellite tv
Visitor parking
Service elevator
Buisness center
Atm

*/
