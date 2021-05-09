import React, {useEffect, useState} from "react";
import Axios from "axios";
import Layout from "../Layout/index"
import componentStyles from "./styles";

const StatsPage = () => {
    const[visits, setVisits] = useState()
    const [ratings, setRatings] = useState('')
    const [placeName,setPlaceName] = useState('')
    const [filteredPlaces,setfilteredPlaces] = useState('')
    const [days,setDays] = useState('')
    const [filteredDays,setFilteredDays] = useState('')
    const { PlacesContainer, Place, PlaceName, PlaceAddress, PlaceCategory, PlaceNumOfVisits, PlaceDesc, PlaceImg, AverageRating, NumOfComments, DaysInput, PlaceInput, Input, Button, Stats} = componentStyles;
    
    const handleDays = (e) =>{
        setDays(e.target.value);
        }
    const handlePlaceName = (e) =>{
        setPlaceName(e.target.value);
        }
    const handleFilterDays = () =>{
        
        setFilteredDays(days);
        Axios.get(`/visit/getStats/${days}`).then(res => setVisits(res.data));
        Axios.get(`/rating/getRatingsStats/${days}`).then(res => setRatings(res.data));
    }
    const filterPlace = () =>{
        const filtered = visits.filter(item => item.categoryName.toLowerCase().includes(placeName.toLowerCase()))
        setVisits(filtered);
        if(placeName==='') Axios.get(`/visit/getStats/${days}`).then(res => setVisits(res.data));
    }
    const stats = (placeId) =>{
        const record = ratings.filter(item=>item.placeId==placeId)
        return(
            <>
                <NumOfComments>Liczba komentarzy: {record[0].numOfComments}</NumOfComments>
                <AverageRating>Średnia ocena: {record[0].averageValue}</AverageRating>
            </>
        )
    }

    return(
        <Layout>
            
            <PlacesContainer>
            <PlaceInput>
                    <Input type="text" placeholder="Fraza w nazwie miejsca" value={placeName} onChange={handlePlaceName}/>
                    <Button onClick={filterPlace}>Filtruj</Button>
            </PlaceInput>
            <DaysInput>
                    <Input type="text" placeholder="Liczba dni" value={days} onChange={handleDays}/>
                    <Button onClick={handleFilterDays}>Filtruj</Button>
            </DaysInput>
            
            
                {visits && visits.map(visit => 
                    <Place>
                        <PlaceImg src="img/logo192.png" />
                        <PlaceDesc>
                            <PlaceName>{visit.categoryName}</PlaceName>
                            <PlaceAddress>{visit.address}</PlaceAddress>
                            <PlaceCategory>Kategoria :  {visit.categoryName}</PlaceCategory>
                            <Stats> Statystyki z ostatnich {filteredDays} dni:</Stats>
                            <PlaceNumOfVisits>Liczba odwiedzin  {visit.numOfVisits}</PlaceNumOfVisits>
                            {ratings && stats(visit.placeId)}
                            
                        </PlaceDesc>
                    </Place>
                )}
            </PlacesContainer>
            
        </Layout>
    )
}

export default StatsPage;