/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
    Alert,
    Button,
    Dimensions,
    Linking,
    NativeSyntheticEvent,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TurboModuleRegistry,
    useColorScheme,
    View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Geocoder from 'react-native-geocoding';
import MapView, { LatLng, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
    title: string;
}>;

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LAT_DELTA = 0.4;
const LONG_DELTA = LAT_DELTA * ASPECT_RATIO;
const SERVER_API_KEY = "12b6bcf1-c8fe-43c4-b01f-6684129e8bdf";
const GOOGLE_API_KEY = "AIzaSyCJrOQvo7rUV3VKJt8y183jbp5z98nasDk";
const SERVER_URL = "kitnaserver.blueweabo.com";

{
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => result === RESULTS.GRANTED);;
    request(PERMISSIONS.ANDROID.CALL_PHONE);
    Geocoder.init(GOOGLE_API_KEY);
}
type Order = {
    id: String,
    productsToDeliver: Object,
    productsDelivered: Object,
    location: String,
    date: Date,
}

function App(): React.JSX.Element {
    const [location, setLocation] = useState<LatLng>({latitude:0, longitude:0});
    const [region, setRegion] = useState<Region>({latitude: 0, longitude: 0, latitudeDelta: LAT_DELTA, longitudeDelta: LONG_DELTA});
    const [time, setTime] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [currentOrder, setCurrentOrder] = useState<Order>();
    const [currentDestination, setDistination] = useState<LatLng>();
    const mapRef = useRef(null);

    function generatePage(): React.JSX.Element {
        const [createPage, setCreatePage] = useState<number>(0);
        const [orderDate, setOrderDate] = useState<Date>(new Date());

        function generateCreatePage(): React.JSX.Element {
            switch (createPage) {
                case 0:
                    return (<View style={styles.container}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput placeholder='enter client name'/>
                        <Text style={styles.label}>Address</Text>
                        <TextInput placeholder='enter client Address'/>
                        <Text style={styles.label}>Telephone</Text>
                        <TextInput placeholder='enter client telephone' inputMode='tel'/>
                        <Text style={styles.label}>Notess</Text>
                        <TextInput placeholder='enter client Notes'/>
                        <Button title='Create' color={"#4406cd"} onPress={() => {

                        }}/>
                    </View>);
                case 1:
                    return (<View style={styles.container}>
                        <Text style={styles.label}>Client</Text>
                        <Dropdown data={[3,2,1]} labelField={"toString"} valueField={"toString"} onChange={()=>{}}/>
                        <Text style={styles.label}>Address</Text>
                        <Dropdown data={[3,2,1]} labelField={"toString"} valueField={"toString"} onChange={()=>{}}/>
                        <Text style={styles.label}>Delivery Date</Text>
                        <DatePicker mode='date' date={orderDate} onDateChange={setOrderDate}/>
                        <Text style={styles.label}>Products</Text>
                        <TextInput placeholder='enter ordered products'/>
                        <Button title='Create' color={"#4406cd"} onPress={() => {

                        }}/>
                    </View>);
                case 2:
                    return (<View style={styles.container}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput placeholder='enter product name'/>
                        <Text style={styles.label}>Unit</Text>
                        <TextInput placeholder='enter product unit'/>
                        <Text style={styles.label}>Price per unit</Text>
                        <TextInput placeholder='enter unit price' inputMode='decimal'/>
                        <Button title='Create' color={"#4406cd"} onPress={() => {

                        }}/>
                    </View>);
                default:
                    return (<View style={styles.container}> </View>);
            }
        }
        switch (page) {
            case 0:
                return (<View style={styles.container}>

                </View>)
            case 1:
                return (<View style={styles.container}>
                    <View style={styles.mapContainer}>
                        <MapView
                            ref={mapRef}
                            region={region}
                            onUserLocationChange={(locEvent) => {
                                if (locEvent.nativeEvent.coordinate && locEvent.timeStamp - 10000 > time) {
                                    setLocation(locEvent.nativeEvent.coordinate);
                                    const newRegion = {...region};
                                    newRegion.latitude = locEvent.nativeEvent.coordinate.latitude;
                                    newRegion.longitude = locEvent.nativeEvent.coordinate.longitude;
                                    setRegion(newRegion)
                                    setTime(locEvent.timeStamp);
                                }
                            }}
                            onRegionChangeComplete={(regEvent, isGesture) => {if (isGesture) setRegion(regEvent)}}
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            showsUserLocation= {true}
                            showsMyLocationButton= {true}
                            followsUserLocation={true}
                            mapPadding= {{top:Dimensions.get('window').height/2, right:5, left:5, bottom:5}}
                        >
                            <MapViewDirections
                                origin={location}
                                destination={currentDestination}
                                apikey={GOOGLE_API_KEY}
                                strokeWidth={4}
                                strokeColor='lightblue'
                            />
                        </MapView>
                    </View>
                    <View style={styles.uiContainer}>
                        <Text>
                            Some random text 2.
                        </Text>
                        <Text>
                        </Text>
                        <Button title='Update' color={"#4406cd"} onPress={() => {
                        }}/>
                    </View>
                </View>)
            case 2:
                return (<View style={styles.container}>
                    <View style={styles.navigationContainer}>
                        <View style={styles.navigationButton}>
                            <Button title='Client' onPress={()=>{setCreatePage(0)}} color={createPage == 0 ? "#40b4d1" : "#406cd1"}></Button>
                        </View>
                        <View style={styles.navigationButton}>
                            <Button title='Order' onPress={()=>{setCreatePage(1)}} color={createPage == 1 ? "#40b4d1" : "#406cd1"}></Button>
                        </View>
                        <View style={styles.navigationButton}>
                            <Button title='Product' onPress={()=>{setCreatePage(2)}} color={createPage == 2 ? "#40b4d1" : "#406cd1"}></Button>
                        </View>
                    </View>
                    {generateCreatePage()}
                </View>);
            case 3:
                return (<View style={styles.container}>
                </View>);
            default:
                return (<View style={styles.container}>
                </View>);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navigationContainer}>
                <View style={styles.navigationButton}>
                    <Button title='All' onPress={()=>{setPage(0)}} color={page == 0 ? "#40b4d1" : "#406cd1"}></Button>
                </View>
                <View style={styles.navigationButton}>
                    <Button title='Current' onPress={()=>{setPage(1)}} color={page == 1 ? "#40b4d1" : "#406cd1"}></Button>
                </View>
                <View style={styles.navigationButton}>
                    <Button title='New' onPress={()=>{setPage(2)}} color={page == 2 ? "#40b4d1" : "#406cd1"}></Button>
                </View>
                <View style={styles.navigationButton}>
                    <Button title='Overview' onPress={()=>{setPage(3)}} color={page == 3 ? "#40b4d1" : "#406cd1"}></Button>
                </View>
            </View>
            {generatePage()}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    navigationContainer: {
        height: "5%",
        width: "100%",
        display: "flex",
        flexDirection: "row",
    },
    navigationButton: {
        display: "flex",
        flexGrow: 1
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    label: {
        marginTop: 8,
        fontSize: 24,
        fontWeight: '700',
        color: "black"
    },
    highlight: {
        fontWeight: '700',
    },
    container: {
        height: "100%",
        width: "100%",
    },
    uiContainer: {
        height: "50%",
        width: "100%",
    },
    mapContainer: {
        ...StyleSheet.absoluteFillObject,
        height: "100%",
        width: "100%",
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default App;
