import styled from "styled-components"

const componentStyles = {

    Wrapper: styled.div`
    margin: 100px 0px;
    font-size: 50px;
    color: lightblue;
    text-align: center;
    `,

    Button: styled.div`
    margin: 15px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    border: 1px solid black;

    :hover{
        cursor: pointer;
        border: 1px solid #666;
    }
    `

}

export default componentStyles