import Layout from "../Layout/index";
import { useForm } from 'react-hook-form';
import componentStyles from "./styles";
import Axios from "axios";
import { useEffect, useState } from "react";
import {MapContainer,TileLayer,useMapEvent} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const AddPlacePage = () => {
    const { register, handleSubmit, errors, reset, setValue} = useForm();
    const [categories, setCategories] = useState();
    const [mainPhoto, setMainPhoto] = useState(null);
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [geolocationMessage, setGeolocationMessage] = useState('');
    const { AddPlaceMain, AddPlaceForm, AddPlaceLabel, AddPlaceInput, AddPlaceSubmit, AddPlaceTextArea, DropDownList, DropDownOption, 
        FileInput, FileInputLabel, MessageLabel, Button,ButtonsArea, Map} = componentStyles;
    const [map,setMap] = useState(false);

    


    useEffect(() => {
        //console.log(localStorageService.token)
        Axios.get("/category").then(res => setCategories(res.data));
    },[])


    const addPlace = (data) => {
		var request = new FormData();

		request.append('latitude', data.latitude);
		request.append('longitude', data.longitude);
		request.append('name', data.name);
		request.append('description', data.desc);
        request.append('address', data.address);
        request.append('categoryId', data.categoryId);
        request.append('mainPhoto', mainPhoto);        

        for (var index in addedPhotos) {
            var photo = addedPhotos[index]
            request.append("photos", photo, photo.name);
        }        

		Axios.request({
			url: "/place",
			method: 'post',
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			data: request,
			onUploadProgress: e => console.log(e)
		})
		.then(res => console.log(res)).catch(er => console.log(er));

		reset();
	}

    const fileInputHandler = (e) => {

        if (e.target.name === "main_photo"){

            if(e.target.files.length > 0){
                setMainPhoto(e.target.files[0])
            }  
        }

        if (e.target.name === "photos"){
            var photos = Object.values(e.target.files)
            console.log(photos)

            if(e.target.files.length > 0){
                setAddedPhotos(Object.values(e.target.files));
            }      
        }  
    }

    const geolocationSuccess = (position) =>  {
        const latitude  = position.coords.latitude
        const longitude = position.coords.longitude
        setGeolocationMessage('')
        setValue('latitude', latitude)
        setValue('longitude', longitude)
    }

    const geolocationError = () => {
        setGeolocationMessage('Unable to retrieve your location')
    }
    
    
    const geolocation = () => {
        if(!navigator.geolocation) {
            setGeolocationMessage('Geolocation is not supported by your browser')
          } else {
            setGeolocationMessage('Locating…')
            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
          }
    }


    return(
        <Layout>
            <AddPlaceMain>
                <AddPlaceForm onSubmit={handleSubmit()}>

                    <MessageLabel>{geolocationMessage}</MessageLabel>
                    <AddPlaceLabel>Szerokość geograficzna</AddPlaceLabel>
                    <AddPlaceInput type="number" step="any" {...register('latitude', {required: true})} placeholder="Szerokość geograficzna" />
                    <AddPlaceLabel>Długość geograficzna</AddPlaceLabel>
                    <AddPlaceInput type="number" step="any" {...register('longitude', {required: true})} placeholder="Długość geograficzna" />
                    <ButtonsArea>
                        <Button onClick={geolocation}>Moja lokalizacja</Button>
                        <Button onClick={()=>setMap(!map)}>{map?"Zamknij mapę":"Pokaż mapę"}</Button>
                    </ButtonsArea>
                    {map && <Map>
                    
                        <MapContainer 
                        style={{height:'400px'}}
                        center={[50.0445, 22.003]} 
                        zoom={14} 
                        scrollWheelZoom={false}
                        >
                            
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                            <MyComponent setValue={setValue}/>
                        </MapContainer>
            
                </Map>}
                    <AddPlaceLabel>Nazwa miejsca</AddPlaceLabel>
                    <AddPlaceInput type="text" {...register('name', {required: true})} placeholder="Nazwa miejsca" />
                    <AddPlaceLabel>Adres</AddPlaceLabel>
                    <AddPlaceInput type="textarea" {...register('desc', {required: true})} placeholder="Adres" />
                    <AddPlaceLabel>Opis</AddPlaceLabel>
                    <AddPlaceTextArea type="textarea" {...register('address', {required: true})} placeholder="Opis" />
                    <AddPlaceLabel>Kategoria</AddPlaceLabel>
                    <DropDownList {...register('categoryId', {required: true})}>
                        {categories && categories.map( (category, id) => {
                            return( <DropDownOption key={id} value={category.categoryId}>{category.name}</DropDownOption> )
                        })}
                    </DropDownList>

                    <FileInputLabel>Wybierz zdjęcie główne</FileInputLabel>
                    <FileInput
						type='file'
						id='main_photo'
						name='main_photo'
						accept='image/*'
                        multiple={false}
						onChange={ e => fileInputHandler(e) }
					/>		

                    <FileInputLabel>Wybierz zdjęcia do galerii</FileInputLabel>
                    <FileInput
						type='file'
						id='photos'
						name='photos'
						accept='image/*'
                        multiple={true}
						onChange={ e => fileInputHandler(e) }
					/>		

                    <AddPlaceSubmit type="submit" onClick={handleSubmit((data) => addPlace(data))}>Dodaj miejsce</AddPlaceSubmit>
                </AddPlaceForm>
            </AddPlaceMain>
        </Layout>
    )
}

export default AddPlacePage;

const MyComponent = (props)=> {
    useMapEvent({
      click: (e) => {
            props.setValue('latitude',e.latlng.lat)
            props.setValue('longitude',e.latlng.lng)
    },
  })
  return null
}
