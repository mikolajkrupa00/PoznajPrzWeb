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
    const { register, handleSubmit, errors } = useForm();
    const { LoginMain, LoginFrom, LoginTitle, LoginLabel, LoginInput, LoginButton, LoginText } = componentStyles;
    const history = useHistory();
    const tnm = 'log-in.form.'  //translation namespace
    const [loginError, setLoginError] = useState(0)

    const loginUser = (data) => {
        Axios.post("/user/authenticate", {
            username: data.username,
            password: data.password
        }).then( (res) => {
            if (res.data) {
                localStorageService.username = res.data.username
                localStorageService.token = res.data.token
                localStorageService.userId = res.data.userId
                localStorageService.role = res.data.role
                history.push("home")
                window.location.reload()
            } else {
                setLoginError(1)
            }
        }).catch((error) => {
            console.log("This \\/")
            console.log(error.response)
        });  
    }



    return(
        <Layout>
            <LoginMain>
                <LoginFrom onSubmit={handleSubmit(loginUser)}>
                    <LoginTitle>{t(tnm+'title')}</LoginTitle>
                    <LoginLabel>{t(tnm+'username-label')}</LoginLabel>
                    <LoginInput type="text" name="username" {...register('username')} placeholder={t(tnm+'username-placeholder')} />
                    <LoginLabel>{t(tnm+'password-label')}</LoginLabel>
                    <LoginInput type="password" {...register('password')} placeholder={t(tnm+'password-placeholder')} />
                    <LoginText error>{t(tnm+'login-fail-message')}</LoginText>
                    <LoginButton type="submit" color="#FFFFFF">{t(tnm+'log-in-button')}</LoginButton>
                    <LoginText>{t(tnm+'account-question')}</LoginText>
                    <LoginButton onClick={() => history.push("register")}>{t(tnm+'register-button')}</LoginButton>
                </LoginFrom>
            </LoginMain>
        </Layout>
    )
}

export default LoginPage;