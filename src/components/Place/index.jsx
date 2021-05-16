import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import Layout from "../Layout/index"

import componentStyles from "./styles";
import ReactHtmlParser from 'react-html-parser';
import { localStorageService } from "../../services/localStorageService"
import { BiLeftArrowAlt } from 'react-icons/bi';
import { VscChromeClose } from 'react-icons/vsc'
import { BsThreeDots } from 'react-icons/bs'
import { MdKeyboardArrowUp } from 'react-icons/md'

const PlacePage = (props) => {


	const { register, handleSubmit, errors, reset } = useForm();
	let iconStyles = { color: '#303030', fontSize: "25px" };
	const placeId = props.location.state;
	const history = useHistory();
	const [place, setPlace] = useState(true)
	const [ratings, setRatings] = useState()
	const [comment, setComment] = useState()
	const [file, _setFile] = useState(null);
    const [addComment, setAddComment] = useState(false)
    const [commentSection, setCommentSection] = useState('')
    const [ratingPanelMessage, setRatingPanelMessage] = useState('')
    const [descriptionHeight, setDescriptionHeight] = useState('250px')
    
	const { PlacePageContainer, TopBar, GoBack, PlaceIntro, Gallery, Photo, PlaceName, PlaceAddress, 
        PlaceCategory, PlaceNumOfVisits, PlaceDesc, PlaceImg, PlaceDescription, 
        DescriptionContent,  DescriptionButton,
        RatingsContainer, RatingsPanel, RatingsPanelMessages, AddRatingContainer, RatingSubmitWrapper, RatingFormTopPanel,
        Rating, RatingComment, RatingDate, RatingUsername, RatingValue, RatingTop, 
        RatingBottom, RatingOptions, EditButton, Navigation,AddRatingInput,  RatingFormLable,
        RatingFormRaitingWrapper, RatingFormAddImageWrapper, FileInput,
        RaitingTextarea, RatingForm, RatingSubmit, Button, ButtonsWrapper} = componentStyles;

	const { role, username, userId } = localStorageService // 0 admin
	useEffect(() => {
		Axios.get(`/place/${placeId}`).then(res => setPlace(res.data))
		Axios.get(`/rating/getRatings/${placeId}`).then(res => setRatings(res.data))
	}, [])

	const deleteRating = (ratingId) => {
		Axios.delete(`/rating/${ratingId}`);
		setRatings(ratings.filter(x => x.ratingId != ratingId));
	}

	const addRating = (data) => {
		var request = new FormData();
		request.append('ratingDate', new Date().toDateString());
		request.append('comment', comment);
		request.append('value', data.value);
		request.append('userId', userId);
		request.append('placeId', placeId);
		request.append('file', file);

		Axios.request({
			url: "/rating",
			method: 'post',
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			data: request,
			onUploadProgress: e => console.log(e)
		})
		.then(res => setRatings([...ratings, {
			ratingDate: new Date().toDateString(),
			ratingId: res.data.ratingId,
			comment: request.comment,
			value: +request.value,
			username: username,
			isVisible: true
		}]));

		reset();
	}

	const blockUser = (username) => {
		console.log(username);
		Axios.put(`/user/blockUser/${username}`)
	}

	const setFile = e => {
		const { files } = e.target;

		if(files.length === 1) {
			const file = files[0];

			_setFile(file);
		}
	}

    const openCommentSection = () =>{

        if(!username){
            if(ratingPanelMessage === ""){
                setRatingPanelMessage("Musisz być zalogowany, żeby dodać komentarz!")
                setTimeout(() => {setRatingPanelMessage("")}, 3000)
            }
            return
        }

        if(role === 2){
            if(ratingPanelMessage === ""){
                setRatingPanelMessage("Możliwość dodawania komentarzy została dla Ciebie zablokowana. Powód: ...{powód blokady}...")
                setTimeout(() => {setRatingPanelMessage("")}, 6000)
            }
            return
        }

        setCommentSection(true)

    }

    return(
        <Layout>

            { place  &&
                <PlacePageContainer>
                    <TopBar>
                        <GoBack onClick={() => history.goBack()}><BiLeftArrowAlt style={iconStyles} /></GoBack>
                    </TopBar>

                    <PlaceIntro>
                        <PlaceImg src="logo192.png"/>
                        <PlaceDesc>
                            <PlaceName>{place.name}</PlaceName>
                            <PlaceAddress>{place.address}</PlaceAddress>
                            <PlaceCategory>Kategoria :  {place.categoryName}</PlaceCategory>
                            
                            <ButtonsWrapper>
                                <Button>
                                    {/* TODO: dodac pozycje uzytkownika do url w Google zeby szukalo drogi zjego lokalizacji*/}
                                    <Navigation href={`https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`} target="_blank">Nawiguj</Navigation>
                                </Button>

                                <Button inputColor="green">Cos jeszcze?</Button>
                                <Button inputColor="orange">Kolejny BTN?</Button>
                                <Button inputColor="purple">Ostatni BTN?</Button>

                            </ButtonsWrapper>
                            

                        </PlaceDesc>
                    </PlaceIntro>

                    <Gallery>
                        <Photo></Photo>
                        <Photo></Photo>
                        <Photo></Photo>
                        <Photo></Photo>
                        <Photo></Photo>
                        <Photo></Photo>
                    </Gallery>

                    <PlaceDescription>
                        <DescriptionContent inputHeigh={descriptionHeight}>
                            {/* {place.description} */}
                            <p>
                            Lorem Ipsum jest tekstem stosowanym jako przykładowy
                            wypełniacz w przemyśle poligraficznym. Został po raz
                            pierwszy użyty w XV w. przez nieznanego drukarza do
                            wypełnienia tekstem próbnej książki. Pięć wieków później
                            zaczął być używany przemyśle elektronicznym, pozostając
                            praktycznie niezmienionym. Spopularyzował się w latach 60.
                            XX w. wraz z publikacją arkuszy Letrasetu, zawierających
                            fragmenty Lorem Ipsum, a ostatnio z zawierającym różne
                            wersje Lorem Ipsum oprogramowaniem przeznaczonym do
                            realizacji druków na komputerach osobistych, jak Aldus
                            PageMaker.
                            </p>
                            <p>
                            Lorem Ipsum jest tekstem stosowanym jako przykładowy
                            wypełniacz w przemyśle poligraficznym. Został po raz
                            pierwszy użyty w XV w. przez nieznanego drukarza do
                            wypełnienia tekstem próbnej książki. Pięć wieków później
                            zaczął być używany przemyśle elektronicznym, pozostając
                            praktycznie niezmienionym. Spopularyzował się w latach 60.
                            XX w. wraz z publikacją arkuszy Letrasetu, zawierających
                            fragmenty Lorem Ipsum, a ostatnio z zawierającym różne
                            wersje Lorem Ipsum oprogramowaniem przeznaczonym do
                            realizacji druków na komputerach osobistych, jak Aldus
                            PageMaker.
                            </p>
                        </DescriptionContent>
                        
                        {descriptionHeight === '250px' ?
                        <BsThreeDots style={iconStyles} onClick={() => {setDescriptionHeight('500px')}}></BsThreeDots>                   
                        : 
                        <MdKeyboardArrowUp style={iconStyles} onClick={() => {setDescriptionHeight('250px')}}></MdKeyboardArrowUp>
                        }
                        
                    </PlaceDescription>

                    

                    {ratings &&
                    <>
                        <RatingsContainer>

                            <RatingsPanel>                                
                                <Button inputColor='#777'>Sortuj?</Button>
                                <Button inputColor='#555'>??????</Button>
                                <Button inputColor='black' onClick={openCommentSection}>Dodaj komentarz</Button>                               
                            </RatingsPanel>

                            <RatingsPanelMessages>{ratingPanelMessage}</RatingsPanelMessages>


                            {/* 0-admin     1-user      2-zablokowany */}
                            {/* COMMENT SECTION */}
                            {(role !== "2" && username && commentSection) &&
                            <RatingForm onSubmit={handleSubmit(addRating)}>
                                
                                <RatingFormTopPanel>
                                    <VscChromeClose style={iconStyles} onClick={() => {setCommentSection(false)}}/>
                                </RatingFormTopPanel>
                                
                                <RatingFormRaitingWrapper>
                                    <RatingFormLable>Ocena:</RatingFormLable>
                                    <AddRatingInput type="number" {...register('value', {required:true})}/>
                                    <AddRatingInput defaultValue={place.placeId} type="hidden" {...register('placeId')}/>
                                </RatingFormRaitingWrapper>
                                
                            
                                <RatingFormLable>Komentarz: </RatingFormLable>                         
                                <RaitingTextarea 
                                    placeholder={"Co sadzisz o tym miejscu?"} 
                                    onChange={(e) => {console.log(e.target.value); setComment(e.target.value)}}>
                                </RaitingTextarea>

                                <RatingFormLable>Dodaj zdjęcie: </RatingFormLable>
                                <RatingFormAddImageWrapper>
									<FileInput
											type='file'
											id='file'
											name='file'
											accept='image/*'
											onChange={ e => setFile(e) }
									/>									
                                </RatingFormAddImageWrapper>
                               

                                <RatingSubmitWrapper>
                                    {/* TODO: Po dodaniu komentarza strona w nieprawidlowy sposb pokazuje jego dodanie
                                        mozna wymusic przeladowanie strony po dodaniu komentarzajej dodaniu */}
                                    <RatingSubmit type="submit">Dodaj komentarz</RatingSubmit>
                                </RatingSubmitWrapper>
                                
                                
                            </RatingForm> 
                            }


                            {ratings.map((rating, index) => 
                            <Rating>
                                
                                <RatingTop>
                                    <RatingUsername>{rating.username}</RatingUsername>
                                    <RatingValue>Ocena: {rating.value}</RatingValue>                                    
                                </RatingTop>

                                <RatingComment>                     
                                    {rating.isVisible ? <>{ReactHtmlParser(rating.comment)}</> : "Użytkownik zablokowany"}
                                </RatingComment>
                                
                                {/* TODO: Komponent umozliwiajacy podglad zdjecia po jego kliknieciu  */}
                                {rating.filePath == null ? '' :       
                                <img style={{height: '50px', width: '50px'}}src={rating.filePath} alt=""/>
                                }                                

                                <RatingBottom>
                                    <RatingDate>{rating.ratingDate}</RatingDate>

                                    <RatingOptions>
                                        {(role==='0' || username===rating.username) &&<EditButton onClick={() => deleteRating(rating.ratingId)}>Usuń</EditButton>}
                                        {role==='0' && <EditButton onClick={() => blockUser(rating.username)}>Zablokuj</EditButton>}
                                    </RatingOptions>
                                </RatingBottom>

                            </Rating>
                            )}
                        </RatingsContainer>

                        

                    </>
                    }
                </PlacePageContainer>
            }
                       
        </Layout>
    )

	
}

export default PlacePage;