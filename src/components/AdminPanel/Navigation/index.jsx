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
            return {borderBottom:'2px solid #444'};
        else
            return {borderBottom:'0px'};
    }

    return ( 
        <Menu>
                
                <MenuItem onClick={() => {changeSection("statistics"); setSection("statistics")}} style={ highlightIitem("statistics") }>
                    <Img src={stats} alt="Statystyki"/>
                    <Label>Statystyki</Label>
                </MenuItem>

                <MenuItem onClick={() => {changeSection("usersManagement"); setSection("usersManagement")}} style={ highlightIitem("usersManagement") }>
                    <Img src={block_user} alt="Zablokowani użytkownicy"/>
                    <Label>Zarządzaj użytkownikami</Label>
                </MenuItem>

                <MenuItem onClick={() => {changeSection("placeSuggestions"); setSection("placeSuggestions")}} style={ highlightIitem("placeSuggestions") }>
                    <Img src={confirm_place} alt=''/>
                    <Label>Propozycje miejsc</Label>
                </MenuItem>

                <MenuItem onClick={() => { changeSection(""); setSection("???")}} style={ highlightIitem("???") }>
                    <Img src={confirm_place} alt=''/>
                    <Label>TO JEST DIV</Label>    
                </MenuItem>

                <MenuItem onClick={() => {changeSection("");  setSection("???")}} style={ highlightIitem("fwfefeff")}>
                    <Img src={confirm_place} alt=''/>
                    <Label>TO JEST DIV</Label>    
                </MenuItem>

        </Menu>

     )
}
 
export default Navigation;


