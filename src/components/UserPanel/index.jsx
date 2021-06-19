import React, {useEffect, useState} from "react";
import Axios from "axios";
import Layout from "../Layout/index"
import componentStyles from "./styles";
import { localStorageService } from "../../services/localStorageService"
import {useHistory} from "react-router-dom"


import {VscLocation, VscComment} from "react-icons/vsc"





const UserPanel = () => {
  
    
    
    const history = useHistory();
    const [wybor, setWybor] = useState(0);
    const {role, username,userId} = localStorageService
    const[userData, setUserData] = useState();
    const[visitedPlaces, setVistedPlaces] = useState("");
    const[ratedPlaces, setRatedPlaces] = useState("");
    
    const {ProfileIntro, UsernameLabel, Button, Button2, Down, ButtonsWrapper,ButtonsWrapper2,  
        PlaceDetails, PlaceComment, PlaceLabel, PlaceRating, PlacesContainer, Place, PlaceName, 
        PlaceAddress, PlaceImgDiv, PlaceImg, } = componentStyles
    

    const iconStyles = {fontSize: "20px", marginRight: "5px"}

    useEffect(() => {
        Axios.get(`/user/${userId}`).then(res => setUserData(res.data))
        Axios.get(`/visit/getVisitedPlaces/${userId}`).then(res => setVistedPlaces(res.data))
        Axios.get(`/rating/getRatedPlaces/${userId}`).then(res => setRatedPlaces(res.data))
    },[])

    const MyPlaces = () => {
        return(
        <div>
            <div style={{ margin: "30px auto", fontSize: '19px'}}>
                Miejsca odwiedzone przez Ciebie:
            </div>
            
    
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
            <div style={{ margin: "30px auto", fontSize: '19px'}}>
                Miejsca skomentowane przez Ciebie:
            </div>
            
    
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
            <UsernameLabel>{username}</UsernameLabel>
            </Down>
                <div>
                    <h4 style={{background:"whitesmoke",display:"flex",justifyContent:"center",width:"100%", marginTop:"15px"}}>
                        TWOJE STATYSTYKI
                    </h4>
                </div>
                <div>
                
                <ButtonsWrapper2>   
                    <Button2 
                    inputColor={ wybor === 1 ? "rgb(0, 110, 230)" : "grey"}
                    className="ButtonMyComments"
                    onClick={() => setWybor(1)}>
                        <VscComment style={iconStyles}/>                      
                        Dodane komentarze</Button2>
                        
                    <Button2 
                    inputColor={ wybor === 0 ? "rgb(0, 110, 230)" : "grey"}
                    className="ButtonMyPlaces"
                    onClick={() => setWybor(0)}>
                        <VscLocation style={iconStyles}/>
                        
                    Odwiedzone miejsca</Button2>
                </ButtonsWrapper2>
                                    
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

