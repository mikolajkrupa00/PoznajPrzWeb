import React, {useState} from "react";
import Axios from "axios";
import componentStyles from "./styles";
import {VscLocation, VscComment} from "react-icons/vsc"

const StatsPage = () => {
    const [ratings, setRatings] = useState('')
    const [visits, setVisits] = useState('')
    const [placeName,setPlaceName] = useState('')
    const [filteredRates,setfilteredRates] = useState('')
    const [filteredVisits,setfilteredVisits] = useState('')
    const [days,setDays] = useState("")
    const [displayedDays,setDisplayedDays] = useState("")
    const [message,setMessage] = useState(false)
    const [feature,setFeature] = useState("rates");
    const { PlacesContainer, Place, PlaceName, PlaceAddress, PlaceNumOfVisits, PlaceDesc, PlaceImg, AverageRating, NumOfComments,Counter, DaysInput, PlaceInput, Input, InputPlace, Button, Stats, Message, FeatureNav, FButton} = componentStyles;

    const iconStyles = {fontSize: "20px", marginRight: "5px"}
    const handleDays = (e) =>{
        setDays(e.target.value);
        }
    const handleFilterDays = () =>{
        if(days>0){
            setMessage(false);
            Axios.get(`/rating/getStats/${days}`).then(res =>{setRatings(res.data);setfilteredRates(res.data)} );
            Axios.get(`/visit/getStats/${days}`).then(res =>{setVisits(res.data);setfilteredVisits(res.data)} );
            setDisplayedDays(days);
            setPlaceName("");
        }
        else{
            setMessage(true)
            setfilteredRates('')
            setfilteredVisits('')
        }
    }
    const handleFilterPlaces = (placeName) =>{
        setPlaceName(placeName);
        if(filteredRates && filteredVisits)
        {
            setMessage(false);
            setfilteredRates(ratings);
            setfilteredVisits(visits);
        if(placeName==="")
        {
            setfilteredRates(ratings);
            setfilteredVisits(visits);
        }
        else{
            const filtered1 = filteredRates.filter(item => item.name.toLowerCase().includes(placeName.toLowerCase()) || item.address.toLowerCase().includes(placeName.toLowerCase()));
            setfilteredRates(filtered1);
            const filtered2 = filteredVisits.filter(item => item.name.toLowerCase().includes(placeName.toLowerCase()) || item.address.toLowerCase().includes(placeName.toLowerCase()));
            setfilteredVisits(filtered2);
        }
        }
        else if(!filteredRates && feature==="rates"){
            setMessage(true)}
        else if(!filteredVisits && feature==="visits"){
            setMessage(true)}    
        if(placeName === "") setMessage(false);
    }

    
    return(
        <>
            
            <PlacesContainer>
            
            <DaysInput>
                    
                    <Input type="number" placeholder="Liczba dni" value={days} onChange={handleDays} style={message ? {borderColor: `firebrick`} : {borderColor: `#d0d0d0`}}/>
                    <Button onClick={handleFilterDays} style={message ? {borderColor: `firebrick`, backgroundColor:"firebrick",color:"white"} : {borderColor: `#d0d0d0`}}>Filtruj</Button>
            </DaysInput>
            
            <PlaceInput>
                    <InputPlace type="text" placeholder="Fraza w nazwie miejsca" value={placeName} onChange={(e)=>handleFilterPlaces(e.target.value)} style={message ? {borderColor: `firebrick`} : {borderColor: `#d0d0d0`}}/>
            </PlaceInput>
            <Message>{message && "Podaj poprawną liczbę dni"}</Message>
            <FeatureNav>
                <FButton act = {feature==="rates" ? "rgb(0, 110, 230)" : "grey"} onClick={()=>setFeature("rates")} >
                    <VscComment style={iconStyles}/> 
                    Oceny
                </FButton>
                <FButton act = {feature==="visits" ? "rgb(0, 110, 230)" : "grey"} onClick={()=>setFeature("visits")} >
                    <VscLocation style={iconStyles}/>
                    Odwiedziny miejsc
                </FButton>
            </FeatureNav>
            <Counter>
                {feature==="rates" ? ((placeName.length>0 || displayedDays>0) ? 
                    (filteredRates.length>0 ? 
                    `Zwrócono ${filteredRates.length} rekordów` : "Brak wyników")
                    : "Brak kryterium wyszukiwania"):null}
                {feature==="visits" ? ((placeName.length>0 || displayedDays>0) ? 
                    (filteredVisits.length>0 ? 
                    `Zwrócono ${filteredVisits.length} rekordów` : "Brak wyników")
                    : "Brak kryterium wyszukiwania"):null}
            </Counter>

            

            {feature === "visits" && filteredVisits && displayedDays!=="" && filteredVisits.map(visit => 

                    <Place key={`key${visit.placeId}`}>
                        <PlaceImg src={visit.mainPhoto ? visit.mainPhoto : "img/logo192.png"}/>
                        <PlaceDesc>
                            <PlaceName>{visit.name}</PlaceName>
                            <PlaceAddress>{visit.address}</PlaceAddress>
                            
                            <Stats> Statystyki z ostatnich {displayedDays} dni:</Stats>
                            <PlaceNumOfVisits>Liczba odwiedzin  {visit.numOfVisits}</PlaceNumOfVisits>
                            
                        </PlaceDesc>
                    </Place>
                )}
            {feature === "rates" && filteredRates && displayedDays!=="" && filteredRates.map(rates => 

                <Place key={`key${rates.placeId}`}>
                    <PlaceImg src={rates.mainPhoto ? rates.mainPhoto : "img/logo192.png"} />
                    <PlaceDesc>
                        <PlaceName>{rates.name}</PlaceName>
                        <PlaceAddress>{rates.address}</PlaceAddress>
                        <Stats> Statystyki z ostatnich {displayedDays} dni:</Stats>
                        <NumOfComments>Liczba komentarzy: {rates.numOfComments}</NumOfComments>
                        <AverageRating>Średnia ocena: {rates.averageValue}</AverageRating>

                    </PlaceDesc>
                </Place>
            )}
            </PlacesContainer>
            
        </>
    )
}

export default StatsPage;