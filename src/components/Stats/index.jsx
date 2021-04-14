import React, {useEffect, useState} from "react";
import Axios from "axios";
import Layout from "../Layout/index"
import componentStyles from "./styles";

const StatsPage = () => {
    const[visits, setVisits] = useState()
    const[expanded, seExpanded] = useState()
    const { PlacesContainer, Place, PlaceName, PlaceAddress, PlaceCategory, PlaceNumOfVisits, PlaceDesc, PlaceImg, PlaceId} = componentStyles;
    useEffect(() => {
        Axios.get("/visit/getStats/365").then(res => setVisits(res.data))
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
                        </PlaceDesc>
                    </Place>
                )}
            </PlacesContainer>
        </Layout>
    )
}

export default StatsPage;