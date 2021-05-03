import React, {useState, useEffect} from 'react'
import componentStyles from "./styles"
import { localStorageService } from "../../services/localStorageService"
import ListMenu from "./TopNavbar/ListMenu"
import {useHistory} from "react-router-dom"

const Layout = (props) => {

    useEffect(() => {
    }, [])
    const {TopNavbar, TopNavbarLeftSide, TopNavbarRightSide, LogoImg, LogoName, LogoWrapper, BurgerMenuImg,
        FullScreenImg, LayoutContainer, ChildContainer, ProfileButton} = componentStyles;
    const [listMenuState, setListMenuState] = useState(false)
    const [fullScreenState, setFullScreenState] = useState(false)
    const history = useHistory()
    const {username} = localStorageService
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
                    {username && <ProfileButton onClick={() => history.push("/profile")}>{username}</ProfileButton>}              
                    {fullScreenState ?
                        <FullScreenImg src="img/minimize.jpg" onClick={() =>{ document.exitFullscreen(); setFullScreenState(false)}}/> :
                        <FullScreenImg src="img/fullscreen.png" onClick={() =>{ document.documentElement.requestFullscreen(); setFullScreenState(true)}}/>
                    }
                    <BurgerMenuImg src="img/burgerMenu.png" onClick={() => setListMenuState(!listMenuState)}/>
                </TopNavbarRightSide>
            </TopNavbar>
            {listMenuState && <ListMenu closeListMenu={() => setListMenuState(false)}/>}
            <ChildContainer>
                {props.children}   {/* components put beteween <Layout></Layout> tags are displayed here  */}
            </ChildContainer>
        </LayoutContainer>
    )
}

export default Layout;