import {useEffect, useState} from 'react'
import {L} from 'leaflet';
import {MapContainer,TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import '../../../CSS/Map.css'
// import OnScreenButtons from './OnMapButtons/OnScreenButtons'
// import MarkersLayer from './MarkersManagement/MarkersLayer'


const LeafletMap = () => {

    const style = {height: '100%'}
    const rzeszow_location = [50.041187, 21.999121]
    const default_zoom = 13

    

         
    return(
        <div id='map'>
            <MapContainer style={style} center={rzeszow_location} zoom={default_zoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* <MarkersLayer />
                <OnScreenButtons /> */}

            </MapContainer>

        </div>
    )

}

export default LeafletMap