import {useState} from 'react'
import Layout from "../Layout/index";
import {useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { localStorageService } from "../../services/localStorageService"
import componentStyles from "./styles";
import Axios from "axios";

const RegisterPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const { RegisterMain, RegisterFrom, RegisterTitle, RegisterLabel, RegisterInput, RegisterButton, RegisterText, RegisterPopUp } = componentStyles;
    const history = useHistory();
    const [wrongPasswordPopUp, setWrongPasswordPopUp] = useState(false);
    var popUpTimeout;

    const closeAllPopUps = () => {
        setWrongPasswordPopUp(false);
    }

    const registerUser = (data) => {
        clearTimeout(popUpTimeout);
        closeAllPopUps();
        if (data.password == data.confirmPassword) {
            Axios.post("/user", {
                email: data.email,
                username: data.username,
                password: data.password,
                confirmPassword:data.confirmPassword
            }).then((res) => {
                localStorageService.username = data.username
                localStorageService.token = res.data.token
                localStorageService.userId = res.data.userId
                localStorageService.role = '1'
                history.push("home")
            })
        } else {
            setWrongPasswordPopUp(true);
            popUpTimeout = setTimeout(() => setWrongPasswordPopUp(false), 5000);
        }
    }


    return(
        <Layout>
            <RegisterMain>
                <RegisterFrom onSubmit={handleSubmit(registerUser)}>
                    <RegisterTitle>Rejestracja</RegisterTitle>
                    <RegisterLabel>Nazwa użytkownika</RegisterLabel>
                    <RegisterInput type="text" {...register('username', {required: true})} placeholder="nazwa użytkownika" />
                    <RegisterLabel>E-mail</RegisterLabel>
                    <RegisterInput type="email" {...register('email', {required: true})} placeholder="email" />
                    <RegisterLabel>Hasło</RegisterLabel>
                    <RegisterInput type="password" {...register('password',
                     {required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })} placeholder="hasło" />
                    <RegisterLabel>Powtórz hasło</RegisterLabel>
                    <RegisterInput type="password" {...register('confirmPassword',
                     {required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })} placeholder="hasło" />
                    <RegisterButton type="submit" color="#FFFFFF">Zarejestruj się</RegisterButton>
                    <RegisterText>Masz już konto?</RegisterText>
                    <RegisterButton onClick={() => history.push("login")}>Zaloguj się</RegisterButton>
                </RegisterFrom>
                {wrongPasswordPopUp ? <RegisterPopUp onClick={setWrongPasswordPopUp(false)}>Wpisane hasła nie są identyczne</RegisterPopUp> : null}
            </RegisterMain>
        </Layout>
    )
}

export default RegisterPage;