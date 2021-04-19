import React, {useEffect, useState} from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form';
import Layout from "../Layout/index"
import componentStyles from "./styles";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactHtmlParser from 'react-html-parser'; 
import { localStorageService } from "../../services/localStorageService"

const PlacePage = (props) => {


    const { register, handleSubmit, errors, reset } = useForm();
    const placeId = props.location.state;
    const[place, setPlace] = useState(true)
    const[ratings, setRatings] = useState()
    const[comment, setComment] = useState()
    const { PlacesContainer, Place, PlaceName, PlaceAddress, PlaceCategory, PlaceNumOfVisits, PlaceDesc, PlaceImg, PlaceDescription, RatingsContainer, AddRatingContainer,
        Rating, PlaceContainer, RatingComment, RatingDate, RatingUsername, RatingValue, RatingTop, RatingBottom, EditButton, Navivation,AddRatingInput, 
        RatingCommentArea, RatingForm, RatingSubmit } = componentStyles;

    const { role, username, userId } = localStorageService // 0 admin
    useEffect(() => {
        Axios.get(`/place/${placeId}`).then(res => setPlace(res.data))
        Axios.get(`/rating/getRatings/${placeId}`).then(res => setRatings(res.data))
    },[])

    const deleteRating = (ratingId) => {
        Axios.delete(`/rating/${ratingId}`);
        setRatings(ratings.filter(x => x.ratingId != ratingId));
    }

    const addRating = (data) => {
        const request = {
            ratingDate: new Date(),
            comment: comment,
            value: data.value,
            placeId: placeId,
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
                    { place  &&
                        <PlaceContainer>
                            <Place>
                                <PlaceImg src="logo192.png" />
                                <PlaceDesc>
                                    <PlaceName>{place.name}</PlaceName>
                                    <Navivation href={`https://www.google.com/maps/search/?api=1&query=${place.attitude},${place.latitude}`} target="_blank">nawiguj</Navivation>
                                    <PlaceAddress>{place.address}</PlaceAddress>
                                    <PlaceCategory>kategoria :  {place.categoryName}</PlaceCategory>
                                    <PlaceDescription>opis : {place.description}</PlaceDescription>
                                </PlaceDesc>
                            </Place>
                            {ratings &&
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
                                                {rating.isVisible ? <>{ReactHtmlParser(rating.comment)}</> : "użytkownik zablokowany"}
                                            </RatingComment>
                                        </Rating>
                                        )}
                                    </RatingsContainer>
                                    {console.log(role)}
                                    {role !== "2" ?
                                        <RatingForm onSubmit={handleSubmit(addRating)}>
                                            ocena : <AddRatingInput type="number" {...register('value', {required:true})}/>
                                            <AddRatingInput defaultValue={place.placeId} type="hidden" {...register('placeId')}/>
                                            komentarz: <ReactQuill theme="snow" value={comment || ''} onChange={setComment}/>
                                            <RatingSubmit type="submit">dodaj komentarz</RatingSubmit>
                                        </RatingForm> :
                                        <>
                                        Zostałeś zablokowany skontaktuj się z administratorem
                                        </>
                                    }   
                                </>
                            }
                        </PlaceContainer>
                    }
            </PlacesContainer>
        </Layout>
    )
}

export default PlacePage;