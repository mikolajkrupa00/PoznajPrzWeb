import ReactDOM from 'react-dom';
import React, {useEffect, useState, useRef} from "react";
import Axios from "axios";
import Layout from "../Layout/index"
import componentStyles from "./styles";
import {useHistory} from "react-router-dom";
import {BiSearch} from "react-icons/bi"

const PlacesPage = () => {

    let iconStyles = { fontSize: "20px" };
    const inputRef = useRef();
    const history = useHistory();
    const [places, setPlaces] = useState()
    const [placeCategryTpes, setPlaceCategryTpes] = useState()
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [filterMessage, setFilterMessage] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [clickedCategory, setClickedCategory] = useState("")
       
    const { CategoriesFilterContainer, CategoriesFilterItem, SearchBarContainer, SearchBarRow, SearchBarInput, SearchBarButton,
        PlacesContainer, Place, PlaceName, PlaceAddress, PlaceCategory, PlaceNumOfVisits, PlaceDesc, PlaceImgDiv, PlaceImg, Navigation, 
        } = componentStyles;
    
    
    useEffect(() => {
        Axios.get("/place/getPlaces").then(res => setPlaces(res.data))
        Axios.get("/Category").then(res => setPlaceCategryTpes(res.data))
    },[])

    const searchFunction = (input, source) => {
        
        if(source === "input"){
            console.log('test1')
            if(clickedCategory !== "" && clickedCategory !== undefined){
                console.log('test2')
                ReactDOM.findDOMNode(clickedCategory).style.backgroundColor = "white"
                setClickedCategory(undefined)
            }               
        }
       

        input = input.toLowerCase()
        setSearchTerm(input);
        
        if (input === undefined || input === "" ){
            setFilteredPlaces([])
            setFilterMessage("")
            return
        }

        const filtered  = places.filter(place =>    place.name.toLowerCase().includes(input) || 
                                                    place.categoryName.toLowerCase().includes(input) || 
                                                    place.address.toLowerCase().includes(input))

    
        if(filtered.length){
            setFilteredPlaces(filtered)
            setFilterMessage("Pasujące wyniki: " + filtered.length)
        }
        else{
            setFilteredPlaces([])
            setFilterMessage("Brak wyników")     
        }
        
    }

    const categoryFilter = (e) => {
        
        const unclicked = "white"
        const clicked = "rgb(237, 246, 255)"


        

        //pierwsze klikniecie nic nie ma znaczenia
        if(clickedCategory === "" || clickedCategory === undefined){
            ReactDOM.findDOMNode(e.target).style.backgroundColor = clicked
            setClickedCategory(e.target)
            searchFunction(e.target.innerText)
            inputRef.current.value = e.target.innerText
            return
        }

        //odklikniecie tego co bylo klikniete        
        if(clickedCategory === e.target){
            setClickedCategory(undefined)
            searchFunction("")
            inputRef.current.value = ""
            ReactDOM.findDOMNode(e.target).style.backgroundColor = unclicked
            return
        }

        //zostal klikniety nowy guzik
        console.log("tu dojde w ostatecznosci")
        ReactDOM.findDOMNode(e.target).style.backgroundColor = clicked
        ReactDOM.findDOMNode(clickedCategory).style.backgroundColor = unclicked
        setClickedCategory(e.target)
        searchFunction(e.target.innerText)
        inputRef.current.value = e.target.innerText
           
    }

    const renderPlaceCard = (place) => {

        return(
            <Place onClick={() => history.push("place", place.placeId)}>
                <PlaceImgDiv>
                    <PlaceImg src="img/logo192.png" />
                </PlaceImgDiv>
                                
                <PlaceDesc>
                    <PlaceName>{place.name}</PlaceName>
                    <PlaceAddress>{place.address}</PlaceAddress>
                    <PlaceCategory>kategoria:  {place.categoryName}</PlaceCategory>
                    <Navigation href={`https://www.google.com/maps/search/?api=1&query=${place.attitude},${place.latitude}`} target="_blank">Wyznacz trasę</Navigation>                           
                </PlaceDesc>
            </Place>
        )
    }

   
    return(
        <Layout>
            
            <CategoriesFilterContainer>
                {placeCategryTpes && placeCategryTpes.map(category => 
                    <CategoriesFilterItem onClick={(e) => {categoryFilter(e)}}> {category.name} </CategoriesFilterItem>                        
                )}               
            </CategoriesFilterContainer>


            <SearchBarContainer>
                <SearchBarRow>
                    <SearchBarInput ref={inputRef} onChange={(e) => {searchFunction(e.target.value, 'input')}}></SearchBarInput>
                    <SearchBarButton onClick={() => {console.log(inputRef.current)}}><BiSearch style={iconStyles}/></SearchBarButton>
                </SearchBarRow>

                <SearchBarRow>
                    {filterMessage}
                </SearchBarRow>
            </SearchBarContainer>

                 

            <PlacesContainer>
                
                {(filteredPlaces.length > 0) ?  
                    (
                        filteredPlaces.map(place => renderPlaceCard(place))                                 
                    ) 
                : 
                    (
                        
                        (filteredPlaces.length === 0 && searchTerm.length) > 0 ?
                        (
                            ''  //message: brak wynikow
                        )
                        :
                        (
                            places && places.map(place => renderPlaceCard(place))
                        )
                        
                    )
                }
            </PlacesContainer>
            
        </Layout>
    )
}

export default PlacesPage;