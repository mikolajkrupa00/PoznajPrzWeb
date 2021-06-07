import styled from "styled-components"

const componentStyles = {
    
    Menu:  styled.nav`
    display: -webkit-box;
    margin: 30px 0px;
    flex-wrap: wrap;
    margin-bottom: 100px;
    width: 100%;
    justify-content: center;
    overflow-y: scroll;
    -ms-overflow-style: none;   /* IE and Edge */
    scrollbar-width: none;      /* Firefox */

    &::-webkit-scrollbar{
        display: none;
    }
    `,

    Img: styled.img`
    width: 60px;
    background-color: #f5f5f5;
    padding: 15px;
    `,

    LinkLabel: styled.div`
    font-size: 10px;
    height: 30px;
    line-height: 15px;
    color: black;
    padding: 5px 8px;
    position: relative;
    top: -5px;
    transition: 0.5s;
    div:hover > & {
        font-size: 14px;
        color: teal;
    }
    div.active>&{
        font-size: 14px;
        color: teal;
        border-top: solid 2px teal;
    }
    `,

}
export default componentStyles;
