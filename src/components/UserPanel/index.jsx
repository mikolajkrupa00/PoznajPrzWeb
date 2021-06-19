import React, {useEffect, useState} from "react";
import Axios from "axios";
import Layout from "../Layout/index"
import componentStyles from "./styles";
import { localStorageService } from "../../services/localStorageService"
import {useHistory} from "react-router-dom"
//import MyPlacesComponent from "../Places/index"
//import MyPlacesStyles from "../Places/styles"



const UserPanel = () => {
    ///kopiowanie//
    
    
    const history = useHistory();
    const [wybor, setWybor] = useState(0);
    //to było na dole nad komentarze
    const {role, username,userId} = localStorageService
    const[userData, setUserData] = useState();
    const[visitedPlaces, setVistedPlaces] = useState("");
    const[ratedPlaces, setRatedPlaces] = useState("");
    
    const {ProfileIntro,Button, Down, ButtonsWrapper,ButtonsWrapper2,  PlaceDetails, PlaceComment, PlaceLabel, PlaceRating, PlacesContainer, Place, PlaceName, PlaceAddress, PlaceImgDiv, PlaceImg, } = componentStyles
    


    useEffect(() => {
        Axios.get(`/user/${userId}`).then(res => setUserData(res.data))
        Axios.get(`/visit/getVisitedPlaces/${userId}`).then(res => setVistedPlaces(res.data))
        Axios.get(`/rating/getRatedPlaces/${userId}`).then(res => setRatedPlaces(res.data))
    },[])

    const MyPlaces = () => {
        return(
        <div>
            <div style={{
                margin: "30px",
            }}>Miejsca odwiedzone przez Ciebie:</div>
            
    
                <PlacesContainer>
                    {visitedPlaces ? visitedPlaces.map(place => 
                    <Place  onClick={() => history.push("place", place.placeId)}>
                    <PlaceImgDiv>
                        <PlaceImg src="img/logo192.png" />
                    </PlaceImgDiv>
                        <PlaceDetails>
                            <PlaceName>
                            {place.name}
                            </PlaceName>
                            <PlaceAddress>
                            {place.address}
                            </PlaceAddress>
                        </PlaceDetails>
                    </Place>)
                    :"Nie odwiedziłeś jeszcze żadnego miejsca!"
                        
                    }
                    
                </PlacesContainer>
        </div>
        )
    }


    const MyComments = () => {
        return(
        <div>
            <div style={{
                margin: "30px",
            }}>Miejsca skomentowane przez Ciebie:</div>
            
    
                <PlacesContainer>
                    {ratedPlaces ? ratedPlaces.map(place => 
                    <Place  onClick={() => history.push("place", place.placeId)}>
                    <PlaceImgDiv>
                        <PlaceImg src="img/logo192.png" />
                    </PlaceImgDiv>
                        <PlaceDetails>
                            <PlaceName>
                                {place.name}
                            </PlaceName>
                            <PlaceAddress>
                                <PlaceLabel>Adres</PlaceLabel><br/>
                                {place.address}
                            </PlaceAddress>
                            <PlaceComment>
                                <PlaceLabel>Komentarz: </PlaceLabel><br/>{place.comment}
                            </PlaceComment>
                            <PlaceRating>
                                <PlaceLabel>Ocena</PlaceLabel><br/> 
                                {place.value}
                            </PlaceRating>
                        </PlaceDetails>
                    </Place>)
                    :"Nie skomentowałeś jeszcze żadnego miejsca!"
                        
                    }
                    
                </PlacesContainer>
        </div>
        )
    }

  
    return(
        
        <Layout>
            
            
            
            <div>
            <ProfileIntro>
            <Down>
            <ButtonsWrapper>
            <Button 
            onClick={() => history.push("profile")}
            inputColor="white"><img style={{width:"33px", height:"33px",borderRadius:"80px"}}
            src="https://cdn2.iconfinder.com/data/icons/web-ui-16/33/ui-05-512.png"
            alt="zdjecie blokady"/></Button>
            </ButtonsWrapper>
            </Down>
                <div style={{
                    display:"flex",
                    justifyContent:"center",
                    margin:"10px 10px",
                    width:"100%",
                    borderBotto:"10px whitesmoke",
                }}>
                    <img style={{width:"160px", height:"160px",borderRadius:"80px"}}
                    src="https://image.flaticon.com/icons/png/512/50/50050.png"
                    alt="zdjecie profilowe"/>
                </div>
                <Down>
            <ButtonsWrapper>
            <Button 
            onClick={() => history.push("editprofile")}
            inputColor="white"> <img style={{width:"33px", height:"33px",borderRadius:"80px"}}
            src="https://www.iconpacks.net/icons/2/free-settings-icon-3110-thumb.png"
            alt="zdjecie ustawien"/></Button>
             </ButtonsWrapper>
            </Down>
            
            
            </ProfileIntro>
            <Down>
            <h1>{username}</h1>
            </Down>
                <div>
                    <h4 style={{background:"whitesmoke",display:"flex",justifyContent:"center",width:"100%"}}>
                        TWOJE STATYSTYKI
                    </h4>
                </div>
                <div>
                {wybor === 0 && 
                <ButtonsWrapper2>
                    <Button 
                    inputColor="gray"
                    className="ButtonMyComments"
                    onClick={() => setWybor(1)}><img style={{width:"30px", height:"30px",borderRadius:"80px"}}
                    src="https://cdn0.iconfinder.com/data/icons/free-daily-icon-set/512/Comments-512.png"
                    alt="zdjecie komentarzy"/>Dodane komentarze</Button>
                    <Button 
                    inputColor="silver"
                    className="ButtonMyPlaces"
                    onClick={() => setWybor(0)}><img style={{width:"30px", height:"30px",borderRadius:"80px"}}
                    src="https://img.icons8.com/pastel-glyph/2x/place-marker--v2.png"
                    alt="zdjecie miejsc"/>Odwiedzone miejsca</Button>
                </ButtonsWrapper2>
                }
                {wybor === 1 && 
                <ButtonsWrapper2>
                    <Button 
                    inputColor="silver"
                    className="ButtonMyComments"
                    onClick={() => setWybor(1)}><img style={{width:"30px", height:"30px",borderRadius:"80px"}}
                    src="https://cdn0.iconfinder.com/data/icons/free-daily-icon-set/512/Comments-512.png"
                    alt="zdjecie komentarzy"/>Dodane komentarze</Button>
                    <Button 
                    inputColor="gray"
                    className="ButtonMyPlaces"
                    onClick={() => setWybor(0)}><img style={{width:"30px", height:"30px",borderRadius:"80px"}}
                    src="https://img.icons8.com/pastel-glyph/2x/place-marker--v2.png"
                    alt="zdjecie miejsc"/>Odwiedzone miejsca</Button>
                </ButtonsWrapper2>
                }
                    
                </div>
            
        {wybor === 0 && <MyPlaces></MyPlaces>
        }
        {wybor === 1 && <MyComments></MyComments>
        }
        </div>
        </Layout>
    )
}

export default UserPanel

