import React, {useEffect, useState} from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form';
import Layout from "../Layout/index"
import componentStyles from "./styles";
import { localStorageService } from "../../services/localStorageService"

const Map = () => {

        
    const { MapWrapper } = componentStyles;

    
    
    useEffect(() => {
        //Axios.get("/place/getPlaces").then(res => setPlaces(res.data))
    },[])




    return(
        <Layout>
            <MapWrapper>TU BEDZIE MAPA</MapWrapper>
        </Layout>
    )


}

export default Map;