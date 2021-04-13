import React, {useState, useEffect} from 'react'
import components from "./styles"
import { localStorageService } from "../../services/localStorageService"
import ListMenu from "./ListMenu"

const Layout = (props) => {

    useEffect(() => {
    }, [])
    const {TopNavbar, TopNavbarLeftSide, TopNavbarRightSide, LogoImg, LogoName, LogoWrapper, BurgerMenuWraper, BurgerMenuImg,
        ListMenuRecord, MenuContainer, FullScreenImg, FullScreenContainer} = components;
    const [listMenuState, setListMenuState] = useState(false)
    const [fullScreenState, setFullScreenState] = useState(false)
    return(
        <>
        <TopNavbar>
            <TopNavbarLeftSide>
                <LogoWrapper>
                    <LogoImg src="rze-herb.png" />
                </LogoWrapper>
                <LogoName>Rzeszów</LogoName>
            </TopNavbarLeftSide>
            <TopNavbarRightSide>
                <FullScreenContainer>
                    {fullScreenState ?
                    <FullScreenImg src="minimize.jpg" onClick={() =>{ document.exitFullscreen(); setFullScreenState(false)}}/> :
                    <FullScreenImg src="fullscreen.png" onClick={() =>{ document.documentElement.requestFullscreen(); setFullScreenState(true)}}/>
                }
                </FullScreenContainer>
                <BurgerMenuWraper>
                    <BurgerMenuImg src="burgerMenu.png" onClick={() => setListMenuState(!listMenuState)}/>
                </BurgerMenuWraper>    
            </TopNavbarRightSide>
        </TopNavbar>
        {listMenuState && <ListMenu/>}
        {props.children}
        </>
    )
}

export default Layout;