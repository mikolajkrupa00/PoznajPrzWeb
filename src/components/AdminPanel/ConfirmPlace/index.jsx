import components from "./styles"
import Axios from "axios";
import {useState, useEffect} from "react";

const ConfirmPlace = () => {
    const[places, setPlaces] = useState();
    
    const {Place, PlaceName, PlaceAddress,
        PlaceCategory, PlaceDescription, PlaceImg, PlaceDesc, ConfirmButton} = components;

    useEffect(() => {
        Axios.get("/place/getNotConfirmedPlaces").then(res => setPlaces(res.data));
    }, [])
    const confirmPlace = (placeId) =>{
        Axios.put(`/place/confirmPlace/${placeId}`).then(res => console.log(res))
    }
    return ( 
        <>
        {places ? places.map(place => 
            <Place>
                <PlaceImg src="logo192.png" />
                <PlaceDesc>
                    <PlaceName>{place.name}</PlaceName>
                    <PlaceAddress>{place.address}</PlaceAddress>
                    <PlaceCategory>kategoria :  {place.categoryName}</PlaceCategory>
                    <PlaceDescription>opis : {place.description}</PlaceDescription>
                    <ConfirmButton onClick={() => confirmPlace(place.placeId)}>Zatwierdź</ConfirmButton>
                </PlaceDesc>
            </Place>
            ): "Brak miejsc do zatwierdzenia"}
        </>
     )
        }
 
export default ConfirmPlace;