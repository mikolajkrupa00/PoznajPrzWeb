import React, {useEffect, useState} from "react";
import Axios from "axios";
import Layout from "../Layout/index"
import componentStyles from "./styles";

const StatsPage = () => {
    const [ratings, setRatings] = useState('')
    const [placeName,setPlaceName] = useState('')
    const [filteredPlaces,setfilteredPlaces] = useState('')
    const [days,setDays] = useState(365)
    const [displayedDays,setDisplayedDays] = useState(365)
    const { PlacesContainer, Place, PlaceName, PlaceAddress, PlaceNumOfVisits, PlaceDesc, PlaceImg, AverageRating, NumOfComments,Counter, DaysInput, PlaceInput, Input, InputPlace, Button, Stats} = componentStyles;
    
    useEffect(() => {
        Axios.get(`/rating/getRatingsStats/${days}`).then(res =>{setRatings(res.data);setfilteredPlaces(res.data)} );
    },[])
    const handleDays = (e) =>{
        setDays(e.target.value);
        }
    const handleFilterDays = () =>{
        
        Axios.get(`/rating/getRatingsStats/${days}`).then(res =>{setRatings(res.data);setfilteredPlaces(res.data)} );
        setDisplayedDays(days);
        setPlaceName("");
        
    }
    const handleFilterPlaces = (placeName) =>{
        setPlaceName(placeName);
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
  
    return(
        <Layout>
            
            <PlacesContainer>
            
            <DaysInput>
                    <Input type="text" placeholder="Liczba dni" value={days} onChange={handleDays}/>
                    <Button onClick={handleFilterDays}>Filtruj</Button>
            </DaysInput>
            <PlaceInput>
                    <InputPlace type="text" placeholder="Fraza w nazwie miejsca" value={placeName} onChange={(e)=>handleFilterPlaces(e.target.value)}/>
            </PlaceInput>
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