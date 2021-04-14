import React, {useState, useEffect} from 'react'
import componentStyles from "./styles"
import { localStorageService } from "../../services/localStorageService"
import ListMenu from "./TopNavbar/ListMenu"

const Layout = (props) => {

    useEffect(() => {
    }, [])
    const {TopNavbar, TopNavbarLeftSide, TopNavbarRightSide, LogoImg, LogoName, LogoWrapper, BurgerMenuImg,
        FullScreenImg, LayoutContainer, ChildContainer} = componentStyles;
    const [listMenuState, setListMenuState] = useState(false)
    const [fullScreenState, setFullScreenState] = useState(false)
    return(
        <LayoutContainer>
            <TopNavbar>
                <TopNavbarLeftSide>
                    <LogoWrapper>
                        <LogoImg src="img/rze-herb.png" />
                        <LogoName>Rzeszów</LogoName>
                    </LogoWrapper>
                </TopNavbarLeftSide>
                <TopNavbarRightSide>                   
                    {fullScreenState ?
                        <FullScreenImg src="img/minimize.jpg" onClick={() =>{ document.exitFullscreen(); setFullScreenState(false)}}/> :
                        <FullScreenImg src="img/fullscreen.png" onClick={() =>{ document.documentElement.requestFullscreen(); setFullScreenState(true)}}/>
                    }
                    <BurgerMenuImg src="img/burgerMenu.png" onClick={() => setListMenuState(!listMenuState)}/>
                </TopNavbarRightSide>
            </TopNavbar>
            {listMenuState && <ListMenu/>}
            <ChildContainer>
                {props.children}
            </ChildContainer>
        </LayoutContainer>
    )
}

export default Layout;