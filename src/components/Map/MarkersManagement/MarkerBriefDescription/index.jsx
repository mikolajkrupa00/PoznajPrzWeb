import React, {useEffect, useState} from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form';
import Layout from "../../../Layout/index"
import componentStyles from "./styles";
import {VscChromeClose} from 'react-icons/vsc'
import { BiRightArrowAlt } from 'react-icons/bi';







const MarkerBriefDescription = ({closeBriefDescription, goToDescription}) => {

    const {BriefDescriptionWrapper, TopDiv, MiddleDiv, BottomDiv, PlaceName, PlaceImg, PlaceDescription, CloseButton, GoToDescriptionButton} = componentStyles

    let closeIcon = { color: '#303030', fontSize: "25px" };
    let goToIcon = { color: '#303030', fontSize: "30px" };
    

   

    return(


        <BriefDescriptionWrapper>

            <TopDiv>
                <PlaceName>Nazwa miejsca</PlaceName>
                <CloseButton>
                    <VscChromeClose style={closeIcon} onClick={closeBriefDescription} ></VscChromeClose>
                </CloseButton>
            </TopDiv>


            <MiddleDiv>
                <PlaceImg></PlaceImg>

                <PlaceDescription>
                Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w 
                przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez 
                nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć 
                wieków później zaczął być używany przemyśle elektronicznym, pozostając 
                praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz 
                z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum, 
                a ostatnio z zawierającym różne wersje Lorem Ipsum oprogramowaniem 
                przeznaczonym do realizacji druków na komputerach osobistych, jak Aldus 
                PageMaker.
                </PlaceDescription>
            </MiddleDiv>


            <BottomDiv>
                <GoToDescriptionButton> <BiRightArrowAlt style={goToIcon} onClick={goToDescription}/> </GoToDescriptionButton>
            </BottomDiv>

           

           
            
           
          
           

        
        </BriefDescriptionWrapper>
    )

}

export default MarkerBriefDescription