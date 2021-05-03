import componentStyles from "../styles"
import {useHistory} from 'react-router-dom'
import { localStorageService } from "../../../services/localStorageService"
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const ListMenu = ({closeListMenu}) => {

    var flagPath = 'img/flags_icons/'+i18n.language+'.png'
    const flagStyles = {
        width: "32px",
        height: "32px",
        marginLeft: "20px",
        disply: "block"
    }

    const {t} = useTranslation();
    const {username, role, token, userId } = localStorageService;
    const history = useHistory();
    const{ListMenuContainer, ListMenuRecord, TopRow, LogoutButton} = componentStyles


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

            <TopRow>
                {username && <LogoutButton onClick={() => logout()}>{t('list-menu.logout')}</LogoutButton> }
            </TopRow>
            

            <ListMenuRecord onClick={() => {history.push("home"); closeListMenu()}}>{t('list-menu.home-page')}</ListMenuRecord>
            <ListMenuRecord onClick={() => {history.push("map"); closeListMenu()}}>{t('list-menu.map')}</ListMenuRecord>
            <ListMenuRecord onClick={() => {history.push("places"); closeListMenu()}}>{t('list-menu.places')}</ListMenuRecord>
            {username && <ListMenuRecord onClick={() => {history.push("addPlace"); closeListMenu()}}>{t('list-menu.add-place')}</ListMenuRecord>}
            {!username &&
            <>
                <ListMenuRecord onClick={() => {history.push("login"); closeListMenu()}}>{t('list-menu.log-in')}</ListMenuRecord>
                <ListMenuRecord onClick={() => {history.push("register"); closeListMenu()}}>{t('list-menu.register')}</ListMenuRecord>
            </> }
            {role=='0' && 
            <>
                <ListMenuRecord onClick={() => {history.push("stats"); closeListMenu()}}>Statystyki</ListMenuRecord>
                <ListMenuRecord onClick={() => {history.push("adminPanel"); closeListMenu()}}>Panel admina</ListMenuRecord>
            </>}
            
            <ListMenuRecord onClick={() => {history.push("changeLanguage"); closeListMenu()}}>
                {t('list-menu.change-language')}
                <img alt='' src={flagPath} style={flagStyles}></img>
            </ListMenuRecord>
        </ListMenuContainer>
    )

}

export default ListMenu