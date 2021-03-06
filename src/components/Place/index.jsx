import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import Layout from "../Layout/index"


import componentStyles from "./styles";
import ReactHtmlParser from 'react-html-parser';
import { localStorageService } from "../../services/localStorageService"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { VscChromeClose } from 'react-icons/vsc'
import { BsThreeDots } from 'react-icons/bs'
import { GoCheck } from 'react-icons/go'




import { MdKeyboardArrowUp } from 'react-icons/md'

const PlacePage = (props) => {


	const { register, handleSubmit, errors, reset } = useForm();
	let iconStyles = { color: '#303030', fontSize: "25px" };
	const placeId = props.location.state;
	const history = useHistory();
	const [place, setPlace] = useState(false)
	const [ratings, setRatings] = useState()
	const [comment, setComment] = useState()
    const [bigGalery, setBigGalery] = useState(false)
    const [clickedPhoto, setClickedPhoto] = useState(undefined)
	const [file, _setFile] = useState(null);
    const [commentSection, setCommentSection] = useState('')
    const [commentPhotosSection, setCommentPhotosSection] = useState(false)
    const [ratingPanelMessage, setRatingPanelMessage] = useState('')
    const [isEdited, setIsEdited] = useState(false)
    const [isVisitedFlag, setIsVisitedFlag] = useState(0)
    const [descriptionHeight, setDescriptionHeight] = useState('250px')
    const [categories, setCategories] = useState();
    
	const { PlacePageContainer, TopBar, GoBack, PlaceIntro,
        SmallGallery, BigGallery, SmallPhoto, CloseBigGallery, StyledCarousel, StyledItem, StyledImg,
        PlaceName, PlaceAddress, 
        PlaceCategory, PlaceDesc, PlaceImg, PlaceDescription, 
        DescriptionContent, 
        ManagementPanel,EditPlaceSubmit,
        RatingsContainer, RatingsPanel, RatingsPanelMessages, RatingSubmitWrapper, RatingFormTopPanel,
        Rating, RatingComment, RatingDate, RatingUsername, RatingValue, RatingTop, 
        RatingBottom, RatingOptions, EditButton, Navigation,AddRatingInput,  RatingFormLable,
        RatingFormRaitingWrapper, RatingFormAddImageWrapper, FileInput,DropDownList,DropDownOption,
        RaitingTextarea, RatingForm, RatingSubmit, Button, PlaceIsVisited,PlaceNotVisited, ButtonsWrapper,EditPlaceForm,
        RatingGaleryWrapper, EditPlacePageContainer, EditPlaceLabel, EditPlaceInput, EditPlaceTextArea,} = componentStyles;

	const { role, username, userId } = localStorageService // 0 admin
	useEffect(() => {
		Axios.get(`/place/${placeId}`).then(res => setPlace(res.data))
		Axios.get(`/rating/getRatings/${placeId}`).then(res => setRatings(res.data))
        Axios.get("/category").then(res => setCategories(res.data));

        console.log(userId)
        if(userId !== '')
            Axios.get(`/visit/checkIsVisited/${placeId}/${userId}`).then(res => {setIsVisitedFlag(res.data.isVisited); console.log(res.data); })
	}, [])

	const deleteRating = (ratingId) => {
		Axios.delete(`/rating/${ratingId}`);
		setRatings(ratings.filter(x => x.ratingId !== ratingId));
	}

	const addRating = (data) => {
		var request = new FormData();
		request.append('ratingDate', new Date().toISOString());
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
			ratingDate: new Date().toISOString().split('.').shift().replace("T", " "),
			ratingId: res.data.ratingId,
			comment: comment,
			value: data.value,
			username: username,
			isVisible: true
		}]));

		reset();
	}

	const blockUser = (username) => {
		console.log(username);
		Axios.put(`/user/blockUser/${username}`)
	}

    //TODO: mozliwosc dodana kilku zdjec
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
                setRatingPanelMessage("Musisz by?? zalogowany, ??eby doda?? komentarz!")
                setTimeout(() => {setRatingPanelMessage("")}, 3000)
            }           
            return
        }

        if(role === 2 || role === "2"){
            if(ratingPanelMessage === ""){
                setRatingPanelMessage("Mo??liwo???? dodawania komentarzy zosta??a dla Ciebie zablokowana. Skontaktuj sie z administratorem.")
                setTimeout(() => {setRatingPanelMessage("")}, 4500)
            }
            return
        }

        setCommentSection(true)

    }




    const RaitingsWrapper = () => {

        return(
            ratings &&
                <>
                    <RatingsContainer>

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

                            <RatingFormLable>Dodaj zdj??cie: </RatingFormLable>
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


                        {ratings.map((rating, id) => 
                        <Rating key={id}>
                            
                            <RatingTop>
                                <RatingUsername>{rating.username}</RatingUsername>
                                <RatingValue>Ocena: {rating.value}</RatingValue>                                    
                            </RatingTop>

                            <RatingComment>                     
                                {rating.isVisible ? <>{ReactHtmlParser(rating.comment)}</> : "U??ytkownik zablokowany"}
                            </RatingComment>
                            
                            {/* TODO: Komponent umozliwiajacy podglad zdjecia po jego kliknieciu  */}
                            {rating.filePath == null ? '' :       
                            <img style={{height: '50px', width: '50px'}}src={rating.filePath} alt=""/>
                            }                                

                            <RatingBottom>
                                <RatingDate>{rating.ratingDate}</RatingDate>
                                
                                <RatingOptions>
                                    {(role==='0' || username===rating.username) &&<EditButton onClick={() => deleteRating(rating.ratingId)}>Usu??</EditButton>}
                                    {role==='0' && rating.isVisible && <EditButton onClick={() => blockUser(rating.username)}>Zablokuj</EditButton>}
                                </RatingOptions>
                            </RatingBottom>

                        </Rating>
                        )}
                    </RatingsContainer>

                    

                </>
                
        )
    }

    const ComentPhotosWrapper = () => {

        return(          
            <RatingGaleryWrapper>TU BEDZIE GALERIA ZDJEC</RatingGaleryWrapper>
        )
    }

    const setEditPlaceFlag = (placeId) => {
        setIsEdited(true);
    }

    const editPlace = (data) => {
        const request = {
            placeId: place.placeId,
            latitude: `${place.latitude}`, 
            longitude: `${place.longitude}`,
            name: data.name,
            description: data.desc,
            address: data.address,
        }
        Axios.put("/place", request).then(res => {
            setIsEdited(false)
            setPlace( request)
        })
        console.log(request);
    }

    const addPlaceToVisitedPlaces = () =>{
        
        const request = {
            placeId: place.placeId,
            userId: userId,
            visitDate: new Date().toISOString()
        }

        console.log(request.date)
        
        console.log("addPlaceToVisitedPlaces")
        Axios.post("/visit", request).then(res => {
            
            console.log("POST visit:", res);
            if(res.status === 200)
                setIsVisitedFlag(1)
        })
              
    }

    return(
        <Layout>
            { place  && !isEdited ?
                <PlacePageContainer>
                    <TopBar>
                        <GoBack onClick={() => history.goBack()}><BiLeftArrowAlt style={iconStyles} /></GoBack>
                    </TopBar>

                    <PlaceIntro>
                        <PlaceImg src={place.mainPhoto}/>
                        <PlaceDesc>
                            <PlaceName>{place.name}</PlaceName>
                            <PlaceAddress>{place.address}</PlaceAddress>
                            <PlaceCategory>Kategoria :  {place.categoryName}</PlaceCategory>                          
                        </PlaceDesc>

                    </PlaceIntro>

                    <ButtonsWrapper>
                        <Button>
                             {/* TODO: dodac pozycje uzytkownika do url w Google zeby szukalo drogi zjego lokalizacji*/}
                            <Navigation href={`https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`} target="_blank">Nawiguj</Navigation>
                         </Button>
                        {role === '0' ? <Button onClick={() => setEditPlaceFlag(place.placeId)}>Edytuj</Button> : ""}
                        <Button inputColor="purple" onClick={() => {setBigGalery(true)}}>Galeria</Button>
                        {userId !== '' && isVisitedFlag === 0 ? <PlaceNotVisited onClick={() => {addPlaceToVisitedPlaces()}}>Dodaj do odwiedzonych</PlaceNotVisited> : ''}
                        {userId !== '' && isVisitedFlag !== 0 ? <PlaceIsVisited ><GoCheck/> Odwiedzone</PlaceIsVisited> : ''}
                    
                    </ButtonsWrapper>


                    <SmallGallery>
                        { place.photos && place.photos.map((photo, id) => {
                            return(
                                <SmallPhoto src={photo} onClick={() => {setBigGalery(true); setClickedPhoto(id)}}></SmallPhoto>
                            )
                        })}                        
                    </SmallGallery>

                    {bigGalery && 
                        <BigGallery>                            
                            <StyledCarousel defaultActiveIndex={clickedPhoto} interval={null}>
                                {place.photos.map((item, key) => {
                                    return (
                                        <StyledItem key={key} >
                                            <StyledImg
                                                className="d-block w-100"
                                                src={item}
                                                alt="Rzesz??w"
                                            />
                                        </StyledItem>
                                    )
                                })}
                            </StyledCarousel>

                            <CloseBigGallery onClick={() => setBigGalery(false)}>
                                <VscChromeClose style={{ color: 'white', fontSize: "25px" }}/>
                            </CloseBigGallery>
                        </BigGallery>

                        
                    }
                    


                    <PlaceDescription>
                        <DescriptionContent inputHeigh={descriptionHeight}>

                            {place.description.length > 100 ? ReactHtmlParser(place.description) : 
                            
                                <p>
                                Lorem Ipsum jest tekstem stosowanym jako przyk??adowy
                                wype??niacz w przemy??le poligraficznym. Zosta?? po raz
                                pierwszy u??yty w XV w. przez nieznanego drukarza do
                                wype??nienia tekstem pr??bnej ksi????ki. Pi???? wiek??w p????niej
                                zacz???? by?? u??ywany przemy??le elektronicznym, pozostaj??c
                                praktycznie niezmienionym. Spopularyzowa?? si?? w latach 60.
                                XX w. wraz z publikacj?? arkuszy Letrasetu, zawieraj??cych
                                fragmenty Lorem Ipsum, a ostatnio z zawieraj??cym r????ne
                                wersje Lorem Ipsum oprogramowaniem przeznaczonym do
                                realizacji druk??w na komputerach osobistych, jak Aldus
                                PageMaker.
                                </p>
                            
                            }                          
                           

                        </DescriptionContent>
                        
                        {descriptionHeight === '250px' ?
                        <BsThreeDots style={iconStyles} onClick={() => {setDescriptionHeight('500px')}}></BsThreeDots>                   
                        : 
                        <MdKeyboardArrowUp style={iconStyles} onClick={() => {setDescriptionHeight('250px')}}></MdKeyboardArrowUp>
                        }
                        
                    </PlaceDescription>
                    
                    <ManagementPanel>
                        <RatingsPanel>                                
                                <Button inputColor='#777'>Sortuj?</Button>
                                {/* TODO: doda?? endpoint, kt??ry zwraca wszystkie zdjecia w komenarzach dla danego miejsca
                                        i wy??wietli?? je jako galerie zdj????
                                */}
                                <Button inputColor='#555' onClick={() => setCommentPhotosSection(!commentPhotosSection)}>Zdj??cia</Button>
                                <Button inputColor='black' onClick={openCommentSection}>Dodaj komentarz</Button>                               
                            </RatingsPanel>

                        <RatingsPanelMessages>{ratingPanelMessage}</RatingsPanelMessages>
                    </ManagementPanel>
                    
                    {commentPhotosSection === true ? ComentPhotosWrapper() : RaitingsWrapper()}
                   
                    {/* {RaitingsWrapper} */}
                    {/* {ComentPhotosWrapper} */}

                </PlacePageContainer> :

                <EditPlaceForm onSubmit={handleSubmit(editPlace)}>
                    <TopBar>
                        <GoBack onClick={() => setIsEdited(false)}><BiLeftArrowAlt style={iconStyles} /></GoBack>
                    </TopBar>
                    <EditPlaceLabel>Nazwa miejsca</EditPlaceLabel>
                    <EditPlaceInput defaultValue={place.name} type="text" {...register('name', {required: true})} placeholder="Nazwa miejsca" />
                    <EditPlaceLabel>Opis</EditPlaceLabel>
                    <EditPlaceInput defaultValue={place.address}  type="textarea" {...register('address', {required: true})} placeholder="Adres" />
                    <EditPlaceLabel>Adres</EditPlaceLabel>
                    <EditPlaceTextArea defaultValue={place.description} type="textarea" {...register('desc', {required: true})} placeholder="Opis" />
                    <EditPlaceSubmit type="submit" onClick={handleSubmit((data) => editPlace(data))}>edytuj miejsce</EditPlaceSubmit>
                </EditPlaceForm>
            }   
        </Layout>
    )

	
}

export default PlacePage;