import { MapContainer, TileLayer } from "react-leaflet";

const Map = ({ children }) => {
    const style = {height: '100%'};
    const rzeszow_location = [50.041187, 21.999121];
    const default_zoom = 13;

    return (
        <MapContainer style={style} center={rzeszow_location} zoom={default_zoom} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            { children } 
        </MapContainer>
    )
}

export default Map;