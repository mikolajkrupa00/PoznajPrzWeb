import styled from "styled-components";

const componentStyles = {

    LoginMain: styled.div`
        font-family: Arial;
        font-weight: bold;
        color: #707070;
    `,
    LoginFrom: styled.form`
        display: flex;
        flex-direction: column;
        background: #E6E6E6;
        width: 90%;
        height: 400px;
        margin: 5px auto;
        position: relative;
        top: max(calc((100vh - (var(--top_navbar_height) + 400px)) / 2), 0px);
        border: 2px solid #707070;
        box-shadow: 0px 0px 10px #707070;
    `,
    LoginTitle: styled.label`
        text-align: center;
        margin: 20px;
        font-size: 35px;
    `,
    LoginLabel: styled.label`
        margin: 2px 40px;
    `,
    LoginInput: styled.input`
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
    LoginButton: styled.button`
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
    LoginText: styled.label`
        text-align: center;
        margin-top: 30px;
    `,
}

export default componentStyles