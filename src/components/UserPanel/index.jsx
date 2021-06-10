import ReactDOM from 'react-dom';
import React, {render, useEffect, useState, useRef} from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form';
import Layout from "../Layout/index"
import componentStyles from "./styles";
import { localStorageService } from "../../services/localStorageService"
import {useHistory} from "react-router-dom"
import {BiSearch} from "react-icons/bi"
import MyPlacesComponent from "../Places/index"
import MyPlacesStyles from "../Places/styles"
import MyCommentsComponent from "../Place/index"
import MyCommentsStyles from "../Place/styles"



const UserPanel = (user, place) => {
    ///kopiowanie//
    
    let iconStyles = { fontSize: "20px" };
    
    const inputRef = useRef();
    const history = useHistory();
    const [wybor, setWybor] = useState(0);
    const [places, setPlaces] = useState()
    const [placeCategryTpes, setPlaceCategryTpes] = useState()
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [filterMessage, setFilterMessage] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [clickedCategory, setClickedCategory] = useState("")
    //to było na dole nad komentarze
    const {username,userId} = localStorageService
    const[userData, setUserData] = useState();
    
    const {Wrapper,ProfileIntro, Photo, ProfileName, ProfileActive, 
        ProfileEmail, ProfileDesc, ProfileImg,  Button, ButtonsWrapper} = componentStyles
    //
    const { CategoriesFilterContainer, CategoriesFilterItem, SearchBarContainer, SearchBarRow, SearchBarInput, SearchBarButton,
        PlacesContainer, Place, PlaceName, PlaceAddress, PlaceCategory, PlaceNumOfVisits, PlaceDesc, PlaceImgDiv, PlaceImg, Navigation, 
        } = MyCommentsStyles;
    


    useEffect(() => {
        Axios.get("/place/getPlaces").then(res => setPlaces(res.data))
        Axios.get("/Category").then(res => setPlaceCategryTpes(res.data))
        Axios.get(`/user/${userId}`).then(res => setUserData(res.data))
    },[])

    const MyPlaces = () => {
        return(
            <div>
                <div style={{
                 margin: "30px",
             }}>Miejsca odwiedzone przez Ciebie!</div>
    <div/>
 <MyPlacesComponent/>
            </div>
           
        )
    }
    // const MyPlaces =(place) => {
    //     return(
    //     <div>
    //         <div style={{
    //             margin: "30px",
    //         }}>Miejsca odwiedzone przez Ciebie!</div>
    //         <CategoriesFilterContainer>
    //                 {placeCategryTpes && placeCategryTpes.map(category => 
    //                     <CategoriesFilterItem onClick={(e) => {categoryFilter(e)}}> {category.name} </CategoriesFilterItem>                        
    //                 )}               
    //             </CategoriesFilterContainer>
    
    
    //             <SearchBarContainer>
    //                 <SearchBarRow>
    //                     <SearchBarInput ref={inputRef} onChange={(e) => {searchFunction(e.target.value, 'input')}}></SearchBarInput>
    //                     <SearchBarButton onClick={() => {console.log(inputRef.current)}}><BiSearch style={iconStyles}/></SearchBarButton>
    //                 </SearchBarRow>
    
    //                 <SearchBarRow>
    //                     {filterMessage}
    //                 </SearchBarRow>
    //             </SearchBarContainer>
    
                     
    
    //             <PlacesContainer>
                    
    //                 {(filteredPlaces.length > 0) ?  
    //                     (
    //                         filteredPlaces.map(place => renderPlaceCard(place))                                 
    //                     ) 
    //                 : 
    //                     (
                            
    //                         (filteredPlaces.length === 0 && searchTerm.length) > 0 ?
    //                         (
    //                             ''  //message: brak wynikow
    //                         )
    //                         :
    //                         (
    //                             places && places.map(place => renderPlaceCard(place))
    //                         )
                            
    //                     )
    //                 }
    //             </PlacesContainer>
    //     </div>
    //     )
    // }


    const MyComments = () =>
    {
        return(
            <div>
                <div style={{
                margin: "30px",
            }}>Komentarze dodane przez Ciebie!</div>
    {/* <MyCommentsComponent/> */}
            </div>
        )
    }


    // const searchFunction = (input, source) => {  
    //     if(source === "input"){
    //         console.log('test1')
    //         if(clickedCategory !== "" && clickedCategory !== undefined){
    //             console.log('test2')
    //             ReactDOM.findDOMNode(clickedCategory).style.backgroundColor = "white"
    //             setClickedCategory(undefined)
    //         }               
    //     }
       

    //     input = input.toLowerCase()
    //     setSearchTerm(input);
        
    //     if (input === undefined || input === "" ){
    //         setFilteredPlaces([])
    //         setFilterMessage("")
    //         return
    //     }

    //     const filtered  = places.filter(place =>    place.name.toLowerCase().includes(input) || 
    //                                                 place.categoryName.toLowerCase().includes(input) || 
    //                                                 place.address.toLowerCase().includes(input))

    
    //     if(filtered.length){
    //         setFilteredPlaces(filtered)
    //         setFilterMessage("Pasujące wyniki: " + filtered.length)
    //     }
    //     else{
    //         setFilteredPlaces([])
    //         setFilterMessage("Brak wyników")     
    //     }
        
    // }
    

    // const categoryFilter = (e) => {
        
    //     const unclicked = "white"
    //     const clicked = "rgb(237, 246, 255)"


        

    //     //pierwsze klikniecie nic nie ma znaczenia
    //     if(clickedCategory === "" || clickedCategory === undefined){
    //         ReactDOM.findDOMNode(e.target).style.backgroundColor = clicked
    //         setClickedCategory(e.target)
    //         searchFunction(e.target.innerText)
    //         inputRef.current.value = e.target.innerText
    //         return
    //     }

    //     //odklikniecie tego co bylo klikniete        
    //     if(clickedCategory === e.target){
    //         setClickedCategory(undefined)
    //         searchFunction("")
    //         inputRef.current.value = ""
    //         ReactDOM.findDOMNode(e.target).style.backgroundColor = unclicked
    //         return
    //     }

    //     //zostal klikniety nowy guzik
    //     console.log("tu dojde w ostatecznosci")
    //     ReactDOM.findDOMNode(e.target).style.backgroundColor = clicked
    //     ReactDOM.findDOMNode(clickedCategory).style.backgroundColor = unclicked
    //     setClickedCategory(e.target)
    //     searchFunction(e.target.innerText)
    //     inputRef.current.value = e.target.innerText
           
    // }
    // const renderPlaceCard = (place) => {

    //     return(
    //         <Place onClick={() => history.push("place", place.placeId)}>
    //             <PlaceImgDiv>
    //                 <PlaceImg src="img/logo192.png" />
    //             </PlaceImgDiv>
                                
    //             <PlaceDesc>
    //                 <PlaceName>{place.name}</PlaceName>
    //                 <PlaceAddress>{place.address}</PlaceAddress>
    //                 <PlaceCategory>kategoria:  {place.categoryName}</PlaceCategory>
    //                 <Navigation href={`https://www.google.com/maps/search/?api=1&query=${place.attitude},${place.latitude}`} target="_blank">Wyznacz trasę</Navigation>                           
    //             </PlaceDesc>
    //         </Place>
    //     )
    // }
    
    

    


  
    return(
        
        <Layout>
            <div>
            <ProfileIntro>
                <div style={{
                    display:"flex",
                    justifyContent:"center",
                    margin:"0px 0px",
                    width:"100%",
                    borderBotto:"0px solid grey",
                }}>
                    <img style={{width:"160px", height:"160px",borderRadius:"80px"}}
                    src="https://ukorzeni.pl/wp-content/uploads/2020/01/dojrza%C5%82y-m%C4%99%C5%BCczyzna.png"/>
                </div>

            </ProfileIntro>
            <h1>{username}</h1>
            <Button 
            onClick={() => history.push("editprofile")}
            inputColor="blue"> Edytuj profil</Button>
            <div>
                    <div style={{display:"flex",justifyContent:"left",width:"100%"}}>
                        <h3>Status: Aktywny</h3>
                    </div>
                    <div style={{display:"flex",justifyContent:"left",width:"100%"}}>
                         <h3>Ostatnia aktywność: 24.05.2021</h3>
                    </div>
                   
                    <div style={{display:"flex",justifyContent:"left",width:"100%"}}>
                        {userData && <h3>E-mail: {userData.email} </h3> }                        
                    </div>
                </div>
                <div>
                    <ButtonsWrapper>
                    <Button 
                    inputColor="green"
                    className="ButtonMyComments"
                    onClick={() => setWybor(1)}>Moje komentarze</Button>
                    <Button 
                    inputColor="green"
                    className="ButtonMyPlaces"
                    onClick={() => setWybor(0)}>Odwiedzone miejsca</Button>
                    </ButtonsWrapper>
                </div>
            </div>
            
        {wybor == 0 && <MyPlaces></MyPlaces>}
        {wybor == 1 && <MyComments/>}
        </Layout>
    )
}

export default UserPanel

