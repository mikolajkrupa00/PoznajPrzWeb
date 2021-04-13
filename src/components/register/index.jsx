import Layout from "../Layout/index";
import {useHistory} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import components from "./styles";
import Axios from "axios";

const RegisterPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const { RegisterMain, RegisterFrom, RegisterLabel, RegisterInput, RegisterSubmit} = components;
    const history = useHistory();
    const registerUser = (data) => {
        Axios.post("/user", {
            email: data.email,
            username: data.username,
            password: data.password
        }).then(res => 
            history.push("places"))
    }


    return(
        <Layout>
            <RegisterMain>
                <RegisterFrom onSubmit={handleSubmit(registerUser)}>
                    <RegisterLabel>Nazwa użytkownika</RegisterLabel>
                    <RegisterInput type="text" {...register('username', {required: true})} placeholder="nazwa użytkownika" />
                    <RegisterLabel>email</RegisterLabel>
                    <RegisterInput type="email" {...register('email', {required: true})} placeholder="email" />
                    <RegisterLabel>hasło</RegisterLabel>
                    <RegisterInput type="password" {...register('password',
                     {required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, minLength: 6 })} placeholder="hasło" />
                    <RegisterSubmit type="submit">Zarejestruj się</RegisterSubmit>
                </RegisterFrom>
            </RegisterMain>
        </Layout>
    )
}

export default RegisterPage;