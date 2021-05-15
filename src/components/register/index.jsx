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
    const { register, handleSubmit, setError, formState: { errors } } = useForm();
    const { RegisterMain, RegisterFrom, RegisterTitle, RegisterLabel, RegisterInput, RegisterInputError,
        RegisterButton, RegisterText, RegisterErrorText } = componentStyles;
    const history = useHistory();
    const [RegisterError, setRegisterError] = useState(false)
   const [awaitingServerResponse, setAwaitingServerResponse] = useState(false)
    const tnm = 'register.form.' //translation namespace

    const registerUser = (data) => {
        setRegisterError(false)
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
                    localStorageService.role = res.data.role
                    history.push("home")
                } else {
                    setRegisterError(true)
                }
            }).catch((error) => {
                if (error.response && error.response.status == 400) {
                    switch (error.response.data) {
                        case "Passwords mismatch":
                            //setError("password", {type: "pass-mismatch", message: ""})
                            setError("confirmPassword", {type: "pass-mismatch", message: ""}, {shouldFocus: true})
                            break;
                        case "Username taken":
                            setError("username", {type: "username-taken", message: ""}, {shouldFocus: true})
                            break;
                        case "Email taken":
                            setError("email", {type: "email-taken", message: ""}, {shouldFocus: true})
                            break;
                        default:
                            setRegisterError(true)
                            break;
                    }
                } else {
                    setRegisterError(true)
                }
            }).then(() =>{
                setAwaitingServerResponse(false)
            })
        } else {
            //setError("password", {type: "pass-mismatch", message: ""})
            setError("confirmPassword", {type: "pass-mismatch", message: ""}, {shouldFocus: true})
        }
    }


    return(
        <Layout>
            <RegisterMain>
                <RegisterFrom onSubmit={handleSubmit(registerUser)}>
                    <RegisterTitle>{t(tnm+'title')}</RegisterTitle>
                    <RegisterLabel error={errors.username}>{t(tnm+'username-label')}</RegisterLabel>
                    <RegisterInput error={errors.username} type="text" {...register('username', {required: true})}
                        placeholder={t(tnm+'username-placeholder')} />
                    <RegisterInputError>{errors.username ? t(tnm+errors.username.type) : null}</RegisterInputError>
                    
                    <RegisterLabel error={errors.email}>{t(tnm+'email-label')}</RegisterLabel>
                    <RegisterInput error={errors.email} type="email" {...register('email', {required: true})}
                        placeholder={t(tnm+'email-placeholder')} />
                    <RegisterInputError>{errors.email ? t(tnm+errors.email.type) : null}</RegisterInputError>

                    <RegisterLabel error={errors.password}>{t(tnm+'password-label')}</RegisterLabel>
                    <RegisterInput error={errors.password} type="password" {...register('password',
                        {required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })}
                        placeholder={t(tnm+'password-placeholder')} />
                    <RegisterInputError>{errors.password && errors.password.type != "pass-mismatch" ? t(tnm+errors.password.type) : null}</RegisterInputError>

                    <RegisterLabel error={errors.confirmPassword}>{t(tnm+'repeat-password-label')}</RegisterLabel>
                    <RegisterInput error={errors.confirmPassword} type="password" {...register('confirmPassword',
                        {required: true})} placeholder={t(tnm+'repeat-password-placeholder')} />
                    <RegisterInputError>{errors.confirmPassword ? t(tnm+errors.confirmPassword.type) : null}</RegisterInputError>

                    <RegisterErrorText>{RegisterError && t(tnm+'other-error')}</RegisterErrorText>

                    <RegisterButton disabled={awaitingServerResponse} type="submit" color="#FFFFFF">{t(tnm+'register-button')}</RegisterButton>

                    <RegisterText>{t(tnm+'account-question')}</RegisterText>
                    <RegisterButton onClick={() => history.push("login")}>{t(tnm+'log-in-button')}</RegisterButton>
                </RegisterFrom>
            </RegisterMain>
        </Layout>
    )
}

export default RegisterPage;