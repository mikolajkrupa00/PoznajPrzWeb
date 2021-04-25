import componentStyles from "../styles"
import {useHistory} from 'react-router-dom'
import { localStorageService } from "../../../services/localStorageService"

const ListMenu = ({closeListMenu}) => {
    const {username, role, token, userId } = localStorageService;
    const history = useHistory();
    const{ListMenuRecord, ListMenuContainer} = componentStyles


    const logout = () => {
        console.log("Logout")
        localStorageService.userId = ''
        localStorageService.role = ''
        localStorageService.username = ''
        localStorageService.token = ''
        window.location.reload(false);
    }

    return(
        <ListMenuContainer>
            <ListMenuRecord onClick={() => {history.push("home"); closeListMenu()}}>Strona Główna</ListMenuRecord>
            <ListMenuRecord onClick={() => {history.push("map"); closeListMenu()}}>Mapa</ListMenuRecord>
            <ListMenuRecord onClick={() => {history.push("places"); closeListMenu()}}>Miejsca</ListMenuRecord>
            {username && <ListMenuRecord onClick={() => {history.push("addPlace"); closeListMenu()}}>Dodaj miejsce</ListMenuRecord>}
            {username ? <ListMenuRecord onClick={() => logout()}>Wyloguj</ListMenuRecord> : 
            <>
                <ListMenuRecord onClick={() => {history.push("login"); closeListMenu()}}>Logowanie</ListMenuRecord>
                <ListMenuRecord onClick={() => {history.push("register"); closeListMenu()}}>Rejestracja</ListMenuRecord>
            </> }
            {role=='0' && 
            <>
                <ListMenuRecord onClick={() => {history.push("stats"); closeListMenu()}}>Statystyki</ListMenuRecord>
                <ListMenuRecord onClick={() => {history.push("adminPanel"); closeListMenu()}}>Panel admina</ListMenuRecord>
            </>}
            <ListMenuRecord>Zmien jezyk</ListMenuRecord>
        </ListMenuContainer>
    )
}

export default ListMenu