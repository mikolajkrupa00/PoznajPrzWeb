import components from "./styles"
import Axios from "axios";
import {useState, useEffect} from "react";

const ConfirmPlace = () => {
    const[places, setPlaces] = useState();
    
   
    const {AdminContainer, BlockUserSubmit, BlockUserInput, PlaceRow, BlockUserContainer, Place, PlaceName, PlaceAddress,ConfirmPlaceSubmit,
        PlaceCategory, PlaceDescription, PlaceImg, PlaceDesc, ConfirmButton, BlockedUsers, User, UserName, UserEmail, UnlockUserSubmit} = components;

    useEffect(() => {
        Axios.get("/place/getNotConfirmedPlaces").then(res => setPlaces(res.data));
    }, [])
    const confirmPlace = (placeId) =>{
        Axios.put(`/place/confirmPlace/${placeId}`).then(res => setPlaces(places.filter(place => place.placeId != placeId)));
    }
    const discardPlace = (placeId) =>{
        Axios.delete(`/place/${placeId}`).then(res => setPlaces(places.filter(place => place.placeId != placeId)))
    }
    return ( 
        <>
        {places ? places.map(place => 
            <Place>
            <PlaceImg src="img/logo192.png" />
            <PlaceDesc>
                <PlaceName>{place.name}</PlaceName>
                <PlaceAddress>{place.address}</PlaceAddress>
                <PlaceCategory>kategoria :  {place.categoryName}</PlaceCategory>
                <PlaceDescription>opis : {place.description}</PlaceDescription>
            </PlaceDesc>
                <ConfirmPlaceSubmit onClick={() => confirmPlace(place.placeId)}>Zatwierdź</ConfirmPlaceSubmit>
                <ConfirmPlaceSubmit onClick={() => discardPlace(place.placeId)}>Odrzuć</ConfirmPlaceSubmit>
        </Place>
            ): "Brak miejsc do zatwierdzenia"}
        </>
     )
        }
 
export default ConfirmPlace;