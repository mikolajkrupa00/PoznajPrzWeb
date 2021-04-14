import styled from "styled-components"

const componentStyles = {

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

    ListMenuContainer: styled.div`
    height: calc(100% - var(--top_navbar_height));
    width: 100%;
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
    
    LayoutContainer: styled.div`
    `,
    ChildContainer: styled.div`
    `
}


export default componentStyles;