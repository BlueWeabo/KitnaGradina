import { Component } from "react";
import { Dimensions } from "react-native/types";


const {width, height} = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapComponent<P = {}, S = {}> extends Component<P, S> {
    constructor(props: P) {
        super(props);
    }
}
