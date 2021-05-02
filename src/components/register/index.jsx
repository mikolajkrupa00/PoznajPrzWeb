import {useState} from 'react'
import Layout from "../Layout/index";
import {useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { localStorageService } from "../../services/localStorageService"
import componentStyles from "./styles";
import Axios from "axios";

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { RegisterMain, RegisterFrom, RegisterTitle, RegisterLabel, RegisterInput, RegisterButton, RegisterText, RegisterPopUp } = componentStyles;
    const history = useHistory();
    const [ShowPopUp, setShowPopUp] = useState(false);
    const [PopUpTimeout, setPopUpTimeout] = useState(null)
    const [PopUpMessage, setPopUpMessage] = useState("")
    const [Password, setPassword] = useState("")

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

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
                    enablePopUp("Podana nazwa użytkownika jest już zajęta!")
                }
            })
        } else {
            enablePopUp("Wpisane hasła nie są identyczne!");
        }
    }

    console.log(Password)
    return(
        <Layout>
            <RegisterMain>
                <RegisterFrom onSubmit={handleSubmit(registerUser)}>
                    <RegisterTitle>Rejestracja</RegisterTitle>
                    <RegisterLabel error={errors.username}>
                        Nazwa użytkownika
                        {errors.username && " - pole jest wymagane"}
                    </RegisterLabel>
                    <RegisterInput error={errors.username} type="text" {...register('username', {required: true})} placeholder="nazwa użytkownika" />
                    
                    <RegisterLabel error={errors.email}>
                        E-mail
                        {errors.email && " - pole jest wymagane"}
                    </RegisterLabel>
                    <RegisterInput error={errors.email} type="email" {...register('email', {required: true})} placeholder="email" />

                    <RegisterLabel error={errors.password}>
                        Hasło
                        {errors.password && " - min. 6 znaków, w tym: cyfra, mała i duża litera"}
                    </RegisterLabel>
                    <RegisterInput error={errors.password} type="password" onChange={handlePasswordChange} {...register('password',
                    {required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })} placeholder="hasło" />

                    <RegisterLabel>Powtórz hasło</RegisterLabel>
                    <RegisterInput type="password" {...register('confirmPassword',
                     {required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })} placeholder="hasło" />

                    <RegisterButton type="submit" color="#FFFFFF">Zarejestruj się</RegisterButton>

                    <RegisterText>Masz już konto?</RegisterText>
                    <RegisterButton onClick={() => history.push("login")}>Zaloguj się</RegisterButton>
                </RegisterFrom>
                {ShowPopUp ? <RegisterPopUp onClick={() => setShowPopUp(false)}>{PopUpMessage}</RegisterPopUp> : null}
            </RegisterMain>
        </Layout>
    )
}

export default RegisterPage;