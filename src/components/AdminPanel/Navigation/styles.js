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

    MenuItem: styled.div`    
    width: 75px;
    margin: 0px 5px;
    display: flex;
    flex-direction: column;
    place-content: center;
    place-items: center;
    border-bottom: 2px solid whitesmoke;
    padding-bottom: 3px;
    white-space: normal;
    color: rgb(0, 123, 255);
    `,    

    Img: styled.img`
    width: 20px;
    padding: 5px 0px;
    padding-bottom: 7px;
    `,   

    Label: styled.div`
    font-size: 12px;
    height: 37px;
    line-height: 15px;
    padding-top: 7px;
    width: 100%;
    `,

}
export default componentStyles;
