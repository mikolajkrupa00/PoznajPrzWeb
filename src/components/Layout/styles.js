import styled from "styled-components"

const componentStyles = {

    TopNavbar: styled.div`
    width: 100%;
    flex-direction:row;
    height: var(--top_navbar_height);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0px;
    background-color: gray;
    box-shadow: 0px 1px 10px #000000;
    z-index: 10;
    `,
    LogoWrapper: styled.div`
    width:29px;
    height:36px;
    `,
    
    LogoImg: styled.img`
    width:30px;
    height:30px;
    `,
    LogoName: styled.div`
    margin-left: 5px;
    font-size: 24px;
    color: rgb(255, 255, 255);
    `,
    TopNavbarLeftSide: styled.div`
    justify-content: space-between;
    align-items: center;
    display:flex;
    flex-direction:row;
    `,
    TopNavbarRightSide: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    `,
    BurgerMenuWraper: styled.div`
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    `,
    BurgerMenuWraper: styled.div`
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    `,
    BurgerMenuImg: styled.img`
    width:36px;
    height:36px;
    `,
    MenuContainer: styled.div`
    height: calc(100% - var(--top_navbar_height));
    width: 99.4%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
    background-color: rgb(163, 162, 162, 0.9);
    position: absolute;
    top: var(--top_navbar_height);

    z-index: 10;
    `,
    ListMenuRecord:styled.div`
    text-align: center;
    font-size: 25px;
    color: rgb(255, 255, 255);
    border-bottom: 1px solid white;
    margin: 20px 0px;
    width: 80%;

    :hover{
        cursor: pointer;
        color: #333;
    }
    `,
    FullScreenImg: styled.img`
    width:42px;
    height:42px;
    `,
    FullScreenContainer: styled.div`
    display: block;
    margin-top:5px;
    margin-right: 20px;
    `,
    LayoutContainer: styled.div`
    `,
    ChildContainer: styled.div`
    `
}


export default componentStyles;