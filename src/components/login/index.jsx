import {useState} from 'react'
import Layout from "../Layout/index";
import { useForm } from 'react-hook-form';
import {useHistory} from 'react-router-dom'
import componentStyles from "./styles";
import Axios from "axios";
import { localStorageService } from "../../services/localStorageService"
import { useTranslation } from "react-i18next";

const LoginPage = () => {

    const {t} = useTranslation();
    const { register, handleSubmit } = useForm();
    const { LoginMain, LoginFrom, LoginTitle, LoginLabel, LoginInput, LoginButton, LoginText, LoginErrorText } = componentStyles;
    const history = useHistory();
    const tnm = 'log-in.form.'  //translation namespace
    const [loginError, setLoginError] = useState(0)
    /* Error codes:
        0 - no error
        1 - wrong username or password
        2 - other (i.e. no response from server)
    */
    const [awaitingServerResponse, setAwaitingServerResponse] = useState(false)

    const loginUser = (data) => {
        console.log(data);
        setAwaitingServerResponse(true)
        setLoginError(0)
        Axios.post("/user/authenticate", {
            username: data.username,
            password: data.password
        }).then((res) => {
            console.log(res)
            if (res.status === 200 && res.data) {
                localStorageService.username = res.data.username
                localStorageService.token = res.data.token
                localStorageService.userId = res.data.userId
                localStorageService.role = res.data.role
                history.push("home")
            } else {
                setLoginError(2)
            }
        }).catch((error) => {
            if (error.response && error.response.status === 401) {
                setLoginError(1)
            } else {
                setLoginError(2)
            }
        }).then(() => {
            setAwaitingServerResponse(false)
        });  
    }



    return(
        <Layout>
            <LoginMain>
                <LoginFrom onSubmit={handleSubmit(loginUser)}>
                    <LoginTitle>{t(tnm+'title')}</LoginTitle>
                    <LoginLabel error={loginError === 1 ? "error" : ""}>{t(tnm+'username-label')}</LoginLabel>
                    <LoginInput error={loginError === 1 ? "error" : ""} type="text" name="username" 
                        {...register('username')} placeholder={t(tnm+'username-placeholder')} 
                        onChange={() => setLoginError(0)} />
                    <LoginLabel error={loginError === 1 ? "error" : ""}>{t(tnm+'password-label')}</LoginLabel>
                    <LoginInput error={loginError === 1 ? "error" : ""} type="password" 
                        {...register('password')} placeholder={t(tnm+'password-placeholder')} 
                        onChange={() => setLoginError(0)} />
                    <LoginErrorText>{loginError > 0 ? t(tnm+'login-fail-message'+loginError) : null}</LoginErrorText>
                    <LoginButton disabled={awaitingServerResponse} type="submit" color="#FFFFFF">{t(tnm+'log-in-button')}</LoginButton>
                    <LoginText>{t(tnm+'account-question')}</LoginText>
                    <LoginButton onClick={() => history.push("register")}>{t(tnm+'register-button')}</LoginButton>
                </LoginFrom>
            </LoginMain>
        </Layout>
    )
}

export default LoginPage;