import Layout from "../Layout/index";
import { useForm } from 'react-hook-form';
import {useHistory} from 'react-router-dom'
import components from "./styles";
import Axios from "axios";
import { localStorageService } from "../../services/localStorageService"

const LoginPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const { LoginMain, LoginFrom, LoginLabel, LoginInput, LoginSubmit} = components;
    const history = useHistory();

    const loginUser = (data) => {
        console.log(data)
        Axios.post("/user/authenticate", {
            username: data.username,
            password: data.password
        }).then( (res) => {
            localStorageService.username = res.data.username
            localStorageService.token = res.data.token
            localStorageService.userId = res.data.userId
            localStorageService.role = res.data.role
        });
        history.push("places")
    }


    return(
        <Layout>
            <LoginMain>
                <LoginFrom onSubmit={handleSubmit(loginUser)}>
                    <LoginLabel>Nazwa użytkownika</LoginLabel>
                    <LoginInput type="text" name="username" {...register('username')} placeholder="nazwa użytkownika" />
                    <LoginLabel>Hasło</LoginLabel>
                    <LoginInput type="password" {...register('password')} placeholder="hasło" />
                    <LoginSubmit type="submit">Zaloguj się</LoginSubmit>
                </LoginFrom>
            </LoginMain>
        </Layout>
    )
}

export default LoginPage;