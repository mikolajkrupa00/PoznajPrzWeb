import styled from "styled-components";

const componentStyles =  {
    RegisterMain: styled.div`
        font-family: Arial;
        font-weight: bold;
        color: #707070;
    `,
    RegisterFrom: styled.form`
        display: flex;
        flex-direction: column;
        background: #E6E6E6;
        width: 90%;
        height: 570px;
        top: max(calc((100vh - (var(--top_navbar_height) + 570px)) / 2), 0px);
        margin: 5px auto;
        position: relative;
        border: 1px solid #E9E9E9;
        border-radius: 5px;
        box-shadow: 0px 0px 10px #707070;

        @media (min-width: 700px) {
            width: 630px;
        }
    `,
    RegisterTitle: styled.label`
        text-align: center;
        margin-top: 30px;
        margin-bottom: 40px;
        font-size: 35px;
    `,
    RegisterLabel: styled.label`
        margin: 2px 40px;
    `,
    RegisterInput: styled.input`
        margin: 0px 30px 15px 30px;
        border: 1px solid #707070;
        border-radius: 15px;
        font-size: 15px;
        padding: 5px 10px;
        font-family: Arial;
        color: #707070;
        :hover {
            box-shadow: 0px 0px 5px #707070;
        }
    `,
    RegisterButton: styled.button`
        margin: 15px auto;
        border: 1px solid #707070;
        border-radius: 15px;
        font-size: 15px;
        padding: 5px 15px;
        font-family: Arial;
        font-weight: bold;
        color: #707070;
        background: ${props => props.color || "#E6E6E6"};
        :hover {
            box-shadow: 0px 0px 5px #707070;
        }
    `,
    RegisterText: styled.label`
        text-align: center;
        margin-top: 30px;
    `,
}

export default componentStyles