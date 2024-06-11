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

function Section({ children, title }: SectionProps): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}>
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}>
                {children}
            </Text>
        </View>
    );
}

{
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => result === RESULTS.GRANTED);
    request(PERMISSIONS.ANDROID.CALL_PHONE)
}

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const [location, setLocation] = useState<LatLng>({latitude:0, longitude:0});
    const [region, setRegion] = useState<Region>({latitude: 0, longitude: 0, latitudeDelta: LAT_DELTA, longitudeDelta: LONG_DELTA});
    const [time, setTime] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [currentOrder, setCurrentOrder] = useState(null);
    const mapRef = useRef(null);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    function generatePage(): React.JSX.Element {
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
                            mapPadding= {{top:Dimensions.get('window').height/1.8, right:5, left:5, bottom:5}}
                        >
                            <MapViewDirections
                                origin={location}
                                destination={{latitude: 43.217759600802324,longitude: 27.89225639844444}}
                                apikey={GOOGLE_API_KEY}
                                strokeWidth={4}
                                strokeColor='lightblue'
                            />
                        </MapView>
                    </View>
                </View>)
            case 2:
                return (<View style={styles.container}>
                    <View style={{...styles.uiContainer, ...backgroundStyle}}>
                        <Text>
                            Some random text 2.
                        </Text>
                        <Text>
                        </Text>
                        <Button title='call' onPress={() => {
                            Linking.openURL('tel:+359876140939');
                        }}/>
                    </View>
                </View>)
            case 3:
                return (<View style={styles.container}>
                </View>)
            default:
                return (<View style={styles.container}>
                </View>)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navigationContainer}>
                <View style={styles.navigationButton}>
                    <Button title='All' onPress={()=>{setPage(0)}}></Button>
                </View>
                <View style={styles.navigationButton}>
                    <Button title='Current' onPress={()=>{setPage(1)}} ></Button>
                </View>
                <View style={styles.navigationButton}>
                    <Button title='New' onPress={()=>{setPage(2)}}></Button>
                </View>
                <View style={styles.navigationButton}>
                    <Button title='Overview' onPress={()=>{setPage(3)}}></Button>
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
        width: "25%",
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
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
