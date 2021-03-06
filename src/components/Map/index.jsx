
import Layout from "../Layout/index"
import componentStyles from "./styles";

import {MapContainer,TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import OnScreenButtons from './OnMapButtons/OnScreenButtons'
import MarkersLayer from './MarkersManagement/MarkersLayer'


const Map = () => {

    const { MapWrapper } = componentStyles;
    const style = {height: '100%'}
    const rzeszow_location = [50.041187, 21.999121] //latitude longitude
    const default_zoom = 13

    return(
        <Layout>

            <MapWrapper>
                <MapContainer style={style} center={rzeszow_location} zoom={default_zoom} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MarkersLayer />
                    <OnScreenButtons />

                </MapContainer>
            </MapWrapper>
          
        </Layout>
    )


}

export default Map;