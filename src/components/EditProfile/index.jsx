import Layout from "../Layout/index";
import { useForm } from 'react-hook-form';
import componentStyles from "./styles";
import Axios from "axios";
import { useEffect, useState } from "react";
import { localStorageService } from "../../services/localStorageService";
import { BiLeftArrowAlt } from 'react-icons/bi';
import { useHistory } from "react-router-dom";
	

const EditProfile = () => {

    const {Button, ButtonsWrapper, TopBar, GoBack,BiLeftArrowAlt} = componentStyles
    const { register, handleSubmit, errors } = useForm();
    const [categories, setCategories] = useState();
    const { AddPlaceMain, AddPlaceForm, AddPlaceLabel, AddPlaceInput, AddPlaceSubmit, AddPlaceTextArea, DropDownList, DropDownOption} = componentStyles;

    let iconStyles = { color: '#303030', fontSize: "25px" };
    const history = useHistory();
    const [change, setChange] = useState(2);
    const [kolorUsername, setKolorUsername] = useState("green");

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
    const ChangePassword = () =>{
        return (
            <AddPlaceMain>
                <AddPlaceForm onSubmit={handleSubmit()}>
                    <AddPlaceLabel>Podaj stare hasło</AddPlaceLabel>
                    <AddPlaceInput type="number" {...register('latitude')} placeholder="STARE HASŁO" />
                    <AddPlaceLabel>Podaj nowe hasło</AddPlaceLabel>
                    <AddPlaceInput type="number" {...register('attitude')} placeholder="NOWE HASŁO" />
                    <AddPlaceLabel>Powtórz nowe hasło</AddPlaceLabel>
                    <AddPlaceInput type="text" {...register('name')} placeholder="NOWE HASŁO" />
                    <div>
                    <AddPlaceSubmit type="submit" onClick={handleSubmit((data) => addPlace(data))}>Zmien hasło</AddPlaceSubmit>
                    </div>
                </AddPlaceForm>
            </AddPlaceMain>
        )
    }

    const ChangeEmail = () =>{
        return (
            <AddPlaceMain>
                <AddPlaceForm onSubmit={handleSubmit()}>
                    <AddPlaceLabel>Podaj hasło</AddPlaceLabel>
                    <AddPlaceInput type="number" {...register('latitude')} placeholder="HASŁO" />
                    <AddPlaceLabel>Podaj nowy E-mail</AddPlaceLabel>
                    <AddPlaceInput type="number" {...register('attitude')} placeholder="NOWY E-MAIL" />                    
                    <div>
                    <AddPlaceSubmit type="submit" onClick={handleSubmit((data) => addPlace(data))}>Zmien E-mail</AddPlaceSubmit>
                    </div>
                </AddPlaceForm>
            </AddPlaceMain>
        )
    }

    const ChangeUsername = () =>{
        return (
            <AddPlaceMain>
                <AddPlaceForm onSubmit={handleSubmit()}>
                <AddPlaceLabel>Podaj hasło</AddPlaceLabel>
                    <AddPlaceInput type="number" {...register('latitude')} placeholder="HASŁO" />
                    <AddPlaceLabel>Podaj nową nazwę użytkownika</AddPlaceLabel>
                    <AddPlaceInput type="number" {...register('attitude')} placeholder="NOWA NAZWA UŻYTKOWNIKA" />
                    <div>
                        <AddPlaceSubmit type="submit" onClick={handleSubmit((data) => addPlace(data))}>Zmien nazwę użytkownika</AddPlaceSubmit>
                    </div>
                    
                </AddPlaceForm>
            </AddPlaceMain>

        )
    }


    return(
        
    <Layout>
    <ButtonsWrapper>
        <div>
                    {/* <TopBar>
                    <GoBack onClick={() =>history.push("userpanel")}></GoBack>
                    </TopBar> */}
        </div>
        <div>
                    <Button 
                    inputColor={kolorUsername}
                    className="ButtonChangeUsername"
                    onClick={() => setChange(2)}>Zmień nazwę użytkownika</Button>
                <Button 
                    inputColor="green"
                    className="ButtonChangePassword"
                    onClick={() => setChange(0)}>Zmień hasło</Button>
                <Button 
                    inputColor="green"
                    className="ButtonChangeEmail"
                    onClick={() => setChange(1)}>Zmień E-mail</Button>
        </div>

    </ButtonsWrapper>

    {change == 0 && <ChangePassword/>}
    {change == 1 && <ChangeEmail/>}
    {change == 2 && <ChangeUsername/>}

    


    

    </Layout>
        

    )

}

export default EditProfile;