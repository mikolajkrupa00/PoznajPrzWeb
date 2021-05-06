import styled from "styled-components"

const componentStyles = {

    LayoutContainer: styled.div`
    width: 100%;
    height: 100%;
    background-color: whitesmoke;
    `,
    ChildContainer: styled.div`
    //width: 100%;
    //height: calc(100% - var(--top_navbar_height));
    //height: 500px;
    //overflow: scroll;
    //min-height: calc(100% - var(--top_navbar_height));
    padding-bottom: 15px;
    `,

    // ---- TOPNAVBAR ---- //
    TopNavbar: styled.div`
    width: 100%;
    height: var(--top_navbar_height);
    flex-direction:row;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 0px;
    background-color: gray;
    box-shadow: 0px 1px 10px #000000;
    z-index: 10;
    `,

    TopNavbarLeftSide: styled.div`
    display:flex;
    align-items: center;
    
    `,
    
    LogoWrapper: styled.div`
    display: flex;
    background-color: lightblue;
    cursor: pointer;
    `,
    
    LogoImg: styled.img`
    width:30px;
    height:30px;
    display: block;
    margin-left: 10px;
    `,
    LogoName: styled.div`
    margin-left: 8px;
    font-size: 24px;
    color: rgb(255, 255, 255);
    `,
    
    TopNavbarRightSide: styled.div`
    display: flex;
    align-items: center;
    `,
    
    BurgerMenuImg: styled.img`
    width:36px;
    height:36px;
    margin-right: 10px;
    `,

    FullScreenImg: styled.img`
    width: 40px;
    height: 40px;
    margin-right: 10px;
    `,

    ProfileButton:styled.div`
    margin-right:50px;
    &:hover{
        cursor:pointer;
    }
    `,

    // ---- LIST MENU ---- //
    ListMenuContainer: styled.div`
    height: calc(100% - var(--top_navbar_height) - 50px);
    width: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: center; //dla malych ekranow nie pokazuje wszystkich opcji w menu
    align-items: center;   
    background-color: rgb(163, 162, 162, 0.9);
    position: absolute;
    top: var(--top_navbar_height);
    overflow-y: scroll;
    padding: 25px 0px;
    z-index: 10;
    `,
    ListMenuRecord: styled.div`
    text-align: center;
    font-size: 22px;
    color: rgb(255, 255, 255);
    border-bottom: 1px solid white;
    margin: 15px 0px;
    width: 80%;

    &:first-child{
        margin-top: 35px;
    }

    &:last-child{
        display: flex;
        justify-content: center;
    }

    :hover{
        cursor: pointer;
        color: #333;
    }
    `,

    TopRow: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 35px;
    width: 100%;
    `,

    LogoutButton: styled.div`
    padding: 2px 10px;
    padding-bottom: 4px;
    margin-right: 12px;
    font-size: 18px;
    align-self: start;
    background-color: #DDD;
    color: #222;
    border: 1px solid white;
    border-radius: 5px;
    `
    
}


export default componentStyles;