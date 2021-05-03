import {useState} from 'react'
import Layout from "../Layout/index";
import {useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { localStorageService } from "../../services/localStorageService"
import componentStyles from "./styles";
import Axios from "axios";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
    const {t} = useTranslation();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { RegisterMain, RegisterFrom, RegisterTitle, RegisterLabel, RegisterInput, RegisterButton, RegisterText, RegisterPopUp } = componentStyles;
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

    const registerUser = (data) => {
        if (data.password === data.confirmPassword) {
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
            }).catch((error) => {
            
            }).then(() =>{
                if (localStorageService.username) {
                    history.push("home")
                } else {
                    enablePopUp(t(tnm+'username-taken'))
                }
            })
        } else {
            enablePopUp(t(tnm+'pass-mismatch'));
        }
    }

    const tnm = 'register.form.' //translation namespace

    return(
        <Layout>
            <RegisterMain>
                <RegisterFrom onSubmit={handleSubmit(registerUser)}>
                    <RegisterTitle>{t(tnm+'title')}</RegisterTitle>
                    <RegisterLabel error={errors.username}>
                        {t(tnm+'username-label')}
                        {errors.username && " - " + t(tnm+'field-required')}
                    </RegisterLabel>
                    <RegisterInput error={errors.username} type="text" {...register('username', {required: true})} placeholder={t(tnm+'username-placeholder')} />
                    
                    <RegisterLabel error={errors.email}>
                        {t(tnm+'email-label')}
                        {errors.email && " - " + t(tnm+'field-required')}
                    </RegisterLabel>
                    <RegisterInput error={errors.email} type="email" {...register('email', {required: true})} placeholder={t(tnm+'email-placeholder')} />

                    <RegisterLabel error={errors.password}>
                        {t(tnm+'password-label')}
                        {errors.password && " - " + t(tnm+'pass-requirements')}
                    </RegisterLabel>
                    <RegisterInput error={errors.password} type="password" {...register('password',
                    {required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })} placeholder={t(tnm+'password-placeholder')} />

                    <RegisterLabel error={errors.confirmPassword}>
                        {t(tnm+'repeat-password-label')}
                        {errors.confirmPassword && " - " + t(tnm+'pass-requirements')}
                    </RegisterLabel>
                    <RegisterInput error={errors.confirmPassword} type="password" {...register('confirmPassword',
                     {required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })} placeholder={t(tnm+'repeat-password-placeholder')} />

                    <RegisterButton type="submit" color="#FFFFFF">{t(tnm+'register-button')}</RegisterButton>

                    <RegisterText>{t(tnm+'account-question')}</RegisterText>
                    <RegisterButton onClick={() => history.push("login")}>{t(tnm+'log-in-button')}</RegisterButton>
                </RegisterFrom>
                {ShowPopUp ? <RegisterPopUp onClick={() => setShowPopUp(false)}>{PopUpMessage}</RegisterPopUp> : null}
            </RegisterMain>
        </Layout>
    )
}

export default RegisterPage;