/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Geolocation from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
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
const LAT_DELTA = 0.733;
const LONG_DELTA = LAT_DELTA * ASPECT_RATIO;

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
    request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION).then(result => result === RESULTS.GRANTED);
    request(PERMISSIONS.ANDROID.CALL_PHONE)
}

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';
    const [location, setLocation] = useState<LatLng>({latitude:0, longitude:0});
    const [region, setRegion] = useState<Region>({latitude: 0, longitude: 0, latitudeDelta: LAT_DELTA, longitudeDelta: LONG_DELTA});
    const [time, setTime] = useState<number>(0);

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mapContainer}>
                <MapView
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
                    mapPadding= {{top:Dimensions.get('window').height/2, right:10, left:10, bottom:10}}
                >
                </MapView>
            </View>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
