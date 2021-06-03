import components from "./styles";
import { useHistory, NavLink } from 'react-router-dom';
import block_user from '../../../assets/admin_panel_icons/block-user.png';
import confirm_place from '../../../assets/admin_panel_icons/signal.png';
import stats from '../../../assets/admin_panel_icons/line-graph.png';

const Navigation = ({changeSection}) => {
    const {Menu,Img,Icon, LinkLabel} = components;
    const history = useHistory();

    //history.push("home");

    const NavLinkStyles = {

        width: "75px",
        margin: "0px 5px",
        display: "flex",
        flexDirection : "column",
        justifyContent: "center",
        alignContent: "center",
        justifyItems: "center",
        alignItems: "center",
        borderBottom:"solid 2px whitesmoke",
        paddingBottom: "3px",
        whiteSpace: "normal",
        color: "#007bff"
        }

    return ( 
        <Menu>
                {/* <NavLink to="/adminPanel/" exact activeStyle={{borderBottom:"solid 2px gray"}} style={NavLinkStyles}>
                    <Icon><Img src={confirm_place} alt=''/></Icon>
                    <LinkLabel>Strona główna</LinkLabel>                                 
                </NavLink>

                <NavLink to="/adminPanel/statistics" activeStyle={{borderBottom:"solid 2px gray"}} style={NavLinkStyles}>
                    <Icon><Img src={stats} alt="Statystyki"/></Icon>
                    <LinkLabel>Statystyki</LinkLabel>
                </NavLink>
                
                <NavLink to="/adminPanel/blockedUsers" activeStyle={{borderBottom:"solid 2px gray"}} style={NavLinkStyles}>
                    <Icon><Img src={block_user} alt="Zablokowani użytkownicy"/></Icon>
                    <LinkLabel>Zablokowani użytkownicy</LinkLabel>

                </NavLink>
                
                <NavLink to="/adminPanel/confirmPlace" activeStyle={{borderBottom:"solid 2px gray"}} style={NavLinkStyles}>
                    <Icon><Img src={confirm_place} alt=''/></Icon>
                    <LinkLabel>Propozycje miejsc</LinkLabel>                   
                </NavLink>

                <NavLink to="/adminPanel/path_to_sth_1" activeStyle={{borderBottom:"solid 2px gray"}} style={NavLinkStyles}>
                    <Icon><Img src={confirm_place} alt=''/></Icon>
                    <LinkLabel>Nazwa Sekcji 1</LinkLabel>                   
                </NavLink>       

                <NavLink to="/adminPanel/path_to_sth_2" activeStyle={{borderBottom:"solid 2px gray"}} style={NavLinkStyles}>
                    <Icon><Img src={confirm_place} alt=''/></Icon>
                    <LinkLabel>Nazwa Sekcji 2</LinkLabel>                   
                </NavLink> */}

                <div onClick={() => changeSection("statistics")} style={NavLinkStyles}>
                    <Icon><Img src={stats} alt="Statystyki"/></Icon>
                    <LinkLabel>Statystyki</LinkLabel>
                </div>

                <div onClick={() => changeSection("usersManagement")} style={NavLinkStyles}>
                    <Icon><Img src={block_user} alt="Zablokowani użytkownicy"/></Icon>
                    <LinkLabel>Zarządzaj użytkownikami</LinkLabel>
                </div>

                <div onClick={() => changeSection("placeSuggestions")} style={NavLinkStyles}>
                    <Icon><Img src={confirm_place} alt=''/></Icon>
                    <LinkLabel>Propozycje miejsc</LinkLabel>
                </div>

                <div onClick={() => changeSection("")} style={NavLinkStyles}>
                    <Icon><Img src={confirm_place} alt=''/></Icon>
                    <LinkLabel>TO JEST DIV</LinkLabel>    
                </div>

                <div onClick={() => changeSection("")} style={NavLinkStyles}>
                    <Icon><Img src={confirm_place} alt=''/></Icon>
                    <LinkLabel>TO JEST DIV</LinkLabel>    
                </div>
        </Menu>

     )
}
 
export default Navigation;