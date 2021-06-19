import Layout from "../Layout"

import Axios from "axios"
import {useEffect, useState} from "react"
import componentStyles from "./styles";
import { localStorageService } from "../../services/localStorageService"
import {useHistory} from "react-router-dom"

const Profile = () => {

    const{role, username, userId} = localStorageService;
    const[userData, setUserData] = useState();
    const{Button} = componentStyles
    const history = useHistory();
    useEffect(() => {
        Axios.get(`/user/${userId}`).then(res => setUserData(res.data))
    }, [])

    return(
        <Layout>
           {(role !== "2" && username) &&
                     <button style={{display:"flex",justifyContent:"center",width:"100%"}}>
                        <h3>Aktywny</h3>
                    </button>}
                {(role === "2" && username) &&
                     <button style={{display:"flex",justifyContent:"center",width:"100%"}}>
                        <h3>Zablokowany</h3>
                    </button>
                }
                {(role === "2" && username) &&
                     <button style={{display:"flex",justifyContent:"center",width:"100%"}}>
                        <h6>
                Jeśli zostałeś zablokowany skontaktuj się z administratorem!
            </h6>
                    </button>
                }
                
            <h5>{userData &&
            <>
            {userData.email} <br/>
            </>
            }</h5>
            
        </Layout>
    )
}

export default Profile;