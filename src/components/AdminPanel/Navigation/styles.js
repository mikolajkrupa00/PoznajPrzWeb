import styled from "styled-components"

const componentStyles = {
    
    Menu:  styled.nav`
    display: -webkit-box;
    margin: 30px 0px;
    margin-bottom: 100px;
    width: 100%;
    justify-content: space-around;
    overflow-y: scroll;
    -ms-overflow-style: none;   /* IE and Edge */
    scrollbar-width: none;      /* Firefox */

    &::-webkit-scrollbar{
        display: none;
    }
    `,

    Icon : styled.div`
    width: 50px;
    padding: 5px;
    `,
    
    Img: styled.img`
    width: 20px;
    `,

    LinkLabel: styled.div`
    font-size: 12px;
    height: 30px;
    line-height: 15px;
    margin-top: 5px;
    `,

}
export default componentStyles;
