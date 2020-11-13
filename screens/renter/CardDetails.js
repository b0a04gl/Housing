import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';

import * as Animatable from 'react-native-animatable';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

const CardItemDetails = ({route}) => {



  const itemData = route.params.itemData;
  const navTitleView = useRef(null);

  console.log("region  "+itemData.markers[0].latlng.latitude);

  var locations = '';

  for(var i=0;i<itemData.locations.length;i++)
  {
    locations += itemData.locations[i]+", ";
  }

  locations = locations.substring(0,locations.length-2);

  var description = `Furnished Apartment For Rent In A Residential Complex, Al Olaya, North Riyadh
The Residence located in Al Olaya district. Nearby kingdom tower

It offers gym 24 hours, high-speed Wi-Fi, with private entrance and security CCTV cameras 24-hour, BBQ area.\n
The apartment designed for Executive and senior it is suitable for corporate and travelers' leisure with hospitality service.\n`;


var features = `Fully furnished Apartment with a total area of 75 sqm\n
Contains one king bed with a private bathroom \n \t\t\t\t\t\t\t-> shower \n \t\t\t\t\t\t\t-> living room with screen TV 55 inch \n \t\t\t\t\t\t\t-> air-condition \n \t\t\t\t\t\t\t-> bathroom for guests \n \t\t\t\t\t\t\t-> mini kitchen with a dining table.\n It equipped with \n\t\t\t\t\t\t\t-> cutleries and microwaves, \n\t\t\t\t\t\t\t-> a refrigerator, \n \t\t\t\t\t\t\t-> washing – dryer machine,\n\t\t\t\t\t\t\t-> iron,\n \t\t\t\t\t\t\t-> kettle,\n\t\t\t\t\t\t\t-> safety box.`;


var services = `Services: Gym - weekly cleaning service - 24/7 security guards -maintenance service - Wi-Fi service - business center - barbecue - parking.`;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image source={{ uri: itemData.imageURL}} style={styles.image} />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{itemData.propType+"    |   "+itemData.propSubtype}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{itemData.propType+"    |   "+itemData.propSubtype}</Text>
          </Animatable.View>
        )}>
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>${itemData.propPrice+" yearly"} </Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                <Text style={styles.cardDetails}>{locations}</Text>

            </View>
          </View>
        </TriggeringView>



        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Specifications</Text>
                  <View style={styles.categories}>

                      <View style={styles.categoryContainer}>
                        <MaterialCommunityIcons
                          name="bed-empty"
                          size={16}
                          color="#fff"
                        />
                        <Text style={styles.category}>{itemData.bedCount+" Beds"}</Text>
                      </View>


                      <View style={styles.categoryContainer}>
                        <MaterialCommunityIcons
                          name="toilet"
                          size={16}
                          color="#fff"
                        />
                        <Text style={styles.category}>{itemData.bathroomCount+" Baths"}</Text>
                      </View>

                      <View style={styles.categoryContainer}>
                      <MaterialCommunityIcons
                        name="vector-square"
                        size={16}
                        color="#fff"
                      />
                        <Text style={styles.category}>{itemData.propArea+" Sq ft"}</Text>
                      </View>
                  </View>
                </View>


                <View style={styles.section}>

                                    <Text style={styles.sectionTitle}>Features</Text>


                                      <Text style={styles.sectionContent}>{features}</Text>
                        </View>


                <View style={[styles.section,styles.sectionLarge]}>

                <Text style={styles.sectionTitle}>Description</Text>
                  <Text style={styles.sectionContent}>{description}</Text>
                </View>


                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Services</Text>
                          <View style={styles.categories}>

                              <View style={styles.categoryContainer}>
                                <MaterialCommunityIcons
                                  name="spray-bottle"
                                  size={16}
                                  color="#fff"
                                />
                                <Text style={styles.category}>Weekly cleaning service</Text>
                              </View>


                              <View style={styles.categoryContainer}>
                                <MaterialCommunityIcons
                                  name="security"
                                  size={16}
                                  color="#fff"
                                />
                                <Text style={styles.category}>24/7 security guards</Text>
                              </View>

                              <View style={styles.categoryContainer}>
                              <MaterialCommunityIcons
                                name="wifi"
                                size={16}
                                color="#fff"
                              />
                                <Text style={styles.category}>Wifi Service</Text>
                              </View>

                              <View style={styles.categoryContainer}>
                              <MaterialCommunityIcons
                                name="car-electric"
                                size={16}
                                color="#fff"
                              />
                                <Text style={styles.category}>Car Parking</Text>
                              </View>
                          </View>
                        </View>

        <View style={[styles.section, {height: 250}]}>

  <Text style={styles.sectionTitle}>Geo Locations</Text>

          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: itemData.markers[0].latlng.latitude,
              longitude: itemData.markers[0].latlng.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1
            }}>

          {  itemData.markers.map((m, i) => (
                <MapView.Marker key={i} coordinate={m.latlng} />
            ))
}

          </MapView>
        </View>
      </HeaderImageScrollView>
    </View>
  );
};

export default CardItemDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
  },
  name: {
    fontWeight: 'bold',
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
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
  },
  categories: {
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
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 300,
  },
});
