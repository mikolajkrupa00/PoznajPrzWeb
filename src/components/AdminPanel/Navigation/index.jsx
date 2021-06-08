import React, { useState } from "react";
import components from "./styles";
import block_user from '../../../assets/admin_panel_icons/block-user.png';
import confirm_place from '../../../assets/admin_panel_icons/signal.png';
import stats from '../../../assets/admin_panel_icons/line-graph.png';

const Navigation = ({changeSection}) => {
    const {Menu, MenuItem, Img, Label} = components;
 
    const [section, setSection] = useState("statistics");

    const highlightIitem = (item) =>{
           
        if (section === item) 
            return {borderTop:'2px solid #444'};
        else
            return {borderTop:'2px solid whitesmoke'};

    }

    return ( 
        <Menu>
                
                <MenuItem onClick={() => {changeSection("statistics"); setSection("statistics")}} >
                    <Img src={stats} alt="Statystyki"/>
                    <Label style={ highlightIitem("statistics") } >Statystyki</Label>
                </MenuItem>

                <MenuItem onClick={() => {changeSection("usersManagement"); setSection("usersManagement")}} >
                    <Img src={block_user} alt="Zablokowani użytkownicy"/>
                    <Label style={ highlightIitem("usersManagement") }>Zarządzaj użytkownikami</Label>
                </MenuItem>

                <MenuItem onClick={() => {changeSection("placeSuggestions"); setSection("placeSuggestions")}} >
                    <Img src={confirm_place} alt=''/>
                    <Label style={ highlightIitem("placeSuggestions")} >Propozycje miejsc</Label>
                </MenuItem>

                <MenuItem onClick={() => {changeSection("");  setSection("???")}} >
                    <Img src={confirm_place} alt=''/>
                    <Label style={ highlightIitem("fwfefeff")} >TO JEST DIV</Label>    
                </MenuItem>

        </Menu>

     )
}
 
export default Navigation;


