import Layout from "../Layout/index";
import {useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { localStorageService } from "../../services/localStorageService"
import componentStyles from "./styles";
import Axios from "axios";

const RegisterPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const { RegisterMain, RegisterFrom, RegisterTitle, RegisterLabel, RegisterInput, RegisterButton, RegisterText} = componentStyles;
    const history = useHistory();
    const registerUser = (data) => {
        Axios.post("/user", {
            email: data.email,
            username: data.username,
            password: data.password
        }).then((res) => {
            localStorageService.username = res.data.username
            localStorageService.token = res.data.token
            localStorageService.userId = res.data.userId
            localStorageService.role = res.data.role
            history.push("places")
        })
    }


    return(
        <Layout>
            <RegisterMain>
                <RegisterFrom onSubmit={handleSubmit(registerUser)}>
                    <RegisterTitle>Rejestracja</RegisterTitle>
                    <RegisterLabel>Nazwa użytkownika</RegisterLabel>
                    <RegisterInput type="text" {...register('username', {required: true})} placeholder="nazwa użytkownika" />
                    <RegisterLabel>email</RegisterLabel>
                    <RegisterInput type="email" {...register('email', {required: true})} placeholder="email" />
                    <RegisterLabel>hasło</RegisterLabel>
                    <RegisterInput type="password" {...register('password',
                     {required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })} placeholder="hasło" />
                    <RegisterButton type="submit" color="#FFFFFF">Zarejestruj się</RegisterButton>
                    <RegisterText>Masz już konto?</RegisterText>
                    <RegisterButton onClick={() => history.push("login")}>Zaloguj się</RegisterButton>
                </RegisterFrom>
            </RegisterMain>
        </Layout>
    )
}

export default RegisterPage;