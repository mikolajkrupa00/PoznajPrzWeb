import React, {useEffect, useState} from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form';
import Layout from "../Layout/index"
import components from "./styles";
import { localStorageService } from "../../services/localStorageService";
import {useHistory} from "react-router-dom";

const PlacesPage = () => {
    const { register, handleSubmit, errors, reset } = useForm();
    const history = useHistory();
    const[places, setPlaces] = useState()
    const[ratings, setRatings] = useState()
    const[image, setImgae] = useState();
    const[expandedId, seExpandedId] = useState()
    const { PlacesContainer, Place, PlaceName, PlaceAddress, PlaceCategory, PlaceNumOfVisits, PlaceDesc, PlaceImg, PlaceDescription, RatingsContainer, AddRatingContainer,
        Rating, PlaceContainer, RatingComment, RatingDate, RatingUsername, RatingValue, RatingTop, RatingBottom, EditButton, Navivation,AddRatingInput, 
        RatingCommentArea, RatingForm, RatingSubmit } = components;

    const { role, username, userId } = localStorageService // 0 admin
    useEffect(() => {
        Axios.get("/place/getPlaces").then(res => setPlaces(res.data))
    },[])


    const showRatings  = (placeId) => {
        if(expandedId == placeId)
        {
            seExpandedId(null) 
            setRatings(null) 
            return;
        }
        seExpandedId(placeId)
        Axios.get(`/rating/getRatings/${placeId}`).then(res => setRatings(res.data))
    }

    const deleteRating = (ratingId) => {
        Axios.delete(`/rating/${ratingId}`);
        setRatings(ratings.filter(x => x.ratingId != ratingId));
    }

    const addRating = (data) => {
        const request = {
            ratingDate: new Date(),
            comment: data.comment,
            value: data.value,
            placeId: data.placeId,
            userId: userId
        }
        console.log(data)
        Axios.post("/rating", request).then(res => setRatings([...ratings,{
            ratingDate: request.ratingDate.toDateString(),
            ratingId: res.data.ratingId,
            comment: request.comment,
            value: +request.value,
            username: username,
            isVisible: true
        }]))
        reset()
    }

    const blockUser = (userId) => {
        Axios.put(`/user/blockUser/${userId}`)
    }
    
    const save = (data) =>{
        return <img src={process.env.PUBLIC_URL + data} />;
    }

    return(
        <Layout>
            <PlacesContainer>
                {places && places.map(place => 
                    <PlaceContainer>
                        <Place onClick={() => history.push("place", place.placeId)}>
                            <PlaceImg src="logo192.png" />
                            <PlaceDesc>
                                <PlaceName>{place.categoryName}</PlaceName>
                                <Navivation href={`https://www.google.com/maps/search/?api=1&query=${place.attitude},${place.latitude}`} target="_blank">nawiguj</Navivation>
                                <PlaceAddress>{place.address}</PlaceAddress>
                                <PlaceCategory>kategoria :  {place.categoryName}</PlaceCategory>
                                <PlaceDescription>opis : {place.description}</PlaceDescription>
                            </PlaceDesc>
                        </Place>
                    </PlaceContainer>
                )}
            </PlacesContainer>
            
        </Layout>
    )
}

export default PlacesPage;