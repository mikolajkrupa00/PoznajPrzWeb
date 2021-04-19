import Layout from "../Layout/index"
import components from "./styles"
import {useForm} from "react-hook-form"
import Axios from "axios";
import {useState, useEffect} from "react";

const AdminPanel = () => {

    const {AdminContainer, BlockUserSubmit, BlockUserInput, PlaceRow, BlockUserContainer, Place, PlaceName, PlaceAddress,
        PlaceCategory, PlaceDescription, PlaceImg, PlaceDesc, ConfirmButton} = components;
    const {register, handleSubmit} = useForm();
    const[places, setPlaces] = useState();

    useEffect(() => {
        Axios.get("/place/getNotConfirmedPlaces").then(res => setPlaces(res.data));
    })


    const blockUser = (data) =>{
        console.log(data)
        Axios.put(`/user/blockUser/${data.username}`);
    }

    const confirmPlace = (placeId) =>{
        Axios.put(`/place/confirmPlace/${placeId}`).then(res => console.log(res))
    }

    return(
        <Layout>
            <AdminContainer>
                <BlockUserContainer>
                    <BlockUserInput type="text" {...register('username', {required:true})}/>
                    <BlockUserSubmit onClick={handleSubmit(data => blockUser(data))}>Zablokuj</BlockUserSubmit>
                </BlockUserContainer>

                {places && places.map(place => 
                    <Place>
                        <PlaceImg src="logo192.png" />
                        <PlaceDesc>
                            <PlaceName>{place.name}</PlaceName>
                            <PlaceAddress>{place.address}</PlaceAddress>
                            <PlaceCategory>kategoria :  {place.categoryName}</PlaceCategory>
                            <PlaceDescription>opis : {place.description}</PlaceDescription>
                            <ConfirmButton onClick={() => confirmPlace(place.placeId)}>Zatwierdź</ConfirmButton>
                        </PlaceDesc>
                    </Place>
                    )}

            </AdminContainer>
        </Layout>
    )
}

export default AdminPanel