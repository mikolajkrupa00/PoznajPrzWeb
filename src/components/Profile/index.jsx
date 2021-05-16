import Layout from "../Layout"
import Axios from "axios"
import {useEffect, useState} from "react"

import { localStorageService } from "../../services/localStorageService"

const Profile = () => {

    const{userId} = localStorageService;
    const[userData, setUserData] = useState();

    useEffect(() => {
        Axios.get(`/user/${userId}`).then(res => setUserData(res.data))
    }, [])

    return(
        <Layout>
            {userData &&
            <>
            {userData.email} <br/>
            {userData.username}
            </>
            }
        </Layout>
    )
}

export default Profile;