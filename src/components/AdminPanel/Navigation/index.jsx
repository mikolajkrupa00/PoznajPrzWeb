import components from "./styles";
import block_user from '../../../assets/admin_panel_icons/block-user.png';
import confirm_place from '../../../assets/admin_panel_icons/signal.png';
import stats from '../../../assets/admin_panel_icons/line-graph.png';

const Navigation = ({changeSection,activeSection}) => {
    const {Menu,Img,LinkLabel} = components;

    //history.push("home");

    const NavLinkStyles = {

        width: "84px",
        margin: "0px 5px",
        display: "flex",
        flexDirection : "column",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        padding: "5px",
        whiteSpace: "normal"
        }
    
    return ( 
        <Menu>
               

                <div onClick={() => changeSection("statistics")} style={NavLinkStyles} className={activeSection==="statistics" ? "active" : "noactive"}>
                    <Img src={stats} alt="Statystyki"/>
                    <LinkLabel>Statystyki</LinkLabel>
                </div>

                <div onClick={() => changeSection("usersManagement")} style={NavLinkStyles} className={activeSection==="usersManagement" ? "active" : "noactive"}>
                    <Img src={block_user} alt="Zablokowani użytkownicy"/>
                    <LinkLabel>Zarządzaj użytkownikami</LinkLabel>
                </div>

                <div onClick={() => changeSection("placeSuggestions")} style={NavLinkStyles} className={activeSection==="placeSuggestions" ? "active" : "noactive"}>
                    <Img src={confirm_place} alt=''/>
                    <LinkLabel>Propozycje miejsc</LinkLabel>
                </div>

                <div onClick={() => changeSection("")} style={NavLinkStyles} className={activeSection==="" ? "active" : "noactive"}>
                    <Img src={confirm_place} alt=''/>
                    <LinkLabel>TO JEST DIV</LinkLabel>    
                </div>

                <div onClick={() => changeSection("1")} style={NavLinkStyles} className={activeSection==="1" ? "active" : "noactive"}>
                    <Img src={confirm_place} alt=''/>
                    <LinkLabel>TO JEST DIV</LinkLabel>    
                </div>
        </Menu>

     )
}
 
export default Navigation;