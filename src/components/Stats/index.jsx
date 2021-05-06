import React, {useEffect, useState} from "react";
import Axios from "axios";
import Layout from "../Layout/index"
import componentStyles from "./styles";

const StatsPage = () => {
    const[visits, setVisits] = useState()
    const [ratings, setRatings] = useState()
    const[expanded, seExpanded] = useState()
    const { PlacesContainer, Place, PlaceName, PlaceAddress, PlaceCategory, PlaceNumOfVisits, PlaceDesc, PlaceImg, PlaceId} = componentStyles;
    useEffect(() => {
        Axios.get("/visit/getStats/365").then(res => setVisits(res.data));
        Axios.get(`/Place/getPlaces/1c45f396-84f8-49cb-9d1b-849de68cdd0d`).then(res => setRatings(res.data));
    },[])

    return(
        <Layout>
            <PlacesContainer>
                {visits && visits.map(visit => 
                    <Place>
                        <PlaceImg src="logo192.png" />
                        <PlaceDesc>
                        {console.log(visit)}
                            <PlaceName>{visit.categoryName}</PlaceName>
                            <PlaceAddress>{visit.address}</PlaceAddress>
                            <PlaceCategory>kategoria :  {visit.categoryName}</PlaceCategory>
                            <PlaceNumOfVisits>liczba odwiedzin w ostatnich 365 dniach:  {visit.numOfVisits}</PlaceNumOfVisits>
                            {console.log(ratings)}
                        </PlaceDesc>
                    </Place>
                )}
            </PlacesContainer>
        </Layout>
    )
}

export default StatsPage;