import componentStyles from "../styles"
import {useHistory} from 'react-router-dom'
import { localStorageService } from "../../../services/localStorageService"

const ListMenu = () => {
    const {username, role, token, userId } = localStorageService;
    const history = useHistory();
    const{ListMenuRecord, ListMenuContainer} = componentStyles


    const logout = () => {
        console.log("asd")
        localStorageService.userId = ''
        localStorageService.role = ''
        localStorageService.username = ''
        localStorageService.token = ''
        window.location.reload(false);
    }

    return(
        <ListMenuContainer>
            <ListMenuRecord onClick={() => history.push("home")}>Strona Główna</ListMenuRecord>
            <ListMenuRecord onClick={() => history.push("map")}>Mapa</ListMenuRecord>
            <ListMenuRecord onClick={() => history.push("places")}>Miejsca</ListMenuRecord>
            {username && <ListMenuRecord onClick={() => history.push("addPlace")}>Dodaj miejsce</ListMenuRecord>}
            {username ? <ListMenuRecord onClick={() => logout()}>Wyloguj</ListMenuRecord> : 
            <>
                <ListMenuRecord onClick={() => history.push("login")}>Logowanie</ListMenuRecord>
                <ListMenuRecord onClick={() => history.push("register")}>Rejestracja</ListMenuRecord>
            </> }
            {role=='0' && 
            <>
                <ListMenuRecord onClick={() => history.push("stats")}>Statystyki</ListMenuRecord>
                <ListMenuRecord onClick={() => history.push("adminPanel")}>Panel admina</ListMenuRecord>
            </>}
            <ListMenuRecord>Zmien jezyk</ListMenuRecord>
        </ListMenuContainer>
    )
}

export default ListMenu