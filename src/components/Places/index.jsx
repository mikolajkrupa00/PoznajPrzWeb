import React, {useEffect, useState} from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form';
import Layout from "../Layout/index"
import components from "./styles";
import { localStorageService } from "../../services/localStorageService"

const PlacesPage = () => {
    const { register, handleSubmit, errors, reset } = useForm();
    const[places, setPlaces] = useState()
    const[ratings, setRatings] = useState()
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
    


    return(
        <Layout>
            <PlacesContainer>
                {places && places.map(place => 
                    <PlaceContainer>
                        <Place onClick={() => showRatings(place.placeId)}>
                            <PlaceImg src="logo192.png" />
                            <PlaceDesc>
                                <PlaceName>{place.categoryName}</PlaceName>
                                <Navivation href={`https://www.google.com/maps/search/?api=1&query=${place.attitude},${place.latitude}`} target="_blank">nawiguj</Navivation>
                                <PlaceAddress>{place.address}</PlaceAddress>
                                <PlaceCategory>kategoria :  {place.categoryName}</PlaceCategory>
                                <PlaceDescription>opis : {place.description}</PlaceDescription>
                            </PlaceDesc>
                        </Place>
                        {ratings && place.placeId === expandedId &&
                            <>
                                <RatingsContainer>
                                    {ratings.map((rating, index) => 
                                    <Rating>
                                        <RatingTop>
                                            <RatingUsername>{rating.username}</RatingUsername>
                                            <RatingDate>{rating.ratingDate}</RatingDate>
                                            <RatingValue>ocena: {rating.value}</RatingValue>
                                            {(role==='0' || username===rating.username) &&<EditButton onClick={() => deleteRating(rating.ratingId)}>usuń</EditButton>}
                                            {role==='0' && <EditButton onClick={() => blockUser(rating.username)}>zablokuj</EditButton>}
                                        </RatingTop>
                                        <RatingComment>
                                            {rating.isVisible ? <>{rating.comment}</> : "użytkownik zablokowany"}
                                        </RatingComment>
                                    </Rating>
                                    )}
                                </RatingsContainer>
                                {console.log(role)}
                                {role !== "2" ?
                                    <RatingForm onSubmit={handleSubmit(addRating)}>
                                        ocena : <AddRatingInput type="number" {...register('value', {required:true})}/>
                                        <AddRatingInput defaultValue={place.placeId} type="hidden" {...register('placeId')}/>
                                        komentarz: <RatingCommentArea  {...register('comment', {required:true})}/>
                                        <RatingSubmit type="submit">dodaj komentarz</RatingSubmit>
                                    </RatingForm> :
                                    <>
                                    Zostałeś zablokowany skontaktuj się z administratorem
                                    </>
                                }   
                            </>
                        }
                    </PlaceContainer>
                )}
            </PlacesContainer>
        </Layout>
    )
}

export default PlacesPage;