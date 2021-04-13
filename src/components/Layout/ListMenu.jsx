import components from "./styles"
import {useHistory} from 'react-router-dom'
import { localStorageService } from "../../services/localStorageService"

const ListMenu = () => {
    const {username, role, token, userId } = localStorageService;
    const history = useHistory();
    const{ListMenuRecord, MenuContainer} = components


    const logout = () => {
        console.log("asd")
        localStorageService.userId = ''
        localStorageService.role = ''
        localStorageService.username = ''
        localStorageService.token = ''
        window.location.reload(false);
    }

    return(
        <MenuContainer>
            <ListMenuRecord onClick={() => history.push("map")}>Mapa</ListMenuRecord>
            <ListMenuRecord onClick={() => history.push("places")}>Miejsca</ListMenuRecord>
            <ListMenuRecord onClick={() => history.push("addPlace")}>Dodaj miejsce</ListMenuRecord>
            {username ? <ListMenuRecord onClick={() => logout()}>Wyloguj</ListMenuRecord> : 
            <ListMenuRecord onClick={() => history.push("login")}>Logowanie</ListMenuRecord>}
            <ListMenuRecord onClick={() => history.push("register")}>Rejestracja</ListMenuRecord>
            <ListMenuRecord>Zmien jezyk</ListMenuRecord>
        </MenuContainer>
    )
}

export default ListMenu