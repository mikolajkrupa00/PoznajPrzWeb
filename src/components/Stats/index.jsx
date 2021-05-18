import React, {useEffect, useState} from "react";
import Axios from "axios";
import Layout from "../Layout/index"
import componentStyles from "./styles";

const StatsPage = () => {
    const [ratings, setRatings] = useState('')
    const [placeName,setPlaceName] = useState('')
    const [filteredPlaces,setfilteredPlaces] = useState('')
    const [days,setDays] = useState("")
    const [displayedDays,setDisplayedDays] = useState("")
    const [message,setMessage] = useState(false)
    const { PlacesContainer, Place, PlaceName, PlaceAddress, PlaceNumOfVisits, PlaceDesc, PlaceImg, AverageRating, NumOfComments,Counter, DaysInput, PlaceInput, Input, InputPlace, Button, Stats, Message} = componentStyles;

    
    const handleDays = (e) =>{
        setDays(e.target.value);
        }
    const handleFilterDays = () =>{
        if(days>0){
            setMessage(false);
            Axios.get(`/rating/getRatingsStats/${days}`).then(res =>{setRatings(res.data);setfilteredPlaces(res.data)} );
            setDisplayedDays(days);
            setPlaceName("");
        }
        else{
            setMessage(true)
            setfilteredPlaces('')
        }
    }
    const handleFilterPlaces = (placeName) =>{
        setPlaceName(placeName);
        if(filteredPlaces)
        {
            setMessage(false);
            setfilteredPlaces(ratings);
        if(placeName=="")
        {
            setfilteredPlaces(ratings);
        }
        else{
            const filtered = filteredPlaces.filter(item => item.name.toLowerCase().includes(placeName.toLowerCase()) || item.address.toLowerCase().includes(placeName.toLowerCase()));
            setfilteredPlaces(filtered);
        }
        }
        else if(!filteredPlaces){
            setMessage(true)}

        if(placeName === "") setMessage(false);
    }

    
    return(
        <Layout>
            
            <PlacesContainer>
            
            <DaysInput>
                    
                    <Input type="number" placeholder="Liczba dni" value={days} onChange={handleDays} style={message ? {borderColor: `firebrick`} : {borderColor: `#d0d0d0`}}/>
                    <Button onClick={handleFilterDays} style={message ? {borderColor: `firebrick`, backgroundColor:"firebrick",color:"white"} : {borderColor: `#d0d0d0`}}>Filtruj</Button>
            </DaysInput>
            
            <PlaceInput>
                    <InputPlace type="text" placeholder="Fraza w nazwie miejsca" value={placeName} onChange={(e)=>handleFilterPlaces(e.target.value)} style={message ? {borderColor: `firebrick`} : {borderColor: `#d0d0d0`}}/>
            </PlaceInput>
            <Message>{message && "Podaj poprawną liczbę dni"}</Message>
            <Counter>{placeName.length>0 || displayedDays>0 ? (filteredPlaces.length>0 ? `Zwrócono ${filteredPlaces.length} rekordów` : "Brak wyników") : "Brak kryterium wyszukiwania"}</Counter>

            {filteredPlaces && displayedDays!="" && filteredPlaces.map(visit => 

                    <Place key={`key${visit.placeId}`}>
                        <PlaceImg src="img/logo192.png" />
                        <PlaceDesc>
                            <PlaceName>{visit.name}</PlaceName>
                            <PlaceAddress>{visit.address}</PlaceAddress>
                            
                            <Stats> Statystyki z ostatnich {displayedDays} dni:</Stats>
                            <PlaceNumOfVisits>Liczba odwiedzin  {visit.numOfVisits}</PlaceNumOfVisits>
                            <NumOfComments>Liczba komentarzy: {visit.numOfComments}</NumOfComments>
                            <AverageRating>Średnia ocena: {visit.averageValue}</AverageRating>

                        </PlaceDesc>
                    </Place>
                )}
            </PlacesContainer>
            
        </Layout>
    )
}

export default StatsPage;