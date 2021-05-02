import Layout from "../Layout/index";
import {useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { localStorageService } from "../../services/localStorageService"
import componentStyles from "./styles";
import Axios from "axios";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {

    const {t} = useTranslation();
    const { register, handleSubmit, errors } = useForm();
    const { RegisterMain, RegisterFrom, RegisterTitle, RegisterLabel, RegisterInput, RegisterButton, RegisterText} = componentStyles;
    const history = useHistory();
    const registerUser = (data) => {
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
    }

    const tnm = 'register.form.' //translation namespace


    return(
        <Layout>
            <RegisterMain>
                <RegisterFrom onSubmit={handleSubmit(registerUser)}>
                    <RegisterTitle>{t(tnm+'title')}</RegisterTitle>
                    <RegisterLabel>{t(tnm+'username-label')}</RegisterLabel>
                    <RegisterInput type="text" {...register('username', {required: true})} placeholder={t(tnm+'username-placeholder')} />
                    <RegisterLabel>{t(tnm+'email-label')}</RegisterLabel>
                    <RegisterInput type="email" {...register('email', {required: true})} placeholder={t(tnm+'email-placeholder')} />
                    <RegisterLabel>{t(tnm+'password-label')}</RegisterLabel>
                    <RegisterInput type="password" {...register('password',
                     {required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })} placeholder={t(tnm+'password-placeholder')} />
                    <RegisterLabel>{t(tnm+'repeat-password-label')}</RegisterLabel>
                    <RegisterInput type="password" {...register('confirmPassword',
                     {required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })} placeholder={t(tnm+'repeat-password-placeholder')} />
                    <RegisterButton type="submit" color="#FFFFFF">{t(tnm+'register-button')}</RegisterButton>
                    <RegisterText>{t(tnm+'account-question')}</RegisterText>
                    <RegisterButton onClick={() => history.push("login")}>{t(tnm+'log-in-button')}</RegisterButton>
                </RegisterFrom>
            </RegisterMain>
        </Layout>
    )
}

export default RegisterPage;