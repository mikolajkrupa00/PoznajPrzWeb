import Layout from "../Layout/index";
import { useForm } from 'react-hook-form';
import componentStyles from "./styles";
import Axios from "axios";
import { useEffect, useState } from "react";
import { localStorageService } from "../../services/localStorageService";

const AddPlacePage = () => {
    const { register, handleSubmit, errors } = useForm();
    const [categories, setCategories] = useState();
    const { AddPlaceMain, AddPlaceForm, AddPlaceLabel, AddPlaceInput, AddPlaceSubmit, AddPlaceTextArea, DropDownList, DropDownOption} = componentStyles;


    useEffect(() => {
        console.log(localStorageService.token)
        Axios.get("/category").then(res => setCategories(res.data));
    },[])


    const addPlace = (data) => {
        Axios.post("/place", {
            latitude: data.latitude,
            attitude: data.attitude,
            name: data.name,
            description: data.desc,
            address: data.address,
            categoryId: data.categoryId
        }).then(res => console.log(res)).catch(er => console.log(er))
    }


    return(
        <Layout>
            <AddPlaceMain>
                <AddPlaceForm onSubmit={handleSubmit()}>
                    <AddPlaceLabel>Szerokość geograficzna</AddPlaceLabel>
                    <AddPlaceInput type="number" {...register('latitude')} placeholder="Szerokość geograficzna" />
                    <AddPlaceLabel>Wysokość geograficzna</AddPlaceLabel>
                    <AddPlaceInput type="number" {...register('attitude')} placeholder="Wysokość geograficzna" />
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
                    <AddPlaceSubmit type="submit" onClick={handleSubmit((data) => addPlace(data))}>Dodaj miejsce</AddPlaceSubmit>
                </AddPlaceForm>
            </AddPlaceMain>
        </Layout>
    )
}

export default AddPlacePage;