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
    const { register, handleSubmit, clearErrors, trigger, getValues, formState: { errors } } = useForm();
    const { RegisterMain, RegisterFrom, RegisterTitle, RegisterLabel, RegisterInput, RegisterButton,
        RegisterText, RegisterErrorText } = componentStyles;
    const history = useHistory();
    const [RegisterError, setRegisterError] = useState(0)
    /* Error codes:
        0 - no error
        1 - username taken
        2 - email taken
        3 - passwords mismatch (in register form)
        4 - other (i.e. no response from server)
    */
   const [awaitingServerResponse, setAwaitingServerResponse] = useState(false)
    const tnm = 'register.form.' //translation namespace

    const registerUser = (data) => {
        setRegisterError(0)
        if (data.password === data.confirmPassword) {
            setAwaitingServerResponse(true)
            Axios.post("/user", {
                email: data.email,
                username: data.username,
                password: data.password,
                confirmPassword:data.confirmPassword
            }).then((res) => {
                if (res.status == 201 && res.data) {
                    localStorageService.username = res.data.username
                    localStorageService.token = res.data.token
                    localStorageService.userId = res.data.userId
                    localStorageService.role = '1'
                    history.push("home")
                } else {
                    setRegisterError(4)
                }
            }).catch((error) => {
                if (error.response && error.response.status == 400) {
                    switch (error.response.data) {
                        case "Passwords mismatch":
                            setRegisterError(3)
                            break;
                        case "Username taken":
                            setRegisterError(1)
                            break;
                        case "Email taken":
                            setRegisterError(2)
                            break;
                        default:
                            setRegisterError(4)
                            break;
                    }
                } else {
                    setRegisterError(4)
                }
            }).then(() =>{
                setAwaitingServerResponse(false)
            })
        } else {
            setRegisterError(3)
        }
    }


    return(
        <Layout>
            <RegisterMain>
                <RegisterFrom onSubmit={handleSubmit(registerUser)}>
                    <RegisterTitle>{t(tnm+'title')}</RegisterTitle>
                    <RegisterLabel error={errors.username || RegisterError == 1}>
                        {t(tnm+'username-label')}
                        {errors.username && " - " + t(tnm+'field-required')}
                        {RegisterError == 1 && " - " + t(tnm+'username-taken')}
                    </RegisterLabel>
                    <RegisterInput error={errors.username || RegisterError == 1} type="text" {...register('username', {required: true})}
                        placeholder={t(tnm+'username-placeholder')} />
                    
                    <RegisterLabel error={errors.email || RegisterError == 2}>
                        {t(tnm+'email-label')}
                        {errors.email && " - " + t(tnm+'field-required')}
                        {RegisterError == 2 && " - " + t(tnm+'email-taken')}
                    </RegisterLabel>
                    <RegisterInput error={errors.email || RegisterError == 2} type="email" {...register('email', {required: true})}
                        placeholder={t(tnm+'email-placeholder')} />

                    <RegisterLabel error={errors.password || RegisterError == 3}>
                        {t(tnm+'password-label')}
                        {errors.password && " - " + t(tnm+'pass-requirements')}
                    </RegisterLabel>
                    <RegisterInput error={errors.password || RegisterError == 3} type="password" {...register('password',
                        {required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })}
                        placeholder={t(tnm+'password-placeholder')} />

                    <RegisterLabel error={errors.confirmPassword || RegisterError == 3}>
                        {t(tnm+'repeat-password-label')}
                        {errors.confirmPassword && " - " + t(tnm+'field-required')}
                        {RegisterError == 3 && " - " + t(tnm+'pass-mismatch')}
                    </RegisterLabel>
                    <RegisterInput error={errors.confirmPassword || RegisterError == 3} type="password" {...register('confirmPassword',
                        {required: true})}
                        placeholder={t(tnm+'repeat-password-placeholder')} />

                    <RegisterErrorText>{RegisterError == 4 && t(tnm+'other-error')}</RegisterErrorText>

                    <RegisterButton disabled={awaitingServerResponse} type="submit" color="#FFFFFF">{t(tnm+'register-button')}</RegisterButton>

                    <RegisterText>{t(tnm+'account-question')}</RegisterText>
                    <RegisterButton onClick={() => history.push("login")}>{t(tnm+'log-in-button')}</RegisterButton>
                </RegisterFrom>
            </RegisterMain>
        </Layout>
    )
}

export default RegisterPage;