import components from "./styles";
import { NavLink } from 'react-router-dom';
import block_user from '../../../assets/admin_panel_icons/block-user.png';
import confirm_place from '../../../assets/admin_panel_icons/signal.png';
import stats from '../../../assets/admin_panel_icons/line-graph.png';

const Navigation = () => {
    const {Menu,Img,Icon} = components;
    return ( 
        <Menu>
                <NavLink to="/adminPanel/" exact activeStyle={{borderBottom:"solid 2px gray"}}><Icon>1</Icon></NavLink>
                <NavLink to="/adminPanel/statistics" activeStyle={{borderBottom:"solid 2px gray"}}><Icon><Img src={stats} alt="Statystyki"/></Icon></NavLink>
                <NavLink to="/adminPanel/blockedUsers" activeStyle={{borderBottom:"solid 2px gray"}}><Icon><Img src={block_user} alt="Zablokowani użytkownicy"/></Icon></NavLink>
                <NavLink to="/adminPanel/confirmPlace" activeStyle={{borderBottom:"solid 2px gray"}}><Icon><Img src={confirm_place} alt=''/></Icon></NavLink>
        </Menu>
     )
}
 
export default Navigation;