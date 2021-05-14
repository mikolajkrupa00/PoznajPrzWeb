import Layout from "../Layout/index";
import { useForm } from 'react-hook-form';
import componentStyles from "./styles";
import Axios from "axios";
import { useEffect, useState } from "react";
import { localStorageService } from "../../services/localStorageService";

const AddPlacePage = () => {
    const { register, handleSubmit, errors, reset } = useForm();
    const [categories, setCategories] = useState();
    const [addedPhotos, setAddedPhotos] = useState("huj");
    const { AddPlaceMain, AddPlaceForm, AddPlaceLabel, AddPlaceInput, AddPlaceSubmit, AddPlaceTextArea, 
            DropDownList, DropDownOption, FileInput} = componentStyles;


    useEffect(() => {
        console.log(localStorageService.token)
        Axios.get("/category").then(res => setCategories(res.data));
    },[])

    const fileInputHandler = (e) => {
        //console.log(e.target.files)
        console.log(Object.values(e.target.files))     

        const { files } = e.target;
        console.log(files)

        //setAddedPhotos(files);

		// if(files.length === 1) {
		// 	const file = files[0];
        //     console.log(file)
		// 	setAddedPhotos(file);
		// }

        if(e.target.files.length > 0){
            //setAddedPhotos(e.target.files);
            setAddedPhotos(Object.values(e.target.files));
        }               
    }

    
    const addPlace = (data) => {
		var request = new FormData();
		
        console.log("addedPhotos from request: ", addedPhotos)

		request.append('latitude', data.latitude);
		request.append('longitude', data.longitude);
		request.append('name', data.name);
		request.append('description', data.desc);
        request.append('address', data.address);
        request.append('categoryId', data.categoryId);
		request.append('files', addedPhotos);

        console.log("addedPhotos from request: ", addedPhotos)

        console.log(request)

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
    // const addPlace = (data) => {
    //     Axios.post("/place", {
    //         latitude: data.latitude,
    //         longitude: data.longitude,
    //         name: data.name,
    //         description: data.desc,
    //         address: data.address,
    //         categoryId: data.categoryId
    //     }).then(res => console.log(res)).catch(er => console.log(er))
    // }


    return(
        <Layout>
            <AddPlaceMain>
                
                <AddPlaceForm onSubmit={handleSubmit()}>
                    <AddPlaceLabel>Szerokość geograficzna</AddPlaceLabel>
                    <AddPlaceInput type="number" {...register('latitude')} placeholder="Szerokość geograficzna" />
                    <AddPlaceLabel>Wysokość geograficzna</AddPlaceLabel>
                    <AddPlaceInput type="number" {...register('longitude')} placeholder="Długość geograficzna" />
                    <AddPlaceLabel>Nazwa miejsca</AddPlaceLabel>
                    <AddPlaceInput type="text" {...register('name')} placeholder="Nazwa miejsca" />
                    <AddPlaceLabel>Adres</AddPlaceLabel>
                    <AddPlaceInput type="textarea" {...register('desc')} placeholder="Adres" />
                    <AddPlaceLabel>Opis</AddPlaceLabel>
                    <AddPlaceTextArea type="textarea" {...register('address')} placeholder="Opis" />
                    <AddPlaceLabel>Kategoria</AddPlaceLabel>
                    <DropDownList {...register('categoryId')}>
                        {categories && categories.map(category => 
                            <DropDownOption value={category.categoryId}>{category.name}</DropDownOption>
                        )}
                    </DropDownList>

                    <FileInput
						type='file'
						id='file'
						name='file'
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