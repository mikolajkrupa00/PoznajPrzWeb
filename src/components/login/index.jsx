import {useState} from 'react'
import Layout from "../Layout/index";
import { useForm } from 'react-hook-form';
import {useHistory} from 'react-router-dom'
import componentStyles from "./styles";
import Axios from "axios";
import { localStorageService } from "../../services/localStorageService"

const LoginPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const { LoginMain, LoginFrom, LoginTitle, LoginLabel, LoginInput, LoginButton, LoginText, LoginPopUp } = componentStyles;
    const history = useHistory();
    const [ShowPopUp, setShowPopUp] = useState(false);
    const [PopUpTimeout, setPopUpTimeout] = useState(null)
    const [PopUpMessage, setPopUpMessage] = useState("")

    const enablePopUp = (message) => {
        clearTimeout(PopUpTimeout);
        setPopUpMessage(message);
        setShowPopUp(true);
        setPopUpTimeout(setTimeout(() => setShowPopUp(false), 5000));
    }

    const loginUser = (data) => {
        Axios.post("/user/authenticate", {
            username: data.username,
            password: data.password
        }).then( (res) => {
            console.log(res)
            localStorageService.username = res.data.username
            localStorageService.token = res.data.token
            localStorageService.userId = res.data.userId
            localStorageService.role = res.data.role
        }).catch((error) => {
            
        }).then(() => {
            if (localStorageService.username) {
                history.push("home");
                window.location.reload();
            } else {
                enablePopUp("Nieprawidłowa nazwa użytkownika lub hasło!");
            }
        });  
    }


    return(
        <Layout>
            <LoginMain>
                <LoginFrom onSubmit={handleSubmit(loginUser)}>
                    <LoginTitle>Logowanie</LoginTitle>
                    <LoginLabel>Nazwa użytkownika</LoginLabel>
                    <LoginInput type="text" name="username" {...register('username')} placeholder="nazwa użytkownika" />
                    <LoginLabel>Hasło</LoginLabel>
                    <LoginInput type="password" {...register('password')} placeholder="hasło" />
                    <LoginButton type="submit" color="#FFFFFF">Zaloguj się</LoginButton>
                    <LoginText>Nie masz jeszcze konta?</LoginText>
                    <LoginButton onClick={() => history.push("register")}>Zarejestruj się</LoginButton>
                </LoginFrom>
                {ShowPopUp ? <LoginPopUp onClick={() => setShowPopUp(false)}>{PopUpMessage}</LoginPopUp> : null}
            </LoginMain>
        </Layout>
    )
}

export default LoginPage;