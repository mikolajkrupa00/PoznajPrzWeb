import styled from "styled-components"

const componentStyles = {

    Wrapper: styled.div`
    margin: 80px 0px;
    font-size: 40px;
    color: #333;
    text-align: center;
    justify-content: center;

    `,

    Button: styled.div`
    display: flex;
    align-items: center;
    width: 200px;
    margin: 15px auto;
    padding: 1px 20px;
    justify-content: center;
    font-size: 18px;
    color: black;
    border-radius: 5px;
    border: 1px solid #999;
    background-color: #FFF;

    &:first-child{
        margin-top: 45px;
    }
    :hover{
        cursor: pointer;
        border: 1px solid #666;
    }
    `,

    CountryName: styled.div`
    width: 80px;
    `,

    Flag: styled.div`
    align-self: start;
    `,

}

export default componentStyles